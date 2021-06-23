/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';


import firebase_auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'


import { // something for OTP UI, ignore it
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_SIZE = 40;
const CELL_BORDER_RADIUS = 8;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
    },
    upperHalf: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerHalf: {
        flex: 2,
        margin: 20,
        justifyContent: 'space-around'
    },
    text1: {
        alignSelf: "center",
        color: "#828282",
        fontSize: 30,
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
    langButton2: {
        backgroundColor: "#D4D4D4",
        borderColor: "#616161",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,

    },
    codeFieldRoot: {
        height: CELL_SIZE,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        ...Platform.select({ // copied from internet
            ios: {

                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
            },
            android: {
                elevation: 3,

            }
        }),
        fontSize: 30,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: '#3759b8',
        backgroundColor: '#fff',
    },
    focusCell: {
        borderColor: '#000',
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
export default function EnterOTP({ route, navigation }) {

    const { lang, verificationId } = route.params

    const [otp_input, set_otp_input] = useState('')
    const [status, setStatus] = useState('')

    const ref = useBlurOnFulfill({ otp_input, cellCount: 6 })
    const [prps, getCellOnLayoutHandler] = useClearByFocusCell({
        otp_input,
        set_otp_input,
    })

    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <CodeField
                    ref={ref}
                    {...prps}
                    value={otp_input}
                    onChangeText={set_otp_input}
                    cellCount={6}
                    onFocus={()=>{}}
                    onBlur={()=>{}}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />

                <Text>{status}</Text>
            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={styles.langButton1}
                    onPress={() => {
                        const credential = firebase.auth.PhoneAuthProvider.credential(
                            verificationId,
                            otp_input,
                        )
                        // let fbWorkerApp = firebase.apps.find(app => app.name === 'auth-worker') || firebase.initializeApp(firebase.app().options, 'auth-worker')
                        let fbWorkerAuth = firebase_auth()

                        fbWorkerAuth.signInWithCredential(credential)
                            .then((userCred) => {
                                console.log("verification OK")
                                navigation.navigate('FillInfo')
                            })
                            .catch((err) => {
                                setStatus("Wrong OTP!")
                                console.log(err.code)
                            })
                    }}
                >
                    <Text style={styles.t1}>

                        Check OTP
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}



