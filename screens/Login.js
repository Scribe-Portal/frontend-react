/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { LoginText } from '../translations'
import firebase from 'firebase';
import { connect } from 'react-redux';
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
        justifyContent: 'center',
        
        
    },
    centered: {
        flex: 1,
        margin: 20,

    },
    text1: {
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    langButton1: {
        backgroundColor:'#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
    },
    langButton2: {
        backgroundColor:"#B4E2DF",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
        
    },
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },
    LoginButton: {
        backgroundColor:'#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
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
export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            pass: ''
        }
    }
    render() {
        const { navigation, lang } = this.props;
        
        return (
            <View style= {styles.container}>
                <View style={styles.centered}>

                    <Text style= {styles.text1}>
                        {LoginText[lang]}
                    </Text>
                    <TextInput onChangeText={(t) => {this.setState({email: t})}} style={styles.input}/>
                    <TextInput onChangeText={(t) => {this.setState({pass: t})}} style={styles.input}/>
                
                    <TouchableOpacity style={styles.LoginButton}
                        onPress = {() => {
                            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
                            .then((result) => {
                                // console.log(result)
                                ToastAndroid.showWithGravity("login successful", ToastAndroid.SHORT, ToastAndroid.CENTER) 
                            
                                navigation.navigate('Home', {uid: result.uid})
                            })
                            .catch ((error) => {
                                // console.log(error)
                                ToastAndroid.showWithGravity("something wrong!", ToastAndroid.SHORT, ToastAndroid.CENTER) 
                                
                            })
                        }}
                    >
                        <Text style={styles.t1}>

                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                

            </View>
        )
    }
}
const selectUserSettings = (state) => ({lang: state.userAppSetting.lang})
export default connect(selectUserSettings)(Login)
