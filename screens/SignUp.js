/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import firebase from 'firebase'
import { EnterYourEmail } from '../translations'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
        justifyContent: 'center',
        
        
    },
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },
    centered: {
        flex: 1,
        margin: 20,

    },
    
    SignUpButton: {
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
export class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            pass: '',
            cpass: ''
        }
    }
    render() {
        const { navigation } = this.props
        const { lang, isItAScribe } = this.props.route.params
        const firebase = useFirebase()
        
        return (
            <View style= {styles.container}>
                <View style={styles.centered}>

                    <Text style= {styles.t2}>
                        Sign Up,
                    </Text>
                    <TextInput onChangeText={(t) => {this.setState({email: t})}} placeholder={EnterYourEmail[lang]} style={styles.input}/>
                    <TextInput onChangeText={(t) => {this.setState({pass: t})}} placeholder="password" style={styles.input}/>
                    <TextInput onChangeText={(t) => {this.setState({cpass: t})}} placeholder="confirm password" style={styles.input}/>
                    <TouchableOpacity style={styles.SignUpButton} 
                        onPress= { () => {
                            if (this.state.cpass !== this.state.pass) {
                                ToastAndroid.showWithGravity(
                                    "confirm pass and pass dont match!",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER,
                                )
                                return;
                            }
                            console.log("yeah, that's a good signup")
                            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
                            .then((userCredential) => {                                
                                firebase.firestore()
                                .collection('users')
                                .doc(userCredential.user.id)
                                .set({
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                    isItAScribe: isItAScribe,
                                })
                                navigation.navigate('FillInfo')
                            })
                            .catch(
                                (err) => {
                                    ToastAndroid.showWithGravity(err, ToastAndroid.SHORT, ToastAndroid.CENTER) 
                                    console.log(err)
                                }
                            )
                            
                        }}
                    >
                        <Text style={styles.t1}>

                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                

            </View>
        )
    }
}

export default SignUp
