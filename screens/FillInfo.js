/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { Email, FillInformation, FillInfoText, Name, Gender, SaveAndNext, DOB, Address, EntryNo, PreferredLanguages, PinCode,  } from '../translations'
import { PLACEHOLDERS } from '@babel/types';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeUid } from '../reducers/userAppSettingsReducer';

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
    let [touched1, setTouched1] = useState(false)
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
        setTouched1(true)
        setShow(true)
    }
    const genders = ["male", "female", "not to say"]
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>



                <View style={styles.c1}>
                    <Text style={styles.text1}>
                        {FillInformation[lang]}
                        
                    </Text>
                    <Text style={styles.text2}>{Name[lang]}</Text>
                    <TextInput onChangeText={setName} style={styles.input} />
                    {isItAScribe ? (
                        <View>
                            <Text style={styles.text2}>{EntryNo[lang]}</Text>
                            <TextInput onChangeText={setEno} style={styles.input} />
                        </View>

                    ) : null}
                    <Text style={styles.text2}>{Gender[lang]}</Text>
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
                        <Text style={styles.textInsideDoBPicker}>{`Date of Birth (${touched1 ? (String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' +  date.getFullYear()) : "Press to choose"
                        })`}</Text>
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
                    <Text style={styles.text2}>{Email[lang]}</Text>
                    <TextInput onChangeText={setEmail} style={styles.input} />
                    {
                        isItAScribe ? (
                            <View>
                                <Text style={styles.text2}>Are you comfortable giving exams in English?</Text>
                                <RadioButton
                                    text="Yes"
                                    selectedRadioButton={English}
                                    handleChange={() => { setEnglish(!English); setPL(1)}}
                                />
                                <Text style={styles.text2}>Are you comfortable giving exams in Hindi?</Text>
                                <RadioButton
                                    text="Yes"
                                    selectedRadioButton={Hindi}
                                    handleChange={() => { setHindi(!Hindi); setPL(1) }}
                                />
                                <Text style={styles.text2}>Are you comfortable giving exams in CBT?</Text>
                                <RadioButton
                                    text="Yes"
                                    selectedRadioButton={CBT}
                                    handleChange={() => { setCBT(!CBT); setPL(1) }}
                                />
                                <Text style={styles.text2}>Are you comfortable giving exams in Math?</Text>
                                <RadioButton
                                    text="Yes"
                                    selectedRadioButton={Math}
                                    handleChange={() => { setMath(!Math); setPL(1) }}
                                />
                            </View>
                        ) : null
                    }
                    <Text style={styles.text2}>{Address[lang]}</Text>
                    <TextInput onChangeText={setAddress} style={styles.input} />

                    <Text style={styles.text2}>{PinCode[lang]}</Text>
                    <TextInput onChangeText={setPinCode} style={styles.input} />

                </View>
                <View style={styles.middle_spacing}></View>
                <View style={styles.c2}>

                    <TouchableOpacity style={styles.FillInfoButton}
                        onPress={() => {
                            
                            if (name !== '' && radio !== '' && email !== '' && address !== '' && (!isItAScribe || (eno !== '' && PL !== ''))) {
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
                                        numRatings: 0,
                                    })
                                    .then(() => {
                                        dispatch(changeUid({newUid: uid}))
                                        console.log("the final uid - ", uid)
                                        navigation.reset({index: 0, routes: [{name: 'UploadDoc', params: { fromHome: false}} ]})
                                        
                                    })

                            }

                        }}
                    >
                        <Text style={styles.t1}>

                            {SaveAndNext[lang]}
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


        </View>
    )

}

export default FillInfo
