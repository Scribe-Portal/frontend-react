/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, PermissionsAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RNSimData from 'react-native-sim-data'

import { useFirestore } from 'react-redux-firebase';
import { changeUid } from '../reducers/userAppSettingsReducer'

import RNOtpVerify from 'react-native-otp-verify';

import firebase_auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
const styles_confirmed = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
    },
    underlineStyleBase: {
        backgroundColor: "white",
        color: "black",



    },
    inner_container: {

        justifyContent: 'space-evenly',
        paddingVertical: 20,
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
        backgroundColor: '#19939A',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    inner_container: {
        flexGrow: 1,
        backgroundColor: "#B4E2DF",


    },
    middle_spacing: {
        flex: 0,
        flexGrow: 1,



    },
    c1: {


    },
    c2: {


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
    let [confirm, setConfirm] = useState(null)
    let [errorText, setErrorText] = useState('')
    let [otp_input, set_otp_input] = useState('')
    let [status, setStatus] = useState('')
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    const uid = useSelector(state => state.userAppSettings.uid)
    let firestore = useFirestore()
    const dispatch = useDispatch()

    
    // get the phone number
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
    // get the OTP
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
    // listen to auth state changes
    useEffect(() => {
        const subscriber = firebase_auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    // function to verify the OTP
    const onAuthStateChanged = (user) => {
        if (user) {
            dispatch(changeUid({ newUid: user.uid }))
        }
    }
    const setFirestoreEntry = async () => {
        let fcmToken
        try {
            fcmToken = await AsyncStorage.getItem('fcmToken')
        }
        catch {
            console.log("can't get the fcm token")
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

                    if (fcmToken) await firestore.collection(isItAScribe ? 'scribes' : 'users')
                        .doc(uid)
                        .update({
                            isItAScribe: isItAScribe,
                            appLang: lang,
                            fcmToken: fcmToken,
                        })
                    else await firestore.collection(isItAScribe ? 'scribes' : 'users')
                        .doc(uid)
                        .update({
                            isItAScribe: isItAScribe,
                            appLang: lang,

                        })
                }
                catch (err) {
                    setStatus('something seriously wrong 1, ' + err);
                }
                dispatch(changeUid({ newUid: uid }))
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] })

            }
            else {

                try {

                    if (fcmToken) await firestore.collection(isItAScribe ? 'scribes' : 'users')
                        .doc(uid)
                        .set({
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            isItAScribe: isItAScribe,
                            appLang: lang,
                            fcmToken: fcmToken,
                            mobile: mobile
                        })
                    else await firestore.collection(isItAScribe ? 'scribes' : 'users')
                        .doc(uid)
                        .set({
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            isItAScribe: isItAScribe,
                            appLang: lang,

                            mobile: mobile
                        })

                }
                catch (err) {
                    setStatus('something seriously wrong 2, ' + err);
                }
                dispatch(changeUid({ newUid: uid }))
                navigation.reset({ index: 0, routes: [{ name: 'FillInfo' }] })
            }

        }
        catch (err) {
            setStatus('something seriously wrong 3,'+err)
        }
    }
    const verifyOTP = async () => {
        if (!firebase_auth().currentUser){

            try {
                await confirm.confirm(otp_input)
                await setFirestoreEntry()
            }
            catch (err) {
                
                setStatus("Wrong OTP!", err)
                console.log(err)
                return
            }
        }
        else {
            setFirestoreEntry()
        }
        
        
    }

    if (confirm) { // when the OTP has been sent, and is yet to be verified
        return (
            <ScrollView style={styles_confirmed.container}>

                <View style={styles_confirmed.inner_container}>
                    <Text style={styles_confirmed.text1}>
                        OTP Verification,
                    </Text>
                    <Text style={styles_confirmed.text2}>
                        An OTP has been sent to {mobile}
                    </Text>
                    <TextInput
                        placeholder="Enter OTP"
                        value={otp_input}
                        onChangeText={set_otp_input}
                        style={styles_confirmed.input}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity style={styles_confirmed.langButton1}
                        onPress={verifyOTP}
                    >
                        <Text style={styles_confirmed.t1}>

                            Proceed
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles_confirmed.langButton1}
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
                        <Text style={styles_confirmed.t1}>

                            Didn't get OTP? Resend OTP
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles_confirmed.text1}>{status}</Text>


                </View>
            </ScrollView>

        )
    }
    else {

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.inner_container}>



                    <View style={styles.c1}>
                        <Text style={styles.text1}>
                            OTP Verification,
                        </Text>
                        <Text style={styles.text2}>
                            We will send you a one-time password to this mobile number
                        </Text>
                        <Text style={styles.text3}>
                            Enter Your Mobile Number
                        </Text>
                    </View>
                    <View style={styles.middle_spacing}>

                    </View>
                    <View style={styles.c2}>
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
                            onPress={async () => {
                                try {

                                    const confirmation = await firebase_auth().signInWithPhoneNumber("+91" + mobile)
                                    setConfirm(confirmation)
                                }
                                catch {
                                    setErrorText("Can't send an OTP. Are you sure the number is right?")

                                }
                                    

                            }}
                        >
                            <Text style={styles.t1}>
                                Send OTP
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.errorTextBox}>

                        <Text style={styles.text4}>
                            {errorText}
                        </Text>
                    </View>
                </ScrollView>
            </View>

        )
    }
}


export default EnterMobile
