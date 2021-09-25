/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';


import firebase_auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import { useSelector } from 'react-redux';
import EnterMobile from './EnterMobile'

import OTPInputView from '@twotalltotems/react-native-otp-input' // something for OTP UI, ignore it;
import { useFirestore } from 'react-redux-firebase';

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
        position: "absolute",
        top: "20%",
        textAlign:"center",
        color: "#616161",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        position: "absolute",
        top: 117,
        textAlign: "center",
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    text3: {
        position: "absolute",
        top: "95%",
        textAlign: "center",
        color: "#616161",
        fontSize: 25,
        fontWeight: '700',
    },
    text4: {
        position: "absolute",
        top: "75%",
        textAlign: "center",
        left: "23%",
        alignContent: "center",
        color: "#616161",
        fontSize: 23,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    text5: {
        position: "absolute",
        top: "80%",
        textAlign: "center",
        left: "30%",
        alignContent: "center",
        color: "#3A3A3A",
        fontSize: 23,
        fontWeight: '700',
        fontFamily: "lucida grande",
        textDecorationLine: "underline",
    },
    langButton1: {
        backgroundColor: '#616161',
        top: "20.75%",
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
        position: "absolute",
        top: "110%",
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
    },
    underlineStyleBase: {
        alignContent: "center",
        left: 40,
        backgroundColor: "white",
        color: "black",
    },
    codeInputHighlightStyle: {
    }
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
            
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>
                    OTP Verification,
                </Text>
                <Text style={styles.text2}>
                Enter OTP sent to {mobile}
                </Text>
                </View>
            <OTPInputView
                style={{ width: '80%', height: 400, justifyContent: 'space-around',alignContent:"center" }}
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
            <Text style={styles.text4}>
                Didn't recieve otp ?
                </Text>
                <Text style={styles.text5}>
                Re-Send OTP
                </Text>
            <Text>{status}</Text>


        </View>
    )
}



