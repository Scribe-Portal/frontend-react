/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { FillInfoText } from '../translations'
import { PLACEHOLDERS } from '@babel/types';
import { ScrollView } from 'react-native';
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
    input: {
        marginVertical: 10,
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
    FillInfoButton: {
        backgroundColor: '#19939A',
        
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
        alignItems: 'center',
        marginVertical: 10,
    },
    textInsideDoBPicker: {
        color: "#FFFFFF",
        fontSize: 15,
    }
});
function FillInfo({ navigation }) {
    let firestore = useFirestore()
    let [name, setName] = useState('')
    let [gender, setGender] = useState('')
    let [DOB, setDOB] = useState('')
    let [email, setEmail] = useState('')
    let [address, setAddress] = useState('')
    let [pinCode, setPinCode] = useState('')
    let [PL, setPL] = useState('')
    
    let [date, setDate] = useState(new Date()) 
    
    let [show, setShow] = useState(false) 
    
    const uid = useSelector(state => state.userAppSettings.uid)
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
    
    return (
        <View style={styles.container}>
        <ScrollView style={styles.inner_container}>

            <View style={styles.centered}>

                <Text style={styles.text1}>
                    Fill Your Information
                </Text>
                <Text>Name</Text>
                <TextInput onChangeText={setName} style={styles.input} />
                <Text>Gender</Text>
                <TextInput onChangeText={setGender} style={styles.input} />
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
                <Text>Email</Text>
                <TextInput onChangeText={setEmail} style={styles.input} />
                
                <Text>Address</Text>
                <TextInput onChangeText={setAddress} style={styles.input} />
                {isItAScribe && (
                    <View>
                        <Text>Preferred Languages</Text>
                        <TextInput onChangeText={setPL} style={styles.input} />
                    </View>

                )}
                <Text>Pin Code</Text>
                <TextInput onChangeText={setPinCode} style={styles.input} />
                <TouchableOpacity style={styles.FillInfoButton}
                    onPress={() => {
                        
                        if (name !== '' && gender !== ''  && email !== '' ) {
                            firestore.collection(isItAScribe?"scribes":"users")
                            .doc(uid)
                            .update({
                                name: name,
                                gender: gender,
                                DOB: date,
                                email: email,
                                address: address,
                                pinCode: pinCode,
                                languages: PL,
                            })
                            .then(() => {
                                    navigation.navigate('VolunteerPreference')
                                }
                            )
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
