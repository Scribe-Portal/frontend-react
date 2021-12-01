/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, PermissionsAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import RNSimData from 'react-native-sim-data'
import firebase from '@react-native-firebase/auth'

const styles = StyleSheet.create({
    container: {

        backgroundColor: "#B4E2DF",
        justifyContent: 'space-evenly'
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

        textAlign: "center",
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {

        textAlign: "center",
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",

    },
    text3: {
        
        textAlign: "center",
        color: "#19939A",
        fontSize: 25,
        fontWeight: '700',
    },
    text4: {



        textAlign: "center",
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",

    },
    errorTextBox: {

        marginVertical: 20,
    },
    langButton1: {
        backgroundColor: '#19939A',
        marginHorizontal: 5,
        marginVertical: 20,
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

    input: {
        marginHorizontal: 10,
        marginVertical: 20,
        
        alignContent: "center",
        justifyContent: 'space-around',
        height: 60,

        backgroundColor: "white"
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
function EnterMobile({ navigation }) {
    let [mobile, setMobile] = useState('')
    let [errorText, setErrorText] = useState('')
    useEffect(() => {
        async function getMobileNumber() {
            try {

                
                let mobileNumber = ''
                try {
        
                    mobileNumber = RNSimData.getSimInfo().phoneNumber0
                }
                catch {
                    try {
        
                        mobileNumber = RNSimData.getSimInfo().phoneNumber1
                    }
                    catch {
                        mobileNumber = ''
                    }
                }
                // console.log(mobileNumber)
                if (mobileNumber) return mobileNumber.substring(2, 12)
    
                return ''
            }
            catch (err) {
                console.warn(err)
            }
        }
        (async () => setMobile(await getMobileNumber()))()
        return () => {
            
        }
        
    }, [])
    const lang = useSelector(state => state.userAppSettings.lang)
    return (
        <ScrollView>



            <Text style={styles.text1}>
                OTP Verification,
            </Text>
            <Text style={styles.text2}>
                We will send you a one-time password to this mobile number
            </Text>
            <Text style={styles.text3}>
                Enter Your Mobile Number
            </Text>
            <TextInput
                placeholder="Enter Your Mobile No"
                onChangeText={setMobile}
                value={mobile}
                style={styles.input}
                defaultValue=""
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                keyboardType="phone-pad"
            />



            <TouchableOpacity style={styles.langButton1}
                onPress={() => {
                    firebase().verifyPhoneNumber("+91" + mobile).on(
                        'state_changed',
                        (phoneAuthSnapshot) => {

                            switch (phoneAuthSnapshot.state) {
                                case firebase.PhoneAuthState.CODE_SENT:
                                    // console.log('Verif code sent!', phoneAuthSnapshot)
                                    navigation.navigate('EnterOTP', { verificationId: phoneAuthSnapshot.verificationId, mobile: "+91" + mobile })
                                    break
                                case firebase.PhoneAuthState.ERROR:
                                    // console.log('Verif error', phoneAuthSnapshot)
                                    setErrorText("Can't send an OTP. Are you sure the number is right? ")
                                    break
                            }
                        },
                        (error) => {
                            // console.log(error)
                            setErrorText("We're having some problems. try again later?")
                        })

                }}
            >
                <Text style={styles.t1}>
                    Send OTP
                </Text>
            </TouchableOpacity>

            <View style={styles.errorTextBox}>

                <Text style={styles.text4}>
                    {errorText}
                </Text>
            </View>
        </ScrollView>
    )
}


export default EnterMobile
