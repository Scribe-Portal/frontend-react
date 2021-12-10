import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { setNull } from '../reducers/priorityReducer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
        justifyContent: 'center',


    },
    text1: {
        top: 0,
        color: "#19939A",
        alignSelf: "flex-start",
        margin: 5,
        fontSize: 30,
        fontWeight: '700',
    },
    requestBox: {
        flexDirection: "row",
        justifyContent: 'space-between',
        borderRadius: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: "#19939A",
        padding: 10,
        backgroundColor: "#BFE9E7",
    },
    requestRoot: {
    },
    examName: {
        fontSize: 20,
        fontWeight: '500',
    },
});
function Request({ req_id }) {
    const request = useSelector(({ firestore: { data } }) => data.requests && data.requests[req_id])
    const navigation = useNavigation()


    return (
        <View style={styles.requestRoot}>

            <TouchableOpacity style={styles.requestBox} onPress={() => navigation.navigate("RequestPageA", { req_id: req_id, })}>
                <Text style={styles.examName}>{request.examName}</Text>
                {/* <Text style={styles.examDate}>{request.examDate.toLocaleStrrin}</Text> */}
            </TouchableOpacity>
        </View>

    )
}
function Requests({ uid }) {
    const requests = useSelector(state => state.firestore.ordered.requests.filter(req => (req.status === 'accepted')))
    if (!isLoaded(requests)) {
        return (
            <Text style={styles.text1}>
                Loading...
            </Text>
        )

    }
    if (isEmpty(requests)) {
        return (
            <Text>
                No Requests
            </Text>
        )
    }
    return requests.map(({ id: id }, ind) => (
        <Request req_id={id} key={`${ind}-${id}`} />
    ))
}
function RequestsA() {
    const lang = useSelector(state => state.userAppSettings.lang)

    const uid = useSelector(state => state.userAppSettings.uid)

    return (
        <View style={styles.container}>


            <Text style={styles.text1}>
                Volunteer Search Successful
            </Text>


            <Requests uid={uid} />


        </View>
    )
}

export default RequestsA
