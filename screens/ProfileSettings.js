/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Platform, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../reducers/userAppSettingsReducer';
import { useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { ProfileSettingsText } from '../translations'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",


    },
    inner_container: {

    },
    input: {
        marginVertical: 10,
        height: 40,
        borderRadius: 5,
        backgroundColor: "white"
    },
    centered: {
        flex: 1,
        margin: 20,

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
    spacing: {
        minHeight: 10,
    },
    ProfileSettingsButton: {
        backgroundColor: '#19939A',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',

    },
    langButton2: {
        backgroundColor: "#B4E2DF",
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

    datePicker: {

        backgroundColor: '#19939A',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    textInsideDatePicker: {
        color: "#FFFFFF",
        fontSize: 20,
    },

    itemStyle: {
        fontSize: 10,
        fontFamily: "Roboto-Regular",
        color: "#007aff"
    },
    pickerStyle: {
        width: "100%",
        height: 40,
        color: "#007aff",
        fontSize: 14,
        fontFamily: "Roboto-Regular"
    },

});
function RadioButton2({ i, text, selectedRadioButton, handleChange }) {
    return (
        <TouchableOpacity
            style={styles.radioRoot}
            onPress={handleChange}
        >
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                margin: 5,
                justifyContent: 'center',
            }}>
                {
                    (selectedRadioButton === i) ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
            <Text style={styles.radioText}>{text}</Text>
        </TouchableOpacity>

    );
}
function ProfileSettings({ navigation }) {

    const lang = useSelector(state => state.userAppSettings.lang)

    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>

                <View style={styles.centered}>

                    <Text style={styles.text1}>
                        Change Language
                    </Text>
                    <RadioButton2
                        text="English"
                        i="en"
                        selectedRadioButton={lang}
                        handleChange={() => { dispatch(changeLang({newLang: "en"})) }}
                    />
                    <RadioButton2
                        text="Hindi"
                        i="hi"
                        selectedRadioButton={lang}
                        
                        handleChange={() => { dispatch(changeLang({newLang: "hi"})) }}
                    />
                    
                </View>
            </ScrollView>


        </View>
    )
}


export default ProfileSettings
