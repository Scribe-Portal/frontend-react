import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { setNull } from '../reducers/priorityReducer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        justifyContent: 'center',


    },
    text1: {
        top: 0,
        color: "#616161",
        alignSelf: "flex-start",
        
        fontSize: 30,
        fontWeight: '700',
    },
    requestBox: {
        flexDirection: "row",
        justifyContent: 'space-between',
        borderRadius: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: "#616161",
        padding: 10,
        backgroundColor: "#BFE9E7",
    },
    requestRoot:{
    },
    examName: {
        fontSize: 20,
        fontWeight: '500',
    },
});
function Request({req_id}) {
    const request = useSelector(({firestore: { data }})=> data.requests && data.requests[req_id])
    const navigation = useNavigation()
    

    return (
        <View style={styles.requestRoot}>

            <TouchableOpacity style={styles.requestBox} onPress={() => navigation.navigate("RequestPage", {req_id: req_id, })}>
                <Text style={styles.examName}>{request.examName}</Text>
                {/* <Text style={styles.examDate}>{request.examDate.toLocaleStrrin}</Text> */}
            </TouchableOpacity>
        </View>

    )
}
function Requests({uid}){
    // useFirestoreConnect([
    //     {
    //         collection: 'requests',
    //         where: [['uid', '==', uid], ['status', '==', 'found']],

    //     }
    // ])
    const requests = useSelector(state => state.firestore.ordered.requests.filter(req => (req.status==='found')))
    if (!isLoaded(requests)){
        return (
            <Text style={styles.text1}>
                Loading...
            </Text>
        )

    }
    if (isEmpty(requests)){
        return (
            <Text>
                No Requests
            </Text>
        )
    }
    return requests.map(({id: id}, ind) => (
        <Request req_id={id}  key={`${ind}-${id}`}/>
    ))
}
function RequestsA() {
    const lang = useSelector(state => state.userAppSettings.lang)
    
    const {uid} = useSelector(state => state.firebase.auth)
    const dispatch = useDispatch()
    const firestore = useFirestore()
    let selectedData = useSelector(state => state.priority.P)
    // console.log(Object.keys(selectedData).find(volunteer => selectedData[volunteer]==true))
    return (
        <View style={styles.container}>
            

                <Text style={styles.text1}>
                Volunteers Found For,
                </Text>
                
            
            <Requests uid={uid}/>


        </View>
    )
}

export default RequestsA
