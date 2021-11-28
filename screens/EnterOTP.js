/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';

import RNOtpVerify from 'react-native-otp-verify';

import firebase_auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import { useDispatch, useSelector } from 'react-redux';

import OTPInputView from '@twotalltotems/react-native-otp-input' // something for OTP UI, ignore it;
import { useFirestore } from 'react-redux-firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeUid } from '../reducers/userAppSettingsReducer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        justifyContent: 'space-evenly',
        paddingVertical: 20,
    },
    underlineStyleBase: {
        backgroundColor: "white",
        color: "black",



    },
    codeInputHighlightStyle: {
    },
    text1: {

        marginVertical: 10,
        marginHorizontal: 13,
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center'
    },
    text2: {

        marginVertical: 10,
        marginHorizontal: 13,
        width: 321,
        height: 48,
        textAlign: "center",
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    langButton1: {


        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#616161',

        borderColor: "#616161",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        borderWidth: 3,
    },
    input: {

        marginVertical: 10,
        marginHorizontal: 13,

        alignContent: "center",
        justifyContent: 'space-around',
        height: 60,

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
    const dispatch = useDispatch();
    const verifyOTP = () => {

        // console.log(`Code is ${code}, you are good to go!`)
        let credential
        
        

        try {

            if(otp_input) credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                otp_input,
            )
        }
        catch (err) {
            // console.log(err)
        }
        let fbWorkerAuth = firebase_auth()
    
        credential && fbWorkerAuth.signInWithCredential(credential)
            .then(async (userCred) => {


                // console.log("verification OK")
                let fcmToken
                try {

                    fcmToken = await AsyncStorage.getItem('fcmToken')
                }
                catch {
                    // console.log("can't get fcm token return")
                    
                }
                let userDoc
                try {
                    userDoc = await firestore
                        .collection(isItAScribe ? 'scribes' : 'users')
                        .doc(uid)
                        .get()
                    // console.log(isItAScribe, lang, fcmToken)
                    if (userDoc.exists) {
                        try {

                            await firestore.collection(isItAScribe ? 'scribes' : 'users')
                                .doc(uid)
                                .update({
                                    isItAScribe: isItAScribe,
                                    appLang: lang,
                                    fcmToken: fcmToken,
                                })
                        }
                        catch (err) {
                            setStatus('something seriously wrong 1, ' + err);
                        }
                        dispatch(changeUid({newUid: uid}))
                        navigation.reset({ index: 0, routes: [{ name: 'Home' }] })

                    }
                    else {

                        try {

                            await firestore.collection(isItAScribe ? 'scribes' : 'users')
                                .doc(uid)
                                .set({
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                    isItAScribe: isItAScribe,
                                    appLang: lang,
                                    fcmToken: fcmToken,
                                    mobile: mobile
                                })
                        }
                        catch (err) {
                            setStatus('something seriously wrong 2, ' + err);
                        }
                        dispatch(changeUid({newUid: uid}))
                        navigation.reset({ index: 0, routes: [{ name: 'FillInfo' }] })
                    }

                }
                catch (err) {
                    setStatus('something seriously wrong 3, ' + err)
                }

            })
            .catch((err) => {
                setStatus("Wrong OTP!")
                
            })
        
    }
    
    
    useEffect(() => {
        // console.log("hi")
        RNOtpVerify.getHash()
        .catch(setStatus)
        // .then(console.log)
        RNOtpVerify.getOtp()
        .then(p =>
            RNOtpVerify.addListener(message => {
                // console.log("hi2", message)
                try {
                    if (message) {
                        const messageArray = message.split(' ')
                        // console.log(messageArray)
                        set_otp_input(messageArray[0])
                        
                    }
                } catch (err) {
                    setStatus(err)
                }
            })
        )
        .catch(err => setStatus)

        return () => {
            RNOtpVerify.removeListener()
        }
    }, [])
    let new_sign_in = true
    return (
        <ScrollView>

            <View style={styles.container}>
                <Text style={styles.text1}>
                    OTP Verification,
                </Text>
                <Text style={styles.text2}>
                    An OTP has been sent to {mobile}
                </Text>
                <TextInput
                    placeholder="Enter OTP"
                    value={otp_input}
                    onChangeText={set_otp_input}
                    style={styles.input}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    keyboardType="phone-pad"
                />
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
                    onPress={verifyOTP}
                >
                    <Text style={styles.t1}>

                        Proceed
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langButton1}
                    onPress={() => {
                        crashlytics().log('Login button pressed')
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
        </ScrollView>
    )
}


