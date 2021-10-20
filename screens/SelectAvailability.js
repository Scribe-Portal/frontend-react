/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Platform} from 'react-native';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { AvailText } from '../translations';
import firebase from '@react-native-firebase/app';
import { CalendarList } from 'react-native-calendars';
useSelector
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
        justifyContent: 'center',


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
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    tsmall: {

    },
    AvailButton: {
        backgroundColor: '#616161',
        borderColor: "#616161",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
    },
    langButton2: {
        backgroundColor: "#D4D4D4",
        borderColor: "#616161",
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
        color: "#616161",
        fontSize: 30,

    }

});
function Avail({ navigation }) {
    let firestore = useFirestore()
    let [name, setName] = useState('')
    let [gender, setGender] = useState('')
    let [DOB, setDOB] = useState('')
    let [email, setEmail] = useState('')

    let [date, setDate] = useState(new Date())

    let [show, setShow] = useState(false)
    const [recentlyDisabled1, setRecentlyDisabled1] = useState(false)
    const [recentlyDisabled2, setRecentlyDisabled2] = useState(true)
    const [errText, setErrText] = useState('')
    const uid = useSelector(state => state.userAppSettings.uid)
    const lang = useSelector(state => state.userAppSettings.lang)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }
    const showDatepicker = () => {
        setShow(true)
    }

    return (
        <ScrollView>

            <View style={styles.container}>
                <View style={styles.upperHalf} >
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
                            setDate(date.dateString)
                            firestore.collection(`dateslots/${date.toDateString()}`)
                                .doc(uid)
                                .get()
                                .then((userDoc) => {
                                    if (userDoc.exists) {

                                        setRecentlyDisabled1(true)
                                        setRecentlyDisabled2(false)
                                    }
                                    else {

                                        setRecentlyDisabled1(false)
                                        setRecentlyDisabled2(true)
                                    }
                                })
                                .catch((err) => {
                                    console.log('something seriously wrong 4 ' + err)
                                })
                        }}

                    />
                </View>
                <TouchableOpacity style={styles.AvailButton}
                    disabled={recentlyDisabled1}
                    onPress={() => {

                        firestore.collection(`dateslots/${date.toDateString()}`)
                            .doc(uid)
                            .update({
                                setAt: firebase.firestore.FieldValue.serverTimestamp(),
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

                        firestore.collection(`dateslots/${date.toDateString()}`)
                            .doc(uid)
                            .delete()
                            .catch((err) => {
                                setErrText('You never marked available this day!')
                            })
                        setRecentlyDisabled1(false)
                        setRecentlyDisabled2(true)


                    }}
                >
                    <Text style={styles.t1}>

                        Mark myself unavailable this day (default)
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

export default Avail
