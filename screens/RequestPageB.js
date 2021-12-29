/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native'
import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { changeFirstP, changeSecondP, changeThirdP } from '../reducers/priorityReducer'
import { changeLang } from '../reducers/userAppSettingsReducer'
// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
    },
    inner_container: {
        flexGrow: 1,
    },
    upperHalf: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    lowerHalf: {
        flex: 1,
        margin: 10,
        justifyContent: 'space-around'
    },
    text1: {
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    text3: {
        color: "#19939A",
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
    },
    text2: {
        color: "#19939A",
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
        marginVertical: 3,

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
    scribeBox: {

        justifyContent: 'space-between',
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: "#19939A",
        padding: 10,
        backgroundColor: "#FDF1DB",
    },
    scribeName: {},

})
function ScribeName({ scribe_id, ind }) {
    const scribe = useSelector(state => state.firestore.data.scribes && state.firestore.data.scribes[scribe_id])
    const navigation = useNavigation()
    return (

        <TouchableOpacity style={styles.scribeBox} onPress={() => navigation.navigate("ScribePage", { scribe_id: scribe_id, selected: true, modifiable: false })}>

            <Text style={styles.scribeName}>{scribe?.name || "can't load name"}</Text>

        </TouchableOpacity>
    )
}
function RequestPageB({ navigation, route: { params: { req_id } } }) {

    const request = useSelector(state => state.firestore.data.requests && state.firestore.data.requests[req_id])
    useFirestoreConnect(() => [
        { collection: 'scribes',  }
    ])
    const dispatch = useDispatch()
    console.log(req_id)
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>

                <View style={styles.upperHalf}>
                    <Text style={styles.text1}>

                        {
                            (request?.status == 'found')
                                ? "Volunteer found for,"
                                : ((request?.status == 'pending')
                                    ? "Volunteer search pending"
                                    : "Volunteer not found")
                        }

                    </Text>
                    <Text style={styles.text3}>

                        Exam Details
                    </Text>
                    <Text style={styles.text2}>

                        Exam Name: {request?.examName}
                    </Text>
                    <Text style={styles.text2}>

                        Exam Date: {new Date(request?.examDate?.seconds * 1000).toDateString()}
                    </Text>
                    <Text style={styles.text2}>
                        Exam Language
                    </Text>
                    {request?.Hindi ?
                        <Text style={styles.text2}>
                            Hindi
                        </Text>
                        : null
                    }
                    {request?.examLang ?
                        <Text style={styles.text2}>
                            {request.examLang}
                        </Text>
                        : null
                    }
                    {request?.English ?
                        <Text style={styles.text2}>
                            English
                        </Text>
                        : null
                    }
                    {request?.CBT ?
                        <Text style={styles.text2}>
                            CBT
                        </Text>
                        : null
                    }
                    <Text style={styles.text2}>

                        Exam Time: {new Date(request?.examDate.seconds * 1000).toLocaleTimeString()}
                    </Text>
                    <Text style={styles.text2}>

                        Scribes selected:
                    </Text>
                    {request?.volunteersSelected && request.volunteersSelected.map((item, ind) => (<ScribeName scribe_id={item} key={ind}></ScribeName>))}

                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.navigate('ShowMatches', { requestId: req_id, dateSlot: request?.dateSlot, selectedVolus: request?.volunteersSelected })
                        }}
                    >
                        <Text style={styles.t1}>
                            Reselect Scribes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.navigate('UploadExamDoc', { onto: "RequestPageB", from: "RequestPageB", requestId: req_id })
                        }}
                    >
                        <Text style={styles.t1}>
                            Upload Exam Documents
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
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.t1}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

export default RequestPageB
