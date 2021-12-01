/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { FillExamDetailsText } from '../translations'
import  DateTimePicker from '@react-native-community/datetimepicker';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
        justifyContent: 'center',


    },
    input: {
        marginVertical: 10,
        height: 40,
        borderRadius: 5,
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
    spacing: {
        minHeight: 10,
    },
    FillExamDetailsButton: {
        backgroundColor: '#19939A',
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
        borderWidth: 3,

    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    t2: {
        color: "#19939A",
        fontSize: 30,

    },
    
    datePicker: {
        
        backgroundColor: '#19939A',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    textInsideDatePicker: {
        color: "#FFFFFF",
        fontSize: 15,
    }

});
function CombineDateAndTime(date, time) {
    const mins = ("0"+ time.getMinutes()).slice(-2);
    const hours = ("0"+ time.getHours()).slice(-2);
    const timeString = hours + ":" + mins + ":00";
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateString = "" + year + "-" + month + "-" + day;
    const datec = dateString + "T" + timeString;
    return new Date(datec);
};
function FillExamDetails({ navigation }) {
    const lang = useSelector(state => state.userAppSettings.lang)
    const uid = useSelector(state => state.userAppSettings.uid)
    let firestore = useFirestore()
    let [name, setName] = useState('')
    
    let [time, setTime] = useState(new Date())
    let [examLang, setExamLang] = useState('')
    let [address, setAddress] = useState('')
    let [pinCode, setPinCode] = useState('')
    let [date, setDate] = useState(new Date()) 
    
    let [show, setShow] = useState(false) 
    let [show2, setShow2] = useState(false) 
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date 
        setShow(Platform.OS === 'ios') 
        setDate(new Date(currentDate)) 
    }
    const showDatepicker = () => {
        setShow(true)
    } 
    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date 
        setShow2(Platform.OS === 'ios') 
        setTime(new Date(currentDate)) 
    }
    const showTimepicker = () => {
        setShow2(true)
    }
    let maximumDate = new Date()
    maximumDate.setDate(maximumDate.getDate()+60)
    return (
        <View style={styles.container}>
            <View style={styles.centered}>

                <Text style={styles.text1}>
                    Fill Your Information,
                </Text>
                <Text>Name of Examination</Text>
                <TextInput onChangeText={setName} style={styles.input} />
                {/* <Text>Date of Examination (DDMMYYYY)</Text>
                <TextInput onChangeText={setName} style={styles.input} /> */}
                <TouchableOpacity onPress={showDatepicker} style={styles.datePicker} onPress={showDatepicker}>
                    <Text style={styles.textInsideDatePicker}>{`Date of Examination (${date.toDateString()})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showTimepicker} style={styles.datePicker} onPress={showTimepicker}>
                    <Text style={styles.textInsideDatePicker}>{`Time of Examination (${time.toLocaleTimeString()})`}</Text>
                </TouchableOpacity>
                
                {show && (
                    <DateTimePicker
                        testID="datepicker2"
                        value={date}
                        locale="in-IN"
                        mode="date"
                        display="default"
                        onChange={onChange}
                        maximumDate={maximumDate}
                    />
                )}
                <View style={styles.spacing}></View>
                
                {show2 && (
                    <DateTimePicker
                        testID="datepicker3"
                        value={time}
                        locale="in-IN"
                        mode="time"
                        display="default"
                        onChange={onChange2}
                    />
                )}
                <Text>Language of Examination</Text>
                <TextInput onChangeText={setExamLang} style={styles.input} />
                <Text>Address of Exam Center</Text>
                <TextInput onChangeText={setAddress} style={styles.input} />
                <Text>Pincode</Text>
                <TextInput onChangeText={setPinCode} style={styles.input} />
                <TouchableOpacity style={styles.FillExamDetailsButton}
                    onPress={() => {
                        firestore
                        .collection(`requests`)
                        .add({
                            status: 'pending',
                            uid: uid,
                            examName: name,
                            examDate: CombineDateAndTime(date, time),
                            examLang: examLang,
                            examAddress: address,
                            examPinCode: pinCode,
                            dateSlot: new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
                        })
                        .then((docRef) => navigation.navigate('UploadExamDoc', {requestId: docRef.id, dateSlot: new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0]}))
                    }}
                >
                    <Text style={styles.t1}>

                        Save and Next
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}


export default FillExamDetails
