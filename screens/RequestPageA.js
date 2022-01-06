/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, Linking, TouchableOpacity, ScrollView } from 'react-native';
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
    inner_container: {
        flexGrow: 1,
    },
    upperHalf: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    lowerHalf: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-around'
    },
    text3: {
        color: "#19939A",
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
    },
    text1: {
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    text2: {
        
        color: "#19939A",
        textAlign: "left",
        fontSize: 20,
        fontWeight: '500',
    },
    priorityButton: {
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',

    },
    langButton2: {
        backgroundColor: "#B4E2DF",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',


    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    scribeBox: {


        marginVertical: 20,
        padding: 13,
        borderWidth: 2,
        borderColor: "#19939A",
        backgroundColor: "#B4E2DF",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    t2: {
        color: "#19939A",
        fontSize: 30,

    }

});
function PhoneButtton({ scribe_id }) {
    useFirestoreConnect(() => [
        { collection: 'scribes', doc: scribe_id }
    ])
    const scribe = useSelector(state => state.firestore.data.scribes && state.firestore.data.scribes[scribe_id])
    const showMobileNotFound = () => {
        return Alert.alert("Not found", "The phone number couldn't be found!")
    }
    return (
        <TouchableOpacity style={styles.priorityButton}
            onPress={() => {
                if (scribe?.mobile) {

                    let phoneNumber = ''
                    if (Platform.OS === 'android') {
                        phoneNumber = `tel:${scribe?.mobile}`;
                    }
                    else {
                        phoneNumber = `telprompt:${scribe?.mobile}`;
                    }
                    Linking.openURL(phoneNumber);
                }
                else {
                    showMobileNotFound()
                }
            }}
        >
            <Text style={styles.t1}>
                Call Volunteer
            </Text>
        </TouchableOpacity>
    )
}
function RequestPageA({ navigation, route: { params: { req_id } } }) {

    const request = useSelector(state => state.firestore.data.requests && state.firestore.data.requests[req_id])


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>

                <View style={styles.upperHalf}>
                    <Text style={styles.text1}>

                        {
                            (request.status == 'accepted')
                                ? "Volunteer Search Successful"
                                : ((request.status == 'pending')
                                    ? "Volunteer search pending for"
                                    : "Volunteer not found")
                        }

                    </Text>
                    <Text style={styles.text3}>

                        Exam Details
                    </Text>
                    <Text style={styles.text2}>

                        Exam Name: {request?.examName || "Unknown"}
                    </Text>
                    <Text style={styles.text2}>

                        Exam Date: {new Date(request.examDate.seconds * 1000).toDateString()}
                    </Text>
                    <Text style={styles.text2}>Exam Languages:</Text>
                    {request.examLang ?
                        <Text style={styles.text2}>
                            {request.examLang}
                        </Text> : null
                    }
                    {request.Hindi ?
                        <Text style={styles.text2}>
                            Hindi
                        </Text> : null
                    }
                    {request.English ?
                        <Text style={styles.text2}>
                            English
                        </Text> : null
                    }
                    {request.CBT ?
                        <Text style={styles.text2}>
                            CBT
                        </Text> : null
                    }
                    <Text style={styles.text2}>

                        Exam Time: {new Date(request.examDate.seconds * 1000).toLocaleTimeString()}
                    </Text>







                </View>
                <View style={styles.lowerHalf}>
                    {request?.volunteerAccepted ? <PhoneButtton scribe_id={request.volunteerAccepted}/>: null}
                    <TouchableOpacity style={styles.priorityButton} onPress={() => navigation.navigate("ScribePage", { scribe_id: request?.volunteerAccepted, selected: true, modifiable: false })}>
                        <Text style={styles.t1}>View Scribe Details</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.navigate('UploadExamDoc', { onto: "RequestPageA", from: "RequestPageA", requestId: req_id })
                        }}
                    >
                        <Text style={styles.t1}>
                            Upload Exam Documents
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
            </ScrollView>




        </View>
    )
}

export default RequestPageA
