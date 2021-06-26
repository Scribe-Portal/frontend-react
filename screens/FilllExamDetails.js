/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { FillExamDetailsText } from '../translations'

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
    tsmall: {

    },
    FillExamDetailsButton: {
        backgroundColor: '#616161',
        borderColor: "#616161",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
    },
    langButton2: {
        backgroundColor: "#D4D4D4",
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
function FillExamDetails({ navigation }) {
    const lang = useSelector(state => state.userAppSettings.lang)
    let [name, setName] = useState('')
    let [date, setDate] = useState('')
    let [time, setTime] = useState('')
    let [examLang, setExamLang] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.centered}>

                <Text style={styles.text1}>
                    Fill Your Information,
                </Text>
                <Text>Name of Examination</Text>
                <TextInput onChangeText={setName} style={styles.input} />
                <Text>Date of Examination</Text>
                <TextInput onChangeText={setDate} style={styles.input} />
                <Text>Time of Examination</Text>
                <TextInput onChangeText={setTime} style={styles.input} />
                <Text>Language of Examination</Text>
                <TextInput onChangeText={setExamLang} style={styles.input} />
                <TouchableOpacity style={styles.FillExamDetailsButton}
                    onPress={() => {

                        navigation.navigate('UploadExamDoc')
                    }}
                >
                    <Text style={styles.t1}>

                        Save and Next
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}


export default FillExamDetails
