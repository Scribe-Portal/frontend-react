/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SignUpText } from '../translations'
import FillInfo from './FillInfo'
import { EnterYourEmail } from '../translations'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
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
        backgroundColor:'#616161',
        borderColor: "#616161",
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
        color: "#616161",
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
        const { navigation } = this.props;
        const { lang } = this.props.route.params;
        return (
            <View style= {styles.container}>
                <View style={styles.centered}>

                    <Text style= {styles.t2}>
                        Sign Up,
                    </Text>
                    <TextInput onChangeText={(t) => {this.setState({email: t})}} placeholder={EnterYourEmail[lang]} style={styles.input}/>
                    <TextInput onChangeText={(t) => {this.setState({pass: t})}} style={styles.input}/>
                    <TextInput onChangeText={(t) => {this.setState({cpass: t})}} style={styles.input}/>
                    <TouchableOpacity style={styles.SignUpButton} 
                        onPress= { () => {
                            
                            navigation.navigate('FillInfo')
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
