/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { changeFirstP, changeSecondP, changeThirdP } from '../reducers/priorityReducer';
import { changeLang } from '../reducers/userAppSettingsReducer';
// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
    },
    upperHalf: {
        flex: 1,
        
        
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
    text2: {
        color: "#828282",
        fontSize: 20,
        fontWeight: '500',
    },
    priorityButton: {
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        borderWidth: 3,
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
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },

});
function CancelRequest({ navigation, route: { params: { requestId } } }) {

    
    const firestore = useFirestore()
    let [cancelReason, setCancelReason]  = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>

                    Reason for Cancellation
                </Text>
                <TextInput onChangeText={setCancelReason} style={styles.input}/>

                
            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.t1}>
                        Go Back, Ignore this page.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        firestore.update({collection:'requests', doc: requestId}, {status: 'cancelled', cancelReason: cancelReason})
                        navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                    }}
                >
                    <Text style={styles.t1}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default CancelRequest
