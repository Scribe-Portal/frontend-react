/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SelectYourRole, Volunteer, RequestScribe } from '../translations' 
import firebase from 'firebase'
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
        flex: 1,
        margin: 20,
        justifyContent: 'space-around'
    },
    text1: {
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    langButton1: {
        backgroundColor:'#616161',
        borderColor: "#616161",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
    },
    langButton2: {
        backgroundColor:"#D4D4D4",
        borderColor: "#616161",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
        
    },
    
    input: {
        flex: 1,
        margin: 10,
        height: 40,
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
export class EnterOTP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otp_input:''
        }
    }
    render() {
        const { navigation } = this.props;
        const { lang, verificationId } = this.props.route.params;
        return (
            <View style= {styles.container}>
                <View style={styles.upperHalf}>
                    <Text style= {styles.text1}>
                        Enter OTP
                    </Text>
                    <TextInput onChangeText={(t) => {this.setState({otp_input: t})}} style={styles.input}/>
                
                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.langButton1}
                        onPress={() => {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                verificationId,
                                this.state.otp_input,
                            )
                            let fbWorkerApp = firebase.apps.find(app => app.name === 'auth-worker') || firebase.initializeApp(firebase.app().options, 'auth-worker')
                            fbWorkerAuth = fbWorkerApp.auth()
                            fbWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE)
                            fbWorkerAuth.signInWithCredential(credential)
                            .then((userCred) => {
                                this.setState({
                                    status: "Successful"
                                })
                            })
                            .catch((err) => {
                                this.setState({
                                    state: err.code
                                })
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
}

export default EnterOTP
