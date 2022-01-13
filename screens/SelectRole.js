/* eslint-disable prettier/prettier */
import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { createStoreHook } from 'react-redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeScribeStatus } from '../reducers/userAppSettingsReducer';
import { SelectYourRole, ApplytoVolunteer, RequestVolunteer } from '../translations'
import crashlytics from '@react-native-firebase/crashlytics'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
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
        position: "absolute",
        top: "20%",
        textAlign: "center",
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
    },
    langButton1: {
        backgroundColor: '#19939A',
        top: "20.75%",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        
    },
    langButton2: {
        backgroundColor: "#B4E2DF",
        top: "2.75%",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 10,
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
function SelectRole({ navigation }) {
    const dispatch = useDispatch()
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    useEffect(() => {
        (async () => {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                {
                    title: "Permission to see phone number",
                    message: "This app can auto fill your phone number if you permit it.",
                    buttonNeutral: "Not now",
                    buttonNegative: "Decline",
                    buttonPositive: "OK"
                }
            )
        })()
        return () => {}
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>
                    {SelectYourRole[lang]}
                </Text>
            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={styles.langButton1}
                    onPress={() => {
                        crashlytics().log('Needy selected in SelectRole')
                        dispatch(changeScribeStatus({ newScribeStatus: false }))
                        navigation.navigate('EnterMobile')
                    }}
                >
                    <Text style={styles.t1}>

                        {RequestVolunteer[lang]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langButton2}>
                    <Text style={styles.t2}
                        onPress={() => {
                            crashlytics().log('Volunteer Selected in SelectRole')
                            dispatch(changeScribeStatus({ newScribeStatus: true }))
                            navigation.navigate('EnterMobile')
                        }}
                    >

                        {ApplytoVolunteer[lang]}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}

export default SelectRole