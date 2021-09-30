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
        backgroundColor: "#D4D4D4",
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
        color: "#828282",
        backgroundColor: "white",
        fontSize: 30,
        fontWeight: '700',
    },
    tsmall: {

    },
    ShowMatchesButton: {
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
    scribeBox: {
        margin: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: "#616161",
        backgroundColor: "#D4D4D4",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    selectedScribeBox: {
        margin: 5,
        padding: 10,
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
function Match({id}) {
    const scribe = useSelector(state => state.firestore.data.scribes[id])
    const navigation = useNavigation()
    let [selected, setSelected] = useState(false)
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
        <Match id={id} key={`${ind}-${id}`}/>
    ))
}
function ShowMatches({ navigation, route: {params: {requestId}} }) {
    const lang = useSelector(state => state.userAppSettings.lang)
    const {firstP, secondP, thirdP} = useSelector(state => state.priority)
    const {uid} = useSelector(state => state.firebase.auth)
    const dispatch = useDispatch()
    const firestore = useFirestore()
    
    return (
        <View style={styles.container}>
            <View style={styles.centered}>

                <Text style={styles.text1}>
                    Your request has been successfully registered
                </Text>
                <Matches uid={uid}/>
                <TouchableOpacity style={styles.ShowMatchesButton}
                    onPress={() => {
                        console.log("done pressed", requestId)
                        firestore
                        .collection('requests')
                        .doc(requestId)
                        .update({
                            selection: selection
                        })
                        dispatch(setNull())
                        navigation.navigate('Home')
                    }}
                >
                    <Text style={styles.t1}>

                        Done
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}


export default ShowMatches
