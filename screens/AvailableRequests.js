import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { setNull } from '../reducers/priorityReducer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        justifyContent: "space-evenly",


    },
    inner_container: {
        flexGrow: 1,
        backgroundColor: "#B4E2DF",


    },
    text1: {
        top: 0,
        color: "#19939A",
        textAlign: 'center',
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
        backgroundColor: "#FDF1DB",
    },
    requestRoot: {
    },
    examName: {
        fontSize: 20,
        fontWeight: '500',
    },
});
function Request({ req_id, uid }) {

    const request = useSelector(({ firestore: { data } }) => data.empty_requests && data.empty_requests[req_id])
    const navigation = useNavigation()


    return (
        <View style={styles.requestRoot}>

            <TouchableOpacity style={styles.requestBox} onPress={() => navigation.navigate('RequestPageForScribe', { uid: uid, req_id: req_id, empty_requests: true })}>
                <Text style={styles.examName}>{request.examName}</Text>
            </TouchableOpacity>
        </View>

    )
}
function Requests({ uid }) {
    const requests = useSelector(state => state.firestore.ordered.empty_requests)
    const lang = useSelector(state => state.userAppSettings.lang)
    
    if (!isLoaded(requests)) {
        return (
            <Text style={styles.text1}>
                Loading...
            </Text>
        )
        
    }
    if (isEmpty(requests)) {
        return (
            <Text style={styles.text1}>
                No Requests
            </Text>
        )
    }
    return requests.map(({ id: id }, ind) => (
        <Request req_id={id} uid={uid} key={`${ind}-${id}`} />
        ))
}
function AvailableRequests() {
    const uid = useSelector(state => state.userAppSettings.uid)
    useFirestoreConnect([
        {
            collection: 'requests',
            where: [["volunteersSelected", "==", []], ["examDate", ">=", new Date()]],
            storeAs: "empty_requests",
        },
    ])
    const lang = useSelector(state => state.userAppSettings.lang)


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>

                <Text style={styles.text1}>
                    Available Requests
                </Text>


                <Requests uid={uid} />
            </ScrollView>



        </View>
    )
}

export default AvailableRequests
