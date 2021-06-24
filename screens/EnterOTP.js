/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';


// import firebase_auth from '@react-native-firebase/auth'
// import firebase from '@react-native-firebase/app'


import OTPInputView from '@twotalltotems/react-native-otp-input' // something for OTP UI, ignore it;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
    },

});

class Cell extends Component {
    constructor(props) {
        this._cell = (
            <TextInput  onFocus={this.onFocus}  autoFocus={true} {...props}/>
        )
    }
    static propTypes = { 
        focus: PropTypes.bool,
    } 

    static defaultProps = { 
        focus: false,
    }
    focus() {
        this._cell.focus()
    }
    componentDidUpdate({ focus }) {
        focus && this.focus()
    }
    render() {
        return(this._cell)
    }
}


function OTPInputView(props) {
    cells = []
    let []
    for (i = 0; i < 6; i++) {
        cells.push(

        )
    }
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-around',
        }}>
            {cells}
        </View>
    )
}
export default function EnterOTP({ route, navigation }) {

    const { lang, verificationId } = route.params

    let [otp_input, set_otp_input] = useState('')
    let [status, setStatus] = useState('')
    // useEffect(() => {
    //     firebase_auth.addAuthStateChangedListener((user) => {
    //         this.setState({ user });
    //       });
    //   });
    

    return (
        <View style={styles.container}>

            <OTPInputView
                style={{ width: '80%', height: 200 }}
                pinCount={6}
                code={otp_input} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={set_otp_input}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`)

                    // const credential = firebase.auth.PhoneAuthProvider.credential(
                    //     verificationId,
                    //     otp_input,
                    // )
                    // let fbWorkerApp = firebase.apps.find(app => app.name === 'auth-worker') || firebase.initializeApp(firebase.app().options, 'auth-worker')
                    // let fbWorkerAuth = firebase_auth()

                    // fbWorkerAuth.signInWithCredential(credential)
                    //     .then((userCred) => {
                    //         // console.log("verification OK")
                    //         navigation.navigate('FillInfo')
                    //     })
                    //     .catch((err) => {
                    //         setStatus("Wrong OTP!")
                    //         // console.log(err.code)
                    //     })
                }}
            />
            <Text>{status}</Text>


        </View>
    )
}



