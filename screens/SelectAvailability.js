/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useMemo, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

import firebase from '@react-native-firebase/app';
import { Calendar } from 'react-native-calendars';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
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
        margin: 20,
        justifyContent: 'space-around'
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
    tsmall: {

    },
    AvailButton: {
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        margin: 10,
        alignItems: 'center',
        borderWidth: 3,
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
    t2: {
        color: "#19939A",
        fontSize: 30,

    }

});
function getMarkedDates(dates) {
    var result = {}
    if (dates) {

        Object.keys(dates).forEach(function (date_id) {
            result[date_id] = { selected: true, customStyles: {container: {borderColor: 'purple', borderWidth: 3}, text: {color: 'black'}} }
        });
    }

    return result;
}
function SelectAvailability({ navigation }) {
    let firestore = useFirestore()
    const uid = useSelector(state => state.userAppSettings.uid)
    useFirestoreConnect(() => [
        { collection: `scribes/${uid}/availableDays`, storeAs: 'availableDays' }
    ])
    const availableDays = useSelector(state => state.firestore.data.availableDays)
    let [markedDates, setMarkedDates] = useState({})
    
    let [selected, setSelected] = useState('2020-02-02')
    // useEffect(() => {
    //     setMarkedDates({
    //         ...markedDates,
    //         [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange', selectedTextColor: 'white'},
    //     })
    // }, [ selected])
    useEffect(() => {
        setMarkedDates(getMarkedDates(availableDays))
    }, [ availableDays ])

    let [date, setDate] = useState(new Date())


    const [recentlyDisabled1, setRecentlyDisabled1] = useState(false)
    const [recentlyDisabled2, setRecentlyDisabled2] = useState(true)
    const [errText, setErrText] = useState('')
    const lang = useSelector(state => state.userAppSettings.lang)
    let maximumDate = new Date()
    let minimumDate = new Date()
    maximumDate.setDate(maximumDate.getDate() + 60)
    // console.log(availableDays)
    // console.log(markedDates(availableDays))
    return (
        <ScrollView>

            <View style={styles.container}>

                <Calendar
                    enableSwipeMonths={true}
                    horizontal={true}
                    pagingEnabled={true}
                    minDate={minimumDate}
                    maxDate={maximumDate}
                    // markedDates={Object.assign({
                    //     [selected]: {
                    //         selected: true,
                    //         disableTouchEvent: true,
                    //         selectedColor: 'orange',
                    //         selectedTextColor: 'red'
                    //     }
                    // }, markedDates(availableDays))}
                    markedDates={{...markedDates, 
                        [selected]: {
                            selected: true,
                            selectedColor: 'orange',
                            selectedTextColor: 'white',
                        }
                    }}
                    onDayPress={(date) => {
                        setDate(date)
                        setSelected(date.dateString)
                        firestore.collection('dateslots')
                            .doc(date.dateString)
                            .collection('available')
                            .doc(uid)
                            .get()
                            .then((userDoc) => {
                                if (userDoc.exists) {
                                    // console.log("this doc exists")
                                    setRecentlyDisabled1(true)
                                    setRecentlyDisabled2(false)
                                }
                                else {
                                    // console.log("na doesnt exist")

                                    firestore.collection('dateslots')
                                        .doc(date.dateString)
                                        .set({
                                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        })

                                    setRecentlyDisabled1(false)
                                    setRecentlyDisabled2(true)
                                }
                            })
                            .catch((err) => {
                                // console.log('something seriously wrong 4 ' + err)
                            })
                    }}
                    theme={{
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                    }}

                />

                <TouchableOpacity style={styles.AvailButton}

                    onPress={() => {
                        firestore.collection('dateslots')
                            .doc(date.dateString)
                            .collection('available')
                            .doc(uid)
                            .set({
                                setAt: firebase.firestore.FieldValue.serverTimestamp(),
                            })
                        firestore.collection('scribes')
                            .doc(uid)
                            .collection('availableDays')
                            .doc(date.dateString)
                            .set({
                                setAt: firebase.firestore.FieldValue.serverTimestamp()
                            })
                        setRecentlyDisabled1(true)
                        setRecentlyDisabled2(false)
                    }}
                >
                    <Text style={styles.t1}>

                        Mark myself available this day
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.AvailButton}
                    disabled={recentlyDisabled2}
                    onPress={() => {

                        firestore.collection('dateslots')
                            .doc(date.dateString)
                            .collection('available')
                            .doc(uid)
                            .delete()
                            .catch((err) => {
                                setErrText('You never marked available this day!')
                            })
                        firestore.collection('scribes')
                            .doc(uid)
                            .collection('availableDays')
                            .doc(date.dateString)
                            .delete()
                            .catch((err) => {
                                // console.log('cant delete 2')
                            })
                        setRecentlyDisabled1(false)
                        setRecentlyDisabled2(true)


                    }}
                >
                    <Text style={styles.t1}>

                        Unmark myself available this day
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.AvailButton}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.t1}>

                        Go back
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )

}

export default SelectAvailability
