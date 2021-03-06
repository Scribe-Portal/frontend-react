/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
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
    text2: {
        color: "#828282",
        fontSize: 20,
        textAlign: 'left',
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

    }

});
function ScribeName({ scribe_id, ind }) {
    useFirestoreConnect(() => [
        { collection: 'scribes', doc: scribe_id }
    ])
    const scribe = useSelector(state => state.firestore.data.scribes && state.firestore.data.scribes[scribe_id])
    return (
        <Text style={styles.text2} key={ind}>{scribe?.name || "can't load name"}</Text>
    )
}
function RequestPageB({ navigation, route: { params: { req_id } } }) {

    const request = useSelector(state => state.firestore.data.requests && state.firestore.data.requests[req_id])

    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>

                    {
                        (request.status == 'found')
                            ? "Volunteer found for,"
                            : ((request.status == 'pending')
                                ? "Volunteer search pending"
                                : "Volunteer not found")
                    }

                </Text>
                <Text style={styles.text2}>

                    {request.examName}
                </Text>
                <Text style={styles.text2}>

                    {new Date(request.examDate.seconds * 1000).toDateString()}
                </Text>{request.Hindi &&
                    <Text style={styles.text2}>
                        Hindi
                    </Text>
                }
                {request.English &&
                    <Text style={styles.text2}>
                        English
                    </Text>
                }
                {request.CBT &&
                    <Text style={styles.text2}>
                        CBT
                    </Text>
                }
                <Text style={styles.text2}>

                    {new Date(request.examDate.seconds * 1000).toLocaleTimeString()}
                </Text>
                <Text style={styles.text2}>

                    Scribes selected:
                </Text>
                {request?.volunteersSelected && request.volunteersSelected.map((item, ind) => (<ScribeName scribe_id={item} ind={ind}></ScribeName>))}

            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.t1}>
                        Go Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        navigation.navigate('ShowMatches', { requestId: req_id, dateSlot: request.dateSlot, selectedVolus: request.volunteersSelected })
                    }}
                >
                    <Text style={styles.t1}>
                        Reselect Scribes
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        navigation.navigate('CancelRequest', { requestId: req_id, })
                    }}
                >
                    <Text style={styles.t1}>
                        Cancel Request
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default RequestPageB
