/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';


// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
        justifyContent: "space-evenly"
    },
    upperHalf: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    lowerHalf: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-around'
    },
    text1: {
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        color: "#828282",
        fontSize: 30,
        textAlign: 'left',
        fontWeight: '500',
    },
    priorityButton: {
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',

    },
    langButton2: {
        backgroundColor: "#B4E2DF",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',


    },

    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    t2: {
        color: "#19939A",
        fontSize: 30,

    }

})
function RequestPageForScribe({ navigation, route: { params: { req_id, uid } } }) {

    const firestore = useFirestore()
    const request = useSelector(state => state.firestore.data.requests && state.firestore.data.requests[req_id])
    useFirestoreConnect([
        {
            collection: 'dateslots',
            doc: request.dateSlot,
            subcollections: [{collection: 'acceptedVolunteers'}],
            storeAs: 'acceptedVolunteers'
        }
    ])
    const busy = useSelector(state => state.firestore.data.acceptedVolunteers && state.firestore.data.acceptedVolunteers[uid])
    console.log(busy, request.status)
    if (request?.status === "pending" && !busy) {
        return (
            <View style={styles.container}>
                <View style={styles.upperHalf}>
                    <Text style={styles.text2}>

                        {request.examName}
                    </Text>
                    <Text style={styles.text2}>

                        {new Date(request.examDate.seconds * 1000).toDateString()}
                    </Text>
                    <Text style={styles.text2}>

                        {request.examLang}
                    </Text>
                    <Text style={styles.text2}>

                        {new Date(request.examDate.seconds * 1000).toLocaleTimeString()}
                    </Text>
                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            if (request.status === "pending") firestore.update(`requests/${req_id}`, { volunteerAccepted: uid, status: 'accepted' })
                            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                            firestore.collection('dateslots')
                                .doc(request.dateSlot)
                                .collection('acceptedVolunteers')
                                .doc(uid)
                                .set({
                                    req_id: req_id
                                })
                        }}
                    >
                        <Text style={styles.t1}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.t1}>
                            Go Back
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    else if (request?.status === "accepted" && uid === request.volunteerAccepted) {
        return (
            <View style={styles.container}>
                <View style={styles.upperHalf}>
                    <Text style={styles.text2}>

                        {request.examName}
                    </Text>
                    <Text style={styles.text2}>

                        {new Date(request.examDate.seconds * 1000).toDateString()}
                    </Text>
                    <Text style={styles.text2}>

                        {request.examLang}
                    </Text>
                    <Text style={styles.text2}>

                        {new Date(request.examDate.seconds * 1000).toLocaleTimeString()}
                    </Text>
                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            if (request.status === "accepted") firestore.update(`requests/${req_id}`, { volunteerAccepted: "none", status: 'pending' })
                            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                            firestore.collection('dateslots')
                                .doc(request.dateSlot)
                                .collection('acceptedVolunteers')
                                .doc(uid)
                                .delete()
                                .catch((err) => {
                                    setErrText('You never marked available this day!')
                                })

                        }}
                    >
                        <Text style={styles.t1}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.t1}>
                            Go Back
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )

    }
    else {
        return (<View style={styles.container}>
            <Text style={styles.text2}>whoops, this page is not for you!</Text>
            <TouchableOpacity style={styles.priorityButton}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Text style={styles.t1}>
                    Go Back
                </Text>
            </TouchableOpacity>
        </View>)
    }
}

export default RequestPageForScribe
