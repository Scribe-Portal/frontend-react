/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useSelector } from 'react-redux'

import firebase from '@react-native-firebase/auth'
var forward;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
    },
    upperHalf: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerHalf: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-around'
    },
    text1: {
        top: 30,
        textAlign:"center",
        color: "#616161",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        top: 60,
        width: 321,
        height: 48,
        textAlign: "center",
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    text3: {
        top: 150,
        textAlign: "center",
        color: "#616161",
        fontSize: 25,
        fontWeight: '700',
    },
    langButton1: {
        backgroundColor: '#616161',
        top: 140,
        borderColor: "#616161",
        borderRadius: 10,
        padding: 10,
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

    input: {
        margin: 10,
        top: 160,
        alignContent: "center",
        justifyContent: 'space-around',
        height: 60,
        width: 300,
        backgroundColor: "white"
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
function EnterMobile({ navigation }) {
    let [mobile, setMobile] = useState('+918076396576')
    let [errorText, setErrorText] = useState('')
    forward=mobile
    // console.log(forward)
    const lang = useSelector(state => state.userAppSettings.lang)
    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>
                    OTP Verification,
                </Text>
                <Text style={styles.text2}>
                We will send you a one-time password to this mobile number
                </Text>
                <Text style={styles.text3}>
                Enter Your Mobile Number
                </Text>
                <TextInput placeholder="Enter Your Mobile No" onChangeText={setMobile} style={styles.input} defaultValue="+91" />

            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={styles.langButton1}
                    onPress={() => {
                        firebase().verifyPhoneNumber(mobile).on(
                            'state_changed',
                            (phoneAuthSnapshot) => {

                                switch (phoneAuthSnapshot.state) {
                                    case firebase.PhoneAuthState.CODE_SENT:
                                        // console.log('Verif code sent!', phoneAuthSnapshot)
                                        navigation.navigate('EnterOTP', { verificationId: phoneAuthSnapshot.verificationId, mobile: mobile })
                                        break
                                    case firebase.PhoneAuthState.ERROR:
                                        console.log('Verif error', phoneAuthSnapshot)
                                        setErrorText("Can't send an OTP. Are you sure the number is right? ")
                                        break
                                }
                            },
                            (error) => {
                                console.log(error)
                                setErrorText("We're having some problems. try again later?")
                            })

                    }}
                >
                    <Text style={styles.t1}>

                        Send OTP
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text1}>
                    {errorText}
                </Text>
            </View>

        </View>
    )
}


export default EnterMobile
