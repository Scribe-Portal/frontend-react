/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';


import firebase_auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import { useSelector } from 'react-redux';

import OTPInputView from '@twotalltotems/react-native-otp-input' // something for OTP UI, ignore it;
import { useFirestore } from 'react-redux-firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        alignItems: 'center',
        paddingVertical: 20,
    },
    underlineStyleBase: {
        backgroundColor: "white",
        color: "black",



    },
    codeInputHighlightStyle: {
    },
    text1: {

        top:20,
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        top: 40,
        width: 321,
        height: 48,
       textAlign: "center",
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    langButton1: {
        margin:20,
        top:250,
        backgroundColor: '#616161',
        width:"100%",
        borderColor: "#616161",
        borderRadius: 10,
        padding: 10,
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

});
export default function EnterOTP({ route, navigation }) {

    let { verificationId, mobile } = route.params
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    let [otp_input, set_otp_input] = useState('')
    let [status, setStatus] = useState('')
    let firestore = useFirestore()
    const { uid } = useSelector(state => state.firebase.auth)

    let new_sign_in = true
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>
                OTP Verification,
            </Text>
            <Text style={styles.text2}>
                An OTP has been sent to {mobile}
            </Text>
            <TextInput placeholder="Enter OTP" onChangeText={set_otp_input} style={styles.input} />
            {/* <OTPInputView
                style={{ width: '80%', height: 300, justifyContent: 'space-around' }}
                pinCount={6}
                code={otp_input} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={set_otp_input}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={
                }}
            /> */}
            <TouchableOpacity style={styles.langButton1}
                    onPress={() => {
                        
                    // console.log(`Code is ${code}, you are good to go!`)

                    const credential = firebase.auth.PhoneAuthProvider.credential(
                        verificationId,
                        otp_input,
                    )
                    // let fbWorkerApp = firebase.apps.find(app => app.name === 'auth-worker') || firebase.initializeApp(firebase.app().options, 'auth-worker')
                    let fbWorkerAuth = firebase_auth()

                    fbWorkerAuth.signInWithCredential(credential)
                        .then((userCred) => {
                            
                            
                            // console.log("verification OK")
                            firestore
                                .collection('users')
                                .doc(uid)
                                .get()
                                .then(userDoc => {
                                    console.log(userDoc)
                                    if ("createdAt" in userDoc._data) {
                                        new_sign_in = false
                                        // console.log('not a new signin')
                                        firestore.collection(isItAScribe?'scribes':'users')
                                            .doc(uid)
                                            .set({
                                                isItAScribe: isItAScribe,
                                                appLang: lang,
                                                
                                            })
                                        
                                    }
                                    else {
                                        // console.log(' a new signin')
                                        firestore.collection(isItAScribe?'scribes':'users')
                                            .doc(uid)
                                            .set({
                                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                                isItAScribe: isItAScribe,
                                                appLang: lang,
                                                mobile: mobile
                                            })

                                    }

                                })
                                .then(() => {
                                        if (new_sign_in) {

                                            navigation.reset({ index: 0, routes: [{ name: 'FillInfo' }] })
                                        }
                                        else {
                                            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                                        }

                                    }

                                )
                        })
                        .catch((err) => {
                            setStatus("Wrong OTP!")
                            // console.log(err)
                        })
                    }}
            >
                <Text style={styles.t1}>

                    Proceed 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.langButton1}
                    onPress={() => {
                        firebase_auth().verifyPhoneNumber(mobile).on(
                            'state_changed',
                            (phoneAuthSnapshot) => {

                                switch (phoneAuthSnapshot.state) {
                                    case firebase_auth.PhoneAuthState.CODE_SENT:
                                        // console.log('Verif code sent!', phoneAuthSnapshot)
                                        setStatus("We've resent the OTP, hope you got it!")
                                        verificationId = phoneAuthSnapshot.verificationId
                                        break
                                    case firebase_auth.PhoneAuthState.ERROR:
                                        // console.log('Verif error', phoneAuthSnapshot)
                                        setStatus("Can't send the OTP, maybe try again later")
                                        
                                        break
                                }
                            },
                            (error) => {
                                // console.log(error)
                                setStatus("Can't send the OTP, maybe try again later")
                            })

                    }}
            >
                <Text style={styles.t1}>

                    Didn't get OTP? Resend OTP
                </Text>
            </TouchableOpacity>
            
            <Text style={styles.text1}>{status}</Text>


        </View>
    )
}


