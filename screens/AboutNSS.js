/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Button, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { FillInfoText } from '../translations'
import { PLACEHOLDERS } from '@babel/types';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeUid } from '../reducers/userAppSettingsReducer';
useSelector
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
    input: {
        marginVertical: 3,
        height: 40,
        borderRadius: 5,
        backgroundColor: "white"
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
    tsmall: {

    },
    radioRoot: {
        backgroundColor: "white",
        flexDirection: 'row',
        padding: 10,
        marginVertical: 7,
        borderRadius: 5,
    },
    radioText: {
        margin: 7,
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
    dateOfBirthPicker: {

        backgroundColor: '#19939A',
        borderRadius: 10,
        padding: 5,
        height: 40,
        alignItems: 'center',
        marginVertical: 10,
    },
    textInsideDoBPicker: {
        color: "#FFFFFF",
        fontSize: 20,
    }
});
function AboutNSS({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>



                <View style={styles.c1}>
                    <Image source={require('../assets/nss_logo.jpg')}></Image>
                    <Text style={styles.text1}>
                        About NSS
                    </Text>
                    <Text style={styles.text2}>
                        NSS IIT Delhi is the IIT Delhi chapter of the National Service Scheme, institutionalized under the Ministry of Youth Affairs & Sports Govt. of India. Our sole aim is to motivate students at IITD to indulge in nation building activities through various events and projects which are aimed towards the benefit of people in and around IIT Delhi. We share the belief that such activities are almost always means of great satisfaction and joy.
                    </Text>
                    
                    <Text style={styles.text2}>
                    NSS IITD has a volunteer base of around 2000 students belonging to various disciplines and degrees of IIT Delhi. We work on a diverse range of social issues including blood donation, teaching, environmental issues, etc. We also collaborate with several NGO's in and around IIT Delhi on working on these issues. 
                    </Text>

                </View>

            </ScrollView>


        </View>
    )

}

export default AboutNSS
