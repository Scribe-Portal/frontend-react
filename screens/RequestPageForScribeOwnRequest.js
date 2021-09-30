/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { changeFirstP, changeSecondP, changeThirdP } from '../reducers/priorityReducer';
import { changeLang } from '../reducers/userAppSettingsReducer';
// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
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
    priorityButton: {
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

})
function RequestPageForScribePendingRequest({ navigation, route: { params: { req_id, uid } } }) {

    const firestore = useFirestore()
    const request = useSelector(state => state.firestore.data.myRequests && state.firestore.data.myRequests[req_id])

    const dispatch = useDispatch()
    if (request) {
        return (
            <View style={styles.container}>
                <View style={styles.upperHalf}>
                    <Text style={styles.text1}>
                        {request.examName} on {request.examDate}
                    </Text>
                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            firestore.update(`requests/${req_id}`, { status: 'pending', volunteer: '' })
                            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                        }}

                    >
                        <Text style={styles.t1}>

                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.t1}>
                            Go Back
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    else {
        return (<View style={styles.container}>
            <Text>whoops!</Text>
        </View>)
    }
}

export default RequestPageForScribePendingRequest
