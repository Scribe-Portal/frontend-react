/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Platform, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { FillExamDetailsText } from '../translations'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",


    },
    inner_container: {

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
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        color: "#19939A",
        fontSize: 20,
        fontWeight: '400',
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
    radioRoot: {
        backgroundColor: "white",
        flexDirection: 'row',
        padding: 10,
        marginVertical: 7,
        borderRadius: 5,
    },
    radioText: {
        margin: 7,
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
        fontSize: 20,
    },

    itemStyle: {
        fontSize: 10,
        fontFamily: "Roboto-Regular",
        color: "#007aff"
    },
    pickerStyle: {
        width: "100%",
        height: 40,
        color: "#007aff",
        fontSize: 14,
        fontFamily: "Roboto-Regular"
    },

});
function RadioButton({ i, text, selectedRadioButton, handleChange }) {
    return (
        <TouchableOpacity
            style={styles.radioRoot}
            onPress={handleChange}
        >
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                margin: 5,
                justifyContent: 'center',
            }}>
                {
                    selectedRadioButton ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
            <Text style={styles.radioText}>{text}</Text>
        </TouchableOpacity>

    );
}
function CombineDateAndTime(date, time) {
    const mins = ("0" + time.getMinutes()).slice(-2);
    const hours = ("0" + time.getHours()).slice(-2);
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

    let [address, setAddress] = useState('')
    let [pinCode, setPinCode] = useState('')
    let [date, setDate] = useState(new Date())
    let [English, setEnglish] = useState(false);
    let [CBT, setCBT] = useState(false);
    let [Hindi, setHindi] = useState(false);
    let [show, setShow] = useState(false)
    let [show2, setShow2] = useState(false)
    let [touched1, setTouched1] = useState(false)
    let [touched2, setTouched2] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setTouched1(true)
        setDate(new Date(currentDate))
        // console.log(selectedDate)
    }
    const showDatepicker = () => {
        setShow(true)
    }
    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date
        // console.log(selectedDate)
        setTouched2(true)
        setShow2(Platform.OS === 'ios')
        setTime(new Date(currentDate))
    }
    const showTimepicker = () => {
        setShow2(true)
    }
    let languages = ["English", "Hindi", "Computer Based Test"]
    let maximumDate = new Date()
    maximumDate.setDate(maximumDate.getDate() + 60)
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>

                <View style={styles.centered}>

                    <Text style={styles.text1}>
                        Fill Your Exam Details
                    </Text>
                    <Text style={styles.text2}>Name of Examination</Text>
                    <TextInput onChangeText={setName} style={styles.input} />
                    <TouchableOpacity onPress={showDatepicker} style={styles.datePicker} onPress={showDatepicker}>
                        <Text style={styles.textInsideDatePicker}>{`Date of Examination (${touched1 ? (String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' +  date.getFullYear()) : "Press to choose"
                        })`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showTimepicker} style={styles.datePicker} onPress={showTimepicker}>
                        <Text style={styles.textInsideDatePicker}>
                        
                        {`Time of Examination (${touched2 ? (String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')) : "Press to choose"})`}
                        </Text>
                    </TouchableOpacity>

                    {show ? (
                        <DateTimePicker
                            testID="datepicker2"
                            value={date}
                            locale="in-IN"
                            mode="date"
                            display="default"
                            onChange={onChange}
                            maximumDate={maximumDate}
                        />
                    ) : null}
                    <View style={styles.spacing}></View>

                    {show2 ? (
                        <DateTimePicker
                            testID="datepicker3"
                            value={time}
                            locale="in-IN"
                            mode="time"
                            display="default"
                            onChange={onChange2}
                        />
                    ) : null}
                    <Text style={styles.text2}>Language of Examination</Text>
                    <RadioButton
                        text="English"
                        selectedRadioButton={English}
                        handleChange={() => { setEnglish(!English) }}
                    />
                    <RadioButton
                        text="Hindi"
                        selectedRadioButton={Hindi}
                        handleChange={() => { setHindi(!Hindi) }}
                    />
                    <Text style={styles.text2}>Is the exam Computer Based Test (CBT)</Text>
                    <RadioButton
                        text="Yes"
                        selectedRadioButton={CBT}
                        handleChange={() => { setCBT(!CBT) }}
                    />


                    <Text style={styles.text2}>Address of Exam Center</Text>
                    <TextInput onChangeText={setAddress} style={styles.input} />
                    <Text style={styles.text2}>PIN code</Text>
                    <TextInput onChangeText={setPinCode} style={styles.input} />
                    <TouchableOpacity style={styles.FillExamDetailsButton}
                        onPress={() => {
                            if (name !== '' && address !== '') {

                                firestore
                                    .collection(`requests`)
                                    .add({
                                        status: 'pending',
                                        uid: uid,
                                        examName: name,
                                        examDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()),
                                        English: English,
                                        Hindi: Hindi,
                                        CBT: CBT,
                                        examAddress: address,
                                        examPinCode: pinCode,
                                        dateSlot: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0],
                                        volunteerAccepted: "none"
                                    })
                                    .then((docRef) => navigation.navigate('UploadExamDoc', { requestId: docRef.id, dateSlot: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0] }))
                            }
                        }}
                    >
                        <Text style={styles.t1}>

                            Save and Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
    )
}


export default FillExamDetails
