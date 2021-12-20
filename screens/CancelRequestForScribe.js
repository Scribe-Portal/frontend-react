/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { changeFirstP, changeSecondP, changeThirdP } from '../reducers/priorityReducer';
import { changeLang } from '../reducers/userAppSettingsReducer';
// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
    },
    upperHalf: {

        marginHorizontal: 10,
        alignItems: 'stretch',
    },
    lowerHalf: {
        marginHorizontal: 10,

        justifyContent: 'space-around'
    },
    text1: {
        color: "#19939A",
        textAlign: 'center',
        fontSize: 30,

        fontWeight: '700',
    },
    text2: {
        color: "#000000",
        textAlign: 'center',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    priorityButton: {
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        marginVertical: 10,


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

    },
    input: {
        marginVertical: 10,

        height: 100,
        backgroundColor: "white"
    },

});
function CancelRequestForScribe({ navigation, route: { params: { req_id, dateSlot } } }) {
    const uid = useSelector((state) => state.userAppSettings.uid)
    const request = useSelector(state => state.firestore.data.requests && state.firestore.data.requests[req_id])
    const firestore = useFirestore()
    let [cancelReason, setCancelReason] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>

                    Reason for Cancellation
                </Text>
                <Text style={styles.text2}>

                    Rejecting the request might incur NEGATIVE NSS hours. Please consider the consequences before you cancel. Cancel only if necessary.
                </Text>
                <TextInput onChangeText={setCancelReason} style={styles.input} />

            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.t1}>
                        Go Back, Ignore this page.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        if (request.status === "accepted") {

                            firestore.update(`requests/${req_id}`, { volunteerAccepted: "none", status: 'pending' })
                            firestore.collection("scribe_cancellations").add({ uid: uid, req_id: req_id, dateSlot: dateSlot, reason: cancelReason, })
                        }
                        firestore.collection('dateslots')
                            .doc(dateSlot)
                            .collection('acceptedVolunteers')
                            .doc(uid)
                            .delete()
                            .then(() => {
                                sendEmail(
                                    "scribeportalapp@gmail.com",
                                    'Scribe Request Rejected',
                                    'Request Date ' +  request?.examDate + '\n Volunteer name ' +  uid + '\n Reason ' +  cancelReason + 'Request: ' + req_id ,
                                    { cc: ' sprakhar2002@gmail.com;' }
                                ).then(() => {
                                    console.log('Your message was successfully sent!');
                                });
                            })
                            .catch((err) => {

                            }).then(() => {

                                navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                            })
                    }}
                >
                    <Text style={styles.t1}>
                        Reject
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default CancelRequestForScribe