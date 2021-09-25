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
        backgroundColor: "#D4D4D4",
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
        color: "#828282",
        fontSize: 20,
        fontWeight: '700',
    },
    langButton1: {
        backgroundColor: '#616161',
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

});
export default function EnterOTP({ route, navigation }) {

    let { verificationId, mobile } = route.params
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    let [otp_input, set_otp_input] = useState('')
    let [status, setStatus] = useState('')
    let firestore = useFirestore()
    const { uid } = useSelector(state => state.firebase.auth)


    return (
        <View style={styles.container}>
            <Text style={styles.text1}>
                An OTP has been sent to {mobile}
            </Text>
            <OTPInputView
                style={{ width: '80%', height: 300, justifyContent: 'space-around' }}
                pinCount={6}
                code={otp_input} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={set_otp_input}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                    // console.log(`Code is ${code}, you are good to go!`)

                    const credential = firebase.auth.PhoneAuthProvider.credential(
                        verificationId,
                        code,
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
                                    if (userDoc.createdAt) {
                                        firestore.collection(isItAScribe?'scribes':'users')
                                            .doc(uid)
                                            .set({
                                                isItAScribe: isItAScribe,
                                                appLang: lang,
                                                mobile: mobile
                                            })
                                    }
                                    else {
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
                            navigation.reset({ index: 0, routes: [{ name: 'FillInfo' }] })
                        })
                        .catch((err) => {
                            setStatus("Wrong OTP!")
                            console.log(err)
                        })
                }}
            />
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
                                        console.log('Verif error', phoneAuthSnapshot)
                                        setStatus("Can't send the OTP, maybe try again later")
                                        
                                        break
                                }
                            },
                            (error) => {
                                console.log(error)
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



