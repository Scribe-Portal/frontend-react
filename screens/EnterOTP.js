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
        alignItems: 'center'
    },
    underlineStyleBase: {
        backgroundColor: "white",
        color: "black",



    },
    codeInputHighlightStyle: {
    }

});
export default function EnterOTP({ route, navigation }) {

    const { verificationId } = route.params
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    let [otp_input, set_otp_input] = useState('')
    let [status, setStatus] = useState('')
    let firestore = useFirestore()
    const { uid } = useSelector(state => state.firebase.auth)
    // useEffect(() => {
    //     firebase_auth.addAuthStateChangedListener((user) => {
    //         this.setState({ user });
    //       });
    //   });


    return (
        <View style={styles.container}>

            <OTPInputView
                style={{ width: '80%', height: 300, justifyContent: 'space-around' }}
                pinCount={6}
                code={otp_input} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={set_otp_input}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`)

                    const credential = firebase.auth.PhoneAuthProvider.credential(
                        verificationId,
                        code,
                    )
                    // let fbWorkerApp = firebase.apps.find(app => app.name === 'auth-worker') || firebase.initializeApp(firebase.app().options, 'auth-worker')
                    let fbWorkerAuth = firebase_auth()

                    fbWorkerAuth.signInWithCredential(credential)
                        .then((userCred) => {
                            
                            
                            console.log("verification OK")
                            firestore
                                .collection('users')
                                .doc(uid)
                                .get()
                                .then(userDoc => {
                                    if (userDoc.createdAt) {
                                        firestore.collection('users')
                                            .doc(uid)
                                            .set({
                                                isItAScribe: isItAScribe,
                                                appLang: lang,
                                            })
                                    }
                                    else {
                                        firestore.collection('users')
                                            .doc(uid)
                                            .set({
                                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                                isItAScribe: isItAScribe,
                                                appLang: lang,
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
            <Text>{status}</Text>


        </View>
    )
}



