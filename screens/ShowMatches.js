/* eslint-disable prettier/prettier */
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
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },
    centered: {
        flex: 1,
        margin: 20,

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
        top: 20,
        color: "#616161",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        top: 40,
        width: 321,
        height: 48,
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    tsmall: {

    },
    ShowMatchesButton: {
        top:80,
        backgroundColor: '#616161',
        borderColor: "#616161",
        borderRadius: 10,
        padding: 10,
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
    scribeBox: {

        top: 60,
        margin: 5,
        padding: 13,
        borderWidth: 2,
        borderColor: "#616161",
        backgroundColor: "#D4D4D4",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    selectedScribeBox: {
        top:60,
        margin: 5,
        padding: 13,
        borderWidth: 2,
        borderColor: "#616161",
        backgroundColor: "#52F6F7",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    
    t2: {
        color: "#616161",
        fontSize: 30,

    },
    match_name: {
        
    },
    match_rating:{

    }

});

const matchQuery = {
    collection: "scribes",
    queryParams: ["LimitToLast=5"]
}
function Match({id, selected}) {
    const scribe = useSelector(state => state.firestore.data.scribes[id])
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={selected?styles.selectedScribeBox:styles.scribeBox} onPress={() => navigation.navigate("ScribePage", {scribe_id: id, selected: selected})}>
            <Text style={styles.match_name}>{scribe.name}</Text>
            <Text style={styles.match_rating}>{scribe.rating}</Text>
        </TouchableOpacity>
    )
}
function Matches({uid}) {
    useFirestoreConnect(()=> [matchQuery])
    const matches = useSelector(state => state.firestore.data.scribes)
    let selectedData = useSelector(state => state.priority.P)
    if (!isLoaded(matches)){    
        return (
            <Text style={styles.text1}>
                Loading...
            </Text>
        )
    }
    if (isEmpty(matches)) {
        return (
            <Text>
                Sorry {uid},
                We couldn't connect you with anyone
            </Text>
        )
    }
    return Object.keys(matches).map((id, ind) => (
        <Match id={id} selected = {(selectedData[id]===true)} key={`${ind}-${id}`}/>
    ))
}
function ShowMatches({ navigation, route: {params: {requestId}} }) {
    const lang = useSelector(state => state.userAppSettings.lang)
    
    const {uid} = useSelector(state => state.firebase.auth)
    const dispatch = useDispatch()
    const firestore = useFirestore()
    let selectedData = useSelector(state => state.priority.P)
    console.log(Object.keys(selectedData).find(volunteer => selectedData[volunteer]==true))
    return (
        <View style={styles.container}>
            <View style={styles.centered}>

                <Text style={styles.text1}>
                Choose upto three volunteers from the list,
                </Text>
                <Text style={styles.text2}>
                Showing 5 volunteers according to your requirement
                </Text>
                <Matches uid={uid}/>
                <TouchableOpacity style={styles.ShowMatchesButton}
                    onPress={() => {
                        console.log("done pressed", requestId)
                        firestore
                        .collection('requests')
                        .doc(requestId)
                        .update({
                            volunteersSelected: Object.keys(selectedData).filter(volunteer => selectedData[volunteer]==true)
                        })
                        
                        navigation.navigate('Home')
                    }}
                >
                    <Text style={styles.t1}>

                        Next
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}


export default ShowMatches
