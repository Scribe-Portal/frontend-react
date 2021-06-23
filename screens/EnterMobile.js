/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import firebase from '@react-native-firebase/auth'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
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
        margin: 10,
        
        alignSelf: 'stretch',
        justifyContent: 'space-around',
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
export class EnterMobile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile:'',
            errorText: ''
        }
    }
    render() {
        const { navigation } = this.props;
        const { lang } = this.props.route.params;
        return (
            <View style= {styles.container}>
                <View style={styles.upperHalf}>
                    <Text style= {styles.text1}>
                        Enter Mobile
                    </Text>
                    <TextInput placeholder="Enter Your Mobile No" onChangeText={(t) => {this.setState({mobile: t})}} style={styles.input}/>
                
                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.langButton1}
                        onPress={() => {
                            firebase().verifyPhoneNumber(this.state.mobile).on(
                                'state_changed',
                            (phoneAuthSnapshot) => {
                                
                                switch(phoneAuthSnapshot.state) {
                                    case firebase.PhoneAuthState.CODE_SENT:
                                        console.log('Verif code sent!', phoneAuthSnapshot)
                                        navigation.navigate('EnterOTP', {verificationId: phoneAuthSnapshot.verificationId})
                                        break
                                    case firebase.PhoneAuthState.ERROR:
                                        console.log('Verif error', phoneAuthSnapshot)
                                        this.setState({errorText: "Error sending the code!"})
                                        break
                                }
                            },
                            (error) => {
                                console.log(error)
                                this.setState({errorText: error.message})
                            })
                            
                        }}
                    >
                        <Text style={styles.t1}>

                            Send OTP
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default EnterMobile
