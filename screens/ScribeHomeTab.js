/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';

import { firestoreConnect, isEmpty, isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { isPlainObject } from '@reduxjs/toolkit';
import { Calendar, CalendarList } from 'react-native-calendars';
import { RequestScribe } from '../translations';
import { compose } from 'redux';

// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
    },
    text1: {
        flex: 1,
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        flex: 1,
        padding: 20,
        color: "#828282",
        fontSize: 20,
        fontWeight: '500',
    },
    removeText: {
        fontWeight: '700',
        fontSize: 10,
    },
    removeBox: {
        alignItems: 'flex-end',

    },
    upperHalf: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerHalf: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-around'
    },
    requestButton: {
        flex: 1,
        margin: 10,
        backgroundColor: '#19939A',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-around',

    },
    t1: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 30
    },
    redRequest: {
        justifyContent: 'space-between',
        backgroundColor: "#EF6666",
        flexDirection: "row",
        borderRadius: 2,
        padding: 5,
    },
    redRequestText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: '200',
    },
    redButton: {
        borderRadius: 3,
        padding: 2,
        backgroundColor: "#BD351C",
        color: "#FFFFFF",

    },
    greenRequest: {
        justifyContent: 'space-between',
        backgroundColor: "#9EEA85",
        flexDirection: "row",
        borderRadius: 2,
        padding: 5,
        marginVertical: 3,
        marginHorizontal: 2,
        borderRadius: 3,
    },
    greenRequestText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: '200',
    },
    greenButton: {
        borderRadius: 5,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        padding: 2,
        backgroundColor: "#2C9609",
        color: "#FFFFFF",
        marginVertical: 5,
    },
    yellowRequest: {
        justifyContent: 'space-between',
        backgroundColor: "#F7F158",
        flexDirection: "row",
        borderRadius: 2,
        padding: 5,
        marginVertical: 3,
        marginHorizontal: 2,
        borderRadius: 3,
    },
    yellowRequestText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: '200',
    },
    yellowButton: {
        borderRadius: 3,
        padding: 2,
        backgroundColor: "#CAC40E",
        color: "#FFFFFF",

    },
    requestBox: {
        backgroundColor: "#B4E2DF",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    requestRoot: {
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: "#19939A",
    },
    myRequests: {
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderWidth: 3,
        borderColor: "green",
    },
    examName: {

    },
    examDate: {

    }
});
function calendarRequests(uid, requests, setMarked, addRequestId) {
    let requestIds = {}

    requests.forEach((req, ind) => {

        var dt = req.examDate && req.examDate.toDate().toISOString().split('T')[0]

        if (dt) {
            if (req.volunteerAccepted && (uid === req.volunteerAccepted)) {
                setMarked(dt, 'green')
                if (requestIds[dt]) requestIds[dt].push(req.id)
                else requestIds[dt] = [req.id,];

            }
            else if (req.volunteersSelected && (req.volunteersSelected.indexOf(uid) > -1) && req.volunteerAccepted === "none") {
                setMarked(dt, 'yellow')
                if (requestIds[dt]) requestIds[dt].push(req.id)
                else requestIds[dt] = [req.id,];

            }
        }


    });
    // console.log("given markeddates ",markedDates)
    return requestIds
}
function RequestBoxFooter({ uid, req_id, }) {
    const navigation = useNavigation()
    const req = useSelector((state) => state.firestore.data.requests[req_id])
    return (

        <TouchableOpacity style={styles.greenButton}
            onPress={() => {
                navigation.navigate('RequestPageForScribe', { uid: uid, req_id: req_id })
            }}
        >
            <Text style={styles.greenRequestText}>{req.examName} </Text>

        </TouchableOpacity>

    )
}
function RequestsFooter({ uid, requests, }) {


    return (
        <View>

            {

                requests && requests.map(
                    (req_id, ind) => {
                        return (
                            <RequestBoxFooter uid={uid} req_id={req_id} key={ind} />
                        )
                    }
                )
            }
        </View>
    )
}

export default function ScribeHomeTab() {

    const uid = useSelector((state) => state.userAppSettings.uid)

    useFirestoreConnect([
        {
            collection: 'requests',
            where: ["volunteersSelected", "array-contains", uid],
        },
    ])
    const requests = useSelector((state) => state.firestore.ordered.requests)
    let [markedDates, setMarkedDates] = useState({});
    let [currRequests, setCurrRequests] = useState([]);
    let [currDate, setCurrDate] = useState('')
    let [requestIds, setRequestIds] = useState({});

    useEffect(() => {
        if (requests) setRequestIds(calendarRequests(
            uid,
            requests,
            (dt, markedColor) => setMarkedDates({ ...markedDates, [dt]: { selected: true, marked: true, selectedColor: markedColor } }),
        ))

        // console.log(requestIds)
        setCurrRequests(requestIds[currDate] || [])
    }, [requests,])

    const lang = useSelector((state) => state.userAppSettings.lang)

    if (!isLoaded(requests)) {
        return (

            <View style={styles.container}>
                <View style={styles.upperHalf}>

                    <Text style={styles.text1}>
                        Loading...
                    </Text>
                </View>
            </View>
        )
    }
    else if (!isEmpty(requests)) {


        // console.log(markedDates)
        return (
            <ScrollView style={styles.container}>

                <View>

                    <View style={styles.lowerHalf} >
                        {/* <MyRequests uid={this.props.auth.uid} />
                        <Requests uid={this.props.auth.uid} /> */}
                        <Calendar
                            enableSwipeMonths={true}
                            scrollEnabled={true}
                            markedDates={markedDates}
                            // Enable horizontal scrolling, default = false
                            horizontal={true}
                            // Enable paging on horizontal, default = false
                            pagingEnabled={true}
                            // Set custom calendarWidth.
                            calendarWidth={320}
                            onDayPress={(date) => {

                                setCurrDate(date.dateString)
                                setCurrRequests(requestIds[date.dateString] || [])
                                // console.log(requestIds)
                                // console.log(requestIds[date.dateString])
                            }}
                        />
                    </View>
                    <RequestsFooter uid={uid} requests={currRequests} />

                </View>
            </ScrollView>
        )
    }
    else {
        return (
            <ScrollView>
                <View style={styles.upperHalf}>
                    <Calendar
                        enableSwipeMonths={true}
                        scrollEnabled={true}

                        // Enable horizontal scrolling, default = false
                        horizontal={true}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={true}
                        // Set custom calendarWidth.
                        calendarWidth={320}
                        onDayPress={(date) => {
                            // console.log(date.dateString)
                            setCurrDate(date.dateString)
                        }}
                    />
                </View>
            </ScrollView>

        )
    }


}

