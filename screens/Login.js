/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { LoginText } from '../translations'
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
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    t2: {
        color: "#616161",
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
        const { navigation } = this.props;
        const { lang } = this.props.route.params;
        return (
            <View style= {styles.container}>
                <Text style= {styles.text1}>
                    {LoginText[lang]}
                </Text>
                <TextInput onChangeText={(t) => {this.setState({email: t})}}/>
                <TextInput onChangeText={(t) => {this.setState({pass: t})}}/>
                <TouchableOpacity style={styles.langButton1} 
                    onPress= { () => {
                        changeLang('en')
                        navigation.navigate('SelectRole', {lang: 'en'})
                    }}
                >
                    <Text style={styles.t1}>

                        English
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langButton2}
                    onPress = {() => {
                        changeLang('hi')
                        navigation.navigate('SelectRole', {lang: 'hi'})
                    }}
                >
                    <Text style={styles.t2}>

                        हिंदी
                    </Text>
                </TouchableOpacity>
                

            </View>
        )
    }
}

export default Login
