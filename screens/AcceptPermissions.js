/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Button, BackHandler, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    inner_container: {
        flexGrow: 1,
        backgroundColor: "#B4E2DF",


    },
    c1: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    middle_spacing: {
        flexGrow: 1,
        // backgroundColor: "red",
    },
    c2: {
        marginHorizontal: 20,
        marginVertical: 10,

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
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        color: "#19939A",
        fontSize: 20,
        fontWeight: '400',
    },
    text3: {
        color: "blue",
        fontSize: 20,
        fontWeight: '400',
    },
    tsmall: {

    },
    FillInfoButton: {
        backgroundColor: '#19939A',
        marginVertical: 5,

        borderRadius: 10,
        padding: 5,
        alignItems: 'center',

    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
});
function AcceptPermissions({ navigation }) {
    const lang = useSelector(state => state.userAppSettings.lang)
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>



                <View style={styles.c1}>
                    <Text style={styles.text1}>
                        Terms and Conditions

                    </Text>
                    <Text style={styles.text2}>
                        By clicking the I accept the privacy policy given here.
                    </Text>
                    <Text style={styles.text3}
                        onPress={() => Linking.openURL('https://scribe-portal.github.io')}>
                        Privacy Policy
                    </Text>
                </View>
                <View style={styles.middle_spacing}></View>
                <View style={styles.c2}>

                    <TouchableOpacity style={styles.FillInfoButton}
                        onPress={() => {
                            navigation.reset({index: 0, routes: [{name: 'SelectRole'} ]})
                        }}
                    >
                        <Text style={styles.t1}>

                            I accept
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.FillInfoButton}
                        onPress={() => {
                            BackHandler.exitApp()
                        }}
                    >
                        <Text style={styles.t1}>

                            I reject, close the app
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


        </View>
    )

}

export default AcceptPermissions
