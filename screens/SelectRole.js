/* eslint-disable prettier/prettier */
import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeScribeStatus } from '../reducers/userAppSettingsReducer';
import { SelectYourRole, Volunteer, RequestScribe } from '../translations'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
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
        color: "#616161",
        fontSize: 30,
        fontWeight: '700',
    },
    langButton1: {
        backgroundColor: '#616161',
        top: "20.75%",
        borderColor: "#616161",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        borderWidth: 3,
    },
    langButton2: {
        backgroundColor: "#E5E5E5",
        top: "2.75%",
        borderColor: "#616161",
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
        color: "#616161",
        fontSize: 30,

    }

});
function SelectRole({ navigation }) {
    const dispatch = useDispatch()
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    useEffect(() => {
        if (isItAScribe!=="none") {
            navigation.navigate('EnterMobile')
        }
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
                        dispatch(changeScribeStatus({newScribeStatus: false}))
                        navigation.navigate('EnterMobile')
                    }}
                >
                    <Text style={styles.t1}>

                        {RequestScribe[lang]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langButton2}>
                    <Text style={styles.t2}
                        onPress={() => {
                            dispatch(changeScribeStatus({newScribeStatus: true}))
                            navigation.navigate('EnterMobile')
                        }}
                    >

                        {Volunteer[lang]}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}

export default SelectRole