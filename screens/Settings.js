/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeScribeStatus, changeTempUid, changeUid } from '../reducers/userAppSettingsReducer';

var NSSFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdoK6B8czhAmA3MTE4Q5V92w-V2N5suKy9MH5hLxugoeTOMZw/viewform?usp=sf_link"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",



    },
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },
    centered: {
        flex: 1,
        marginTop: 10,

    },
    text1: {
        color: "#FFFFFF",
        fontSize: 30,

        fontWeight: '700',
    },
    tsmall: {

    },
    button1: {
        margin: 5,
        backgroundColor: '#19939A',
        borderRadius: 10,
        padding: 7,
        alignItems: 'center',

    },
    button2: {
        margin: 4,
        backgroundColor: "#B4E2DF",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        color: "#19939A",
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
        padding: 20,
        margin: 5,
    },

});
function Settings({ route, navigation }) {
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    const dispatch = useDispatch()
    const showLogoutDialog = () => {
        return Alert.alert(
            "Confirmation",
            "Are you sure you want to Log out?",
            [
                {
                    text: "No",
                    onPress: () => {
                        
                    }
                },
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(changeUid({ newUid: "none" }))
                        dispatch(changeTempUid({newUid: "none"}))
                        dispatch(changeScribeStatus({ newScribeStatus: false }))
                        navigation.reset({ index: 0, routes: [{ name: 'Splash' }] })
                        
                    }

                },
            ]

        )
    }
    const showFail = () => {
        return Alert.alert(
            "Can't Open the Form",
            "Please try again later",
            

        )
    }
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
                        navigation.navigate('ProfileSettings', {fromSettings: true})
                    }}
                >
                    <Text style={styles.t1}>

                        Profile Settings
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button1}
                    onPress={() => {
                        navigation.navigate('UploadDoc', {fromHome: true})
                    }}

                >
                    <Text style={styles.t1}>

                        Upload Documents
                    </Text>
                </TouchableOpacity>
                {isItAScribe ?
                    <TouchableOpacity style={styles.button1}
                        onPress={() => {
                            Linking.canOpenURL(NSSFormURL).then(supported => {
                                if (supported) {
                                    Linking.openURL(NSSFormURL);
                                } else {
                                    showFail()
                                }
                            });
                        }}

                    >
                        <Text style={styles.t1}>

                            Fill NSS Form
                        </Text>
                    </TouchableOpacity>

                : null}
                <TouchableOpacity style={styles.button1}
                    onPress={showLogoutDialog}
                >
                    <Text style={styles.t1}>

                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}


export default Settings
