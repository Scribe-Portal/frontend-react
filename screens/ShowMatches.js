/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { addP, removeAll } from '../reducers/priorityReducer';
import messaging from '@react-native-firebase/messaging';
import { sendEmail } from './sendemail';
import { Choose3Volunteers, InitiateRequest, LongInstruction, Showing5Volunteers } from '../translations';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner_container: {
        flexGrow: 1,
        
        backgroundColor: "#B4E2DF",
    },
    middle_spacing: {
        flex: 0,
        flexGrow: 1,
        
    },
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },
    centered: {
        flex: 1,
        margin: 20,

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
    text1: {

        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {

        width: 321,
        height: 48,
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    tsmall: {

    },
    ShowMatchesButton: {

        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        
    },
    langButton2: {
        backgroundColor: "#B4E2DF",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,

    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    scribeBox: {


        marginVertical: 5,
        padding: 13,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#19939A",
        backgroundColor: "#B4E2DF",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    selectedScribeBox: {

        marginVertical: 5,
        padding: 13,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#19939A",
        backgroundColor: "#52F6F7",
        flexDirection: "row",
        justifyContent: 'space-between'
    },

    t2: {
        color: "#19939A",
        fontSize: 30,

    },
    match_name: {

    },
    match_rating: {

    }

});


function Match({ id, selected }) {
    const scribe = useSelector(state => state.firestore.data.scribes && state.firestore.data.scribes[id])

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={selected ? styles.selectedScribeBox : styles.scribeBox} onPress={() => navigation.navigate("ScribePage", { scribe_id: id, selected: selected, modifiable: true })}>
            <Text style={styles.match_name}>{`${(typeof scribe?.name === 'string') ? scribe.name : "Unnamed"} ${selected ? "(selected)" : ""}`}</Text>
            <Text style={styles.match_rating}>{`${(typeof scribe?.rating === 'number') ? scribe.rating : "unrated"}/5`}</Text>
        </TouchableOpacity>
    )
}
function Matches({ uid, dateSlot }) {
    useFirestoreConnect(() => [{
        collection: 'dateslots',
        doc: dateSlot,
        subcollections: [{ collection: "available" }],
        queryParams: ["LimitToLast=10"],
        storeAs: `dateslot_${dateSlot}`
    }])
    const matches = useSelector(state => state.firestore.data[`dateslot_${dateSlot}`])
    // console.log(matches)
    let selectedData = useSelector(state => state.priority.P)
    if (!isLoaded(matches)) {
        // console.log(matches)
        return (
            <Text style={styles.text1}>
                Loading...
            </Text>
        )
    }
    if (isEmpty(matches)) {
        return (
            <Text style={styles.text2}>
                Sorry, We couldn't find any volunteers for these settings. Please try again sometime later.
            </Text>
        )
    }
    return Object.keys(matches).map((id, ind) => (
        <Match id={id} selected={(selectedData[id] === true)} key={`${ind}-${id}`} />
    ))
}
function ShowMatches({ navigation, route: { params: { requestId, dateSlot, selectedVolus } } }) {

    useFirestoreConnect([{ collection: 'scribes' }])

    const scribes = useSelector(state => state.firestore.data.scribes)
    const lang = useSelector(state => state.userAppSettings.lang)

    const uid = useSelector(state => state.userAppSettings.uid)
    const numVolunteers = useSelector(state => state.firestore.data[`dateslot_${dateSlot}`] && Object.keys(state.firestore.data[`dateslot_${dateSlot}`]).length)

    const dispatch = useDispatch()
    useEffect(() => {
        if (selectedVolus) {
            selectedVolus.forEach((volunteer) => {
                dispatch(addP({ scribe_id: volunteer }))
            })
        }
        return () => {

        }
    }, [])
    const firestore = useFirestore()
    let selectedData = useSelector(state => state.priority.P)
    const showInfoDialog = () => {

        return Alert.alert(
            "Info",
            LongInstruction[lang],
            [
                {
                    text: "Ok, go to Home",
                    onPress: () => {
                            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                            
                        }
                },
                
    
            ]
    
        )
        
    }
    if (!isLoaded(scribes)) {
        return (
            <View>
                <Text style={styles.text1}>
                    Loading...
                </Text>

            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.inner_container}>

                    <View style={styles.centered}>

                        <Text style={styles.text1}>
                            {Choose3Volunteers[lang]}
                        </Text>
                        <Text style={styles.text2}>
                            {Showing5Volunteers((typeof numVolunteers === "number") ? numVolunteers : "0")[lang]}
                        </Text>
                        <Matches uid={uid} dateSlot={dateSlot} />
                        <View style={styles.middle_spacing}>

                        </View>
                        <TouchableOpacity style={styles.ShowMatchesButton}
                            onPress={() => {
                                // console.log("done pressed", requestId)
                                firestore
                                    .update(
                                        {
                                            collection: 'requests',
                                            doc: requestId,
                                        },
                                        {
                                            volunteersSelected: Object.keys(selectedData).filter(volunteer => selectedData[volunteer] == true)
                                        }
                                    )
                                    .then(() => {
                                        Object.keys(selectedData).filter(volunteer => selectedData[volunteer] == true).map(
                                            (volunteer, ind) => {
                                                if (scribes && scribes[volunteer]) {
                                                    
                                                    if ( scribes[volunteer].fcmToken) {

                                                        const registrationToken = scribes[volunteer].fcmToken;

                                                        const message = {
                                                            data: {
                                                                type: 'Accept',
                                                                notif: 'Someone has requested your services for an exam'
                                                            },

                                                        };

                                                        // Send a message to the device corresponding to the provided
                                                        // registration token.
                                                        if (registrationToken) {

                                                            fetch("https://scribenotif.herokuapp.com/",{
                                                                method: 'POST',
                                                                body: JSON.stringify({
                                                                    registrationToken: registrationToken,
                                                                    message: message,
                                                                }),
                                                                headers: {
                                                                    'Content-type': 'application/json; charset=UTF-8'
                                                                }
                                                            })
                                                        }
                                                    }
                                                }
                                            }
                                        )
                                        
                                        dispatch(removeAll())
                                    })
                                    showInfoDialog()
                                

                            }}
                        >
                            <Text style={styles.t1}>

                                {InitiateRequest[lang]}
                            </Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </View>
        )
    }
    // useEffect(() => {
    //     console.log(dateSlot)
    //     return () => {

    //     }
    // }, [])
    // console.log(Object.keys(selectedData).find(volunteer => selectedData[volunteer]==true))
}


export default ShowMatches
