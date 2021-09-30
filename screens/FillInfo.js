/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { FillInfoText } from '../translations'
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
    FillInfoButton: {
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
function FillInfo({ navigation }) {
    let firestore = useFirestore()
    let [name, setName] = useState('')
    let [gender, setGender] = useState('')
    let [DOB, setDOB] = useState('')
    let [email, setEmail] = useState('')
    
    let [date, setDate] = useState(new Date()) 
    
    let [show, setShow] = useState(false) 
    const { uid } = useSelector(state => state.firebase.auth)
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
        <View style={styles.container}>
            <View style={styles.centered}>

                <Text style={styles.text1}>
                    Fill Your Information,
                </Text>
                <Text>Name</Text>
                <TextInput onChangeText={setName} style={styles.input} />
                <Text>Gender</Text>
                <TextInput onChangeText={setGender} style={styles.input} />
                <Button title ="Date of Birth (DD MM YYYY)" onPress={showDatepicker}></Button>
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
                <TouchableOpacity style={styles.FillInfoButton}
                    onPress={() => {
                        if (name !== '' && gender !== ''  && email !== '' ) {
                            firestore.update(`users/${uid}`, {
                                name: name,
                                gender: gender,
                                DOB: date,
                                email: email,
                                
                            })
                            navigation.navigate('VolunteerPreference')
                        }

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

export default FillInfo
