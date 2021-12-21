/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { FillInfoText } from '../translations'
import { PLACEHOLDERS } from '@babel/types';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeUid } from '../reducers/userAppSettingsReducer';
useSelector
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    inner_container: {
        flexGrow: 1,
        backgroundColor: "#B4E2DF",


    },
    c1: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    middle_spacing: {
        flexGrow: 1,
        // backgroundColor: "red",
    },
    c2: {
        marginHorizontal: 20,
        marginVertical: 10,

    },
    input: {
        marginVertical: 3,
        height: 40,
        borderRadius: 5,
        backgroundColor: "white"
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
    FillInfoButton: {
        backgroundColor: '#19939A',
        marginVertical: 5,

        borderRadius: 10,
        padding: 5,
        alignItems: 'center',

    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    dateOfBirthPicker: {

        backgroundColor: '#19939A',
        borderRadius: 10,
        padding: 5,
        height: 40,
        alignItems: 'center',
        marginVertical: 10,
    },
    textInsideDoBPicker: {
        color: "#FFFFFF",
        fontSize: 20,
    }
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
function RadioButton2({ i, text, selectedRadioButton, handleChange }) {
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
                    (selectedRadioButton === i) ?
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
function FillInfo({ navigation }) {
    let firestore = useFirestore()
    let [name, setName] = useState('')
    let [gender, setGender] = useState('')
    let [DOB, setDOB] = useState('')
    let [email, setEmail] = useState('')
    let [address, setAddress] = useState('')
    let [pinCode, setPinCode] = useState('')
    let [eno, setEno] = useState('')
    let [radio, setRadio] = useState('')
    let [English, setEnglish] = useState(false);
    let [CBT, setCBT] = useState(false);
    let [Hindi, setHindi] = useState(false);
    let [Math, setMath] = useState(false);
    let [PL, setPL] = useState('')

    let [date, setDate] = useState(new Date())

    let [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const uid = useSelector(state => state.userAppSettings.tempuid)
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }
    const showDatepicker = () => {
        setShow(true)
    }
    const genders = ["male", "female", "not to say"]
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>



                <View style={styles.c1}>
                    <Text style={styles.text1}>
                        Fill Your Information
                    </Text>
                    <Text style={styles.text2}>Name</Text>
                    <TextInput onChangeText={setName} style={styles.input} />
                    {isItAScribe ? (
                        <View>
                            <Text style={styles.text2}>Entry Number</Text>
                            <TextInput onChangeText={setEno} style={styles.input} />
                        </View>

                    ) : null}
                    <Text style={styles.text2}>Gender</Text>
                    <RadioButton2
                        text="Male"
                        i={0}
                        selectedRadioButton={radio}
                        handleChange={() => { setRadio(0) }}
                    />
                    <RadioButton2
                        text="Female"
                        i={1}
                        selectedRadioButton={radio}
                        handleChange={() => { setRadio(1) }}
                    />
                    <RadioButton2
                        text="Prefer not to say"
                        i={2}
                        selectedRadioButton={radio}
                        handleChange={() => { setRadio(2) }}
                    />
                    <TouchableOpacity onPress={showDatepicker} style={styles.dateOfBirthPicker} onPress={showDatepicker}>
                        <Text style={styles.textInsideDoBPicker}>{`Date of Birth (${date.toDateString()})`}</Text>
                    </TouchableOpacity>

                    {show && (
                        <DateTimePicker
                            testID="datePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <Text style={styles.text2}>Email</Text>
                    <TextInput onChangeText={setEmail} style={styles.input} />

                    <Text style={styles.text2}>Address</Text>
                    <TextInput onChangeText={setAddress} style={styles.input} />
                    <Text style={styles.text2}>Mode of Exam</Text>
                    <RadioButton
                        text="English"
                        selectedRadioButton={English}
                        handleChange={() => { setEnglish(!English); setPL(1)}}
                    />
                    <RadioButton
                        text="Hindi"
                        selectedRadioButton={Hindi}
                        handleChange={() => { setHindi(!Hindi); setPL(1) }}
                    />
                    <RadioButton
                        text="CBT"
                        selectedRadioButton={CBT}
                        handleChange={() => { setCBT(!CBT); setPL(1) }}
                    />
                    <RadioButton
                        text="Maths"
                        selectedRadioButton={Math}
                        handleChange={() => { setMath(!Math); setPL(1) }}
                    />

                    <Text style={styles.text2}>Pin Code</Text>
                    <TextInput onChangeText={setPinCode} style={styles.input} />

                </View>
                <View style={styles.middle_spacing}></View>
                <View style={styles.c2}>

                    <TouchableOpacity style={styles.FillInfoButton}
                        onPress={() => {
                            console.log(eno)
                            console.log(PL)
                            console.log((!isItAScribe || (eno !== '' && PL !== '')) )
                            if (name !== '' && radio !== '' && email !== '' && address !== ''  && (!isItAScribe || (eno !== '' && PL !== ''))) {
                                firestore.collection(isItAScribe ? "scribes" : "users")
                                    .doc(uid)
                                    .update({
                                        name: name,
                                        gender: genders[radio],
                                        DOB: date,
                                        email: email,
                                        address: address,
                                        pinCode: pinCode,
                                        languages: PL,
                                        eno: eno,
                                        English: English,
                                        Hindi: Hindi,
                                        CBT: CBT,
                                        Math: Math,
                                    })
                                    .then(() => {
                                        dispatch(changeUid({newUid: uid}))
                                        navigation.navigate('UploadDoc', { fromHome: false})
                                    })

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

export default FillInfo
