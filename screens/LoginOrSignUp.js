/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
        return (
            <View style= {styles.container}>
                <View style={styles.upperHalf}>
                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.langButton1}
                        onPress={() =>
                            navigation.navigate('Login')
                        }
                    >
                        <Text style={styles.t1}>

                            Existing User, Log In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.langButton2}
                        onPress= {() =>
                            navigation.navigate('SignUp', {
                                isItAScribe: this.props.route.params.isItAScribe
                            })
                        }
                    >
                        <Text style={styles.t2}>

                            New User, Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default SelectLanguage
