/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';

import { firestoreConnect, isEmpty, isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { isPlainObject } from '@reduxjs/toolkit';
import { CalendarList } from 'react-native-calendars';
import { RequestScribe } from '../translations';
import { compose } from 'redux';

// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
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
        backgroundColor: '#616161',
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
    redRequestText:{
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
    },
    greenRequestText:{
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: '200',
    },
    greenButton: {
        borderRadius: 3,
        padding: 2,
        backgroundColor: "#2C9609",
        color: "#FFFFFF",
        
    },
    yellowRequest: {
        justifyContent: 'space-between',
        backgroundColor: "#F7F158",
        flexDirection: "row",
        borderRadius: 2,
        padding: 5,
    },
    yellowRequestText:{
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
        backgroundColor: "#D4D4D4",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    requestRoot: {
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: "#616161",
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

function calendarRequests(uid, requests) {
    
    // console.log(requests)
    const markedDates = {}, reqDetails = {}
    requests.forEach((req, ind) => {
        // console.log(req.examDate.toDate())
        var dt = req.examDate.toDate().toISOString().split('T')[0]
        if (req.status === "found") {
            if (req.volunteer === uid) {
                if (req.dt===undefined){
                    reqDetails[dt] = [(
                        <View style={styles.greenRequest} key = {ind}>
                            <Text style={styles.greenRequestText}>{req.examName} in {req.examLang} </Text>
                            <TouchableOpacity style = {styles.greenButton}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )]
                }
                else {

                    reqDetails[dt].append((
                        <View style={styles.greenRequest} key = {ind}>
                            <Text style={styles.greenRequestText}>{req.examName} in {req.examLang} </Text>
                            <TouchableOpacity style = {styles.greenButton}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
                markedDates[dt] = { selected: true, marked: true, selectedColor: 'green' }
            }
        }
        else if (req.firstP === uid || req.secondP === uid || req.thirdP === uid) {
            if (req.dt === undefined){
                reqDetails[dt] = [(
                    <View style={styles.yellowRequest} key = {ind}>
                        <Text style={styles.yellowRequestText}>{req.examName} in {req.examLang} </Text>
                        <TouchableOpacity style = {styles.yellowButton}>
                            <Text>Accept</Text>
                        </TouchableOpacity>
                    </View>
                )]
            }
            else {
    
                reqDetails[dt].append((
                    <View style={styles.yellowRequest} key = {ind}>
                        <Text style={styles.yellowRequestText}>{req.examName} in {req.examLang} </Text>
                        <TouchableOpacity style = {styles.yellowButton}>
                            <Text>Accept</Text>
                        </TouchableOpacity>
                    </View>
                ))
            }
            markedDates[req.examDate.toDate().toISOString().split('T')[0]] = { selected: true, marked: true, selectedColor: 'yellow' }
        }
        else {
            if (req.dt === undefined){
                reqDetails[dt] = [(
                    <View style={styles.redRequest} key = {ind}>
                        <Text style={styles.redRequestText}>{req.examName} in {req.examLang} </Text>
                        <TouchableOpacity style = {styles.redButton}>
                            <Text>Connect</Text>
                        </TouchableOpacity>
                    </View>
                )]
            }
            else {
            
                reqDetails[dt].append(
                    (
                        <View style={styles.redRequest} key = {ind}>
                            <Text style={styles.redRequestText}>{req.examName} in {req.examLang} </Text>
                            <TouchableOpacity style = {styles.redButton}>
                                <Text>Connect</Text>
                            </TouchableOpacity>
                        </View>
                    )
                )
            }
            markedDates[req.examDate.toDate().toISOString().split('T')[0]] = { selected: true, marked: true, selectedColor: 'red' }
        }
    });
    // console.log(markedDates)
    return [markedDates, reqDetails]
}

export default function ScribeHomeTab () {

    
    useFirestoreConnect(['requests'])
    
    
    let [currDate, setCurrDate] = useState('')
    const requests = useSelector((state) => state.firestore.ordered.requests)
    const uid = useSelector((state) => state.userAppSettings.uid)
    const lang = useSelector((state) => state.userAppSettings.lang)
    // console.log(auth.uid)
    if (!isLoaded(requests)) {
        return(

            <View style={styles.container}>
                <View style={styles.upperHalf}>

                    <Text style={styles.text1}>
                        Loading...
                    </Text>
                </View>
            </View>
        )
    }
    else if (!isEmpty(requests)){

        let [markedDates, reqDetails] = calendarRequests(uid, requests)
        // console.log(markedDates)
        return (
            <ScrollView>
        
                <View style={styles.container}>
                    <View style={styles.upperHalf}>
        
                        <Text style={styles.text1}>
                            Welcome.
                        </Text>
                    </View>
        
                    <View style={styles.lowerHalf} >
                        {/* <MyRequests uid={this.props.auth.uid} />
                        <Requests uid={this.props.auth.uid} /> */}
                        <CalendarList
                            scrollEnabled={true}
                            markedDates={markedDates}
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
                    {(
                        reqDetails[currDate]!==undefined )
                        ? reqDetails[currDate]
                        :
                        (
                            <Text>Nothing here</Text>
                        )
                    }

                </View>
            </ScrollView>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.upperHalf}>
    
                    <Text style={styles.text1}>
                        Nothing to show you.
                    </Text>
                </View>
            </View>

        )
    }
    
    
}

