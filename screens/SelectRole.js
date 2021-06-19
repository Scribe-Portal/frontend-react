/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SelectYourRole, Volunteer, RequestScribe } from '../translations' 
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
export class SelectLanguage extends Component {
    render() {
        const { navigation } = this.props;
        const { lang } = this.props.route.params;
        return (
            <View style= {styles.container}>
                <View style={styles.upperHalf}>
                    <Text style= {styles.text1}>
                        {SelectYourRole[lang]}
                    </Text>
                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.langButton1}
                        onPress={() => {
                            navigation.navigate('LoginOrSignUp', {
                                isItAScribe: false
                            })
                        }}
                    >
                        <Text style={styles.t1}>

                            {RequestScribe[lang]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.langButton2}>
                        <Text style={styles.t2}
                            onPress={() => {

                                navigation.navigate('LoginOrSignUp', {
                                    isItAScribe: true,
                                })
                            }}
                        >

                            {Volunteer[lang]}
                            navigation.navigate('LoginOrSignUp')
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default SelectLanguage
