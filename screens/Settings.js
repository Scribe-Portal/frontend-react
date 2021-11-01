/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeUid } from '../reducers/userAppSettingsReducer';

useSelector
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
        justifyContent: 'space-around',

        alignItems: 'center',
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
    text1: {
        color: "#828282",
        fontSize: 30,

        fontWeight: '700',
    },
    tsmall: {

    },
    button1: {
        margin: 5,
        backgroundColor: '#616161',
        borderColor: "#616161",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
    },
    button2: {
        margin: 4,
        backgroundColor: "#D4D4D4",
        borderColor: "#616161",
        borderRadius: 10,
        padding: 5,
        color: "#616161",
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

    },
    radioRoot: {
        backgroundColor: "white",
        flexDirection: 'row',
        padding: 20,
        margin: 5,
    },

});
function Settings({route, navigation}) {
    const lang = useSelector(state => state.userAppSettings.lang)
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={styles.centered}>

                <TouchableOpacity style={styles.button1}
                    onPress={() => {
                        

                    }}
                >
                    <Text style={styles.t1}>


                        Request History
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}
                    onPress={() => {
                    }}
                >
                    <Text style={styles.t1}>

                        Profile Settings
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button1}
                    onPress={() => {

                        dispatch(changeUid({newUid: "none"}))
                        navigation.reset({ index: 0, routes: [{ name: 'Splash' }] })

                    }}
                >
                    <Text style={styles.t1}>

                        Log Out
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}
                    onPress={() => {
                        navigation.navigate('SelectAvailability')
                    }}
                >
                    <Text style={styles.t1}>

                        Select Availability
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}


export default Settings
