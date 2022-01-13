/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'

import { StyleSheet, Text, View, Linking, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Back, ReasonForCancellation, Cancel } from '../translations'
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
    text1: {
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    text2: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: '500',
    },
    priorityButton: {
        marginVertical: 5,
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        
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
        
        height: 100,
        backgroundColor: "white",
        textAlignVertical: "top",
    },

});
function CancelRequest({ navigation, route: { params: { requestId} } }) {

    const request = useSelector(state => state.firestore.data.requests && state.firestore.data.requests[requestId])
    const lang = useSelector(state => state.userAppSettings.lang)

    const firestore = useFirestore()
    let [cancelReason, setCancelReason]  = useState('')
    const showCancelDialog = () => {
        if (cancelReason === '') {

            return Alert.alert(
                "No Reason Given",
                "Please give a reason for cancellation",
                [
                    {
                        text: "OK",
                    },
                ]
    
            )
        }
        else {

            return Alert.alert(
                "Confirmation",
                "Are you sure you want to cancel the request?",
                [
                    {
                        text: "Back",
                        onPress: () => {
                            navigation.goBack()
                        }
                    },
                    {
                        text: "Yes, I want to cancel",
                        onPress: () => {
                            firestore.update({collection:'requests', doc: requestId}, {status: 'cancelled', cancelReason: cancelReason})
                            if (request?.volunteerAccepted !== "none") {
                                try {
    
                                    firestore.collection('dateslots')
                                            .doc(dateSlot)
                                            .collection('acceptedVolunteers')
                                            .doc(request.dateSlot)
                                            .delete()
                                }
                                catch{
                                    firestore.update({collection:'requests', doc: requestId}, {status: 'pending', })
                                    console.log("something wrong 4")
                                }
                            }
                            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                        }
    
                    },
                ]
    
            )
        }
    }
    return (
        
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>



                <View style={styles.c1}>

                    <Text style={styles.text1}>

                        {ReasonForCancellation[lang]}
                    </Text>
                    <TextInput multiline={true} numberOfLines={10} onChangeText={setCancelReason} style={styles.input}/>
                </View>
                <View style={styles.middle_spacing}></View>
                <View style={styles.c2}>

                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.t1}>
                            {Back[lang]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={showCancelDialog}
                    >
                        <Text style={styles.t1}>
                            {Cancel[lang]}
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


        </View>
        
    )
}

export default CancelRequest
