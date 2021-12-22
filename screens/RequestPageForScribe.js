/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Platform, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import messaging from '@react-native-firebase/messaging';
import { sendEmail } from './sendemail';

// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
        justifyContent: "space-evenly"
    },
    inner_container: {
        flexGrow: 1,
        backgroundColor: "#B4E2DF",
    },
    upperHalf: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    lowerHalf: {
        flex: 1,
        margin: 20,
        justifyContent: 'flex-end'
    },

    text1: {
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    text2: {
        color: "#19939A",
        fontSize: 20,
        fontWeight: '400',
    },

    _text1: {

        color: "#9E6E12",
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
    },

    _text2: {
        color: "#9E6E12",
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'left',
    },
    volunteerBox: {
        backgroundColor: "#FDF1DB",
        borderRadius: 10,
        padding: 7,
        marginVertical: 5,
    },
    priorityButton: {
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        marginVertical: 5,

    },
    priorityButton2: {
        backgroundColor: "#9E6E12",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        marginVertical: 5,

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
    t2: {
        color: "#19939A",
        fontSize: 30,

    }

})
function UserBox({ uid, showMobile }) {
    const user = useSelector(state => state.firestore.data.users && state.firestore.data.users[uid])
    return (
        <View style={styles.volunteerBox}>
            <Text style={styles._text1}>
                User Details

            </Text>
            <Text style={styles._text2}>
                {`Name: ${(typeof user?.name === 'string') ? user?.name : "Unnamed"} `}

            </Text>
            <Text style={styles._text2}>
                {`Gender: ${(typeof user?.gender === 'string') ? user?.gender : "Unknown"} `}

            </Text>
            <Text style={styles._text2}>
                {`Preferred Languages: ${(typeof user?.languages === 'string') ? user?.languages : ""} ${user?.English ? "English" : ""} ${user?.Hindi ? "Hindi" : ""} ${user?.Math ? "Maths" : ""}`}

            </Text>
            {showMobile ? (
                <TouchableOpacity style={styles.priorityButton2}
                    onPress={() => {
                        if (user?.mobile) {

                            let phoneNumber = ''
                            if (Platform.OS === 'android') {
                                phoneNumber = `tel:${user?.mobile}`;
                            }
                            else {
                                phoneNumber = `telprompt:${user?.mobile}`;
                            }
                            Linking.openURL(phoneNumber);
                        }
                    }}
                >
                    <Text style={styles.t1}>
                        Call
                    </Text>
                </TouchableOpacity>
            ) : null}

        </View>

)
}

function RequestPageForScribe({ navigation, route: { params: { req_id, uid } } }) {
    
    const firestore = useFirestore()
    const request = useSelector(state => state.firestore.data.requests && state.firestore.data.requests[req_id])
    {
        request &&
        useFirestoreConnect(() => [
            { collection: 'users', doc: request?.uid }
        ])
    }
    const user = useSelector(state => state.firestore.data.users && state.firestore.data.users[uid])
    const showAcceptDialog = () => {
        return Alert.alert(
            "Confirmation",
            "Accepting the request puts you in a position of responsibility to complete the task, failing which might incur NEGATIVE NSS hours.",
            [
                {
                    text: "Accept",
                    onPress: () => {
                        firestore.update(`requests/${req_id}`, { volunteerAccepted: uid, status: 'accepted' })
                        firestore.collection('dateslots')
                            .doc(request.dateSlot)
                            .collection('acceptedVolunteers')
                            .doc(uid)
                            .set({
                                req_id: req_id
                            })
                            // .then(async () => {

                                // await sendEmail(
                                //     (typeof user?.email === "string") ? user.email : "mrityunjaisingh3333@gmail.com",
                                //     'Scribe Request',
                                //     'You have been alloted a scribe request please check the app',
                                //     { cc: ' sprakhar2002@gmail.com;' }
                                // )
                            // })
                            .then(async () => {
                                // console.log('Your message was successfully sent!');
                                const registrationToken = user?.fcmToken;

                                const message = {
                                    notification: {
                                        title: 'Scribe request',
                                        body: 'Your request has been accepted'
                                    },
                                    token: registrationToken
                                }

                                // Send a message to the device corresponding to the provided
                                // registration token.
                                return await messaging().sendMessage(message)
                            })
                            .then((response) => {
                                // Response is a message ID string.
                                console.log('Successfully sent message:', response);
                            })
                            .catch((error) => {
                                console.log('Error sending message:', error);
                            })
                    }

                },
                {
                    text: "Back",
                    onPress: () => {
                    }
                }
            ]

        )
    }
    useFirestoreConnect([
        {
            collection: 'dateslots',
            doc: request.dateSlot,
            subcollections: [{ collection: 'acceptedVolunteers' }],
            storeAs: 'acceptedVolunteers'
        }
    ])
    const busy = useSelector(state => state.firestore.data.acceptedVolunteers && state.firestore.data.acceptedVolunteers[uid])

    if (request?.status === "pending" && !busy) {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.inner_container}>

                    <View style={styles.upperHalf}>

                        <Text style={styles.text1}>

                            Exam Details
                        </Text>
                        <Text style={styles.text2}>

                            Exam Name: {request?.examName}
                        </Text>
                        <Text style={styles.text2}>

                            Date of Exam: {new Date(request?.examDate.seconds * 1000).toDateString()}
                        </Text>
                        <Text style={styles.text2}>
                            Mode of Exam:
                        </Text>
                        {request?.examLang ?
                            <Text style={styles.text2}>
                                {request?.examLang}
                            </Text> : null
                        }
                        {request?.Hindi ?
                            <Text style={styles.text2}>
                                Hindi
                            </Text> : null
                        }
                        {request?.English ?
                            <Text style={styles.text2}>
                                English
                            </Text> : null
                        }
                        {request?.CBT ?
                            <Text style={styles.text2}>
                                CBT
                            </Text> : null
                        }
                        <Text style={styles.text2}>

                            Time of Exam: {new Date(request?.examDate.seconds * 1000).toLocaleTimeString()}
                        </Text>
                        <Text style={styles.text2}>

                            Exam Address: {request?.examAddress}
                        </Text>
                        <Text style={styles.text2}>

                            Exam Pin Code: {request?.examPinCode}
                        </Text>
                        {request?.uid ?
                            <UserBox uid={uid} showMobile={false}/>
                            : null
                        }

                    </View>
                    <View style={styles.lowerHalf}>
                        <TouchableOpacity style={styles.priorityButton}
                            onPress={showAcceptDialog}
                        >
                            <Text style={styles.t1}>Accept</Text>
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
    else if (request?.status === "accepted" && uid === request?.volunteerAccepted) {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.inner_container}>

                    <View style={styles.upperHalf}>

                        <Text style={styles.text1}> Exam Details </Text>
                        <Text style={styles.text2}>

                            Exam Name: {request?.examName}
                        </Text>
                        <Text style={styles.text2}>

                            Date of Exam: {new Date(request?.examDate.seconds * 1000).toDateString()}
                        </Text>
                        <Text style={styles.text2}>
                            Mode of Exam:
                        </Text>
                        {request?.examLang ?
                            <Text style={styles.text2}>
                                {request?.examLang}
                            </Text> : null
                        }
                        {request?.Hindi ?
                            <Text style={styles.text2}>
                                Hindi
                            </Text> : null
                        }
                        {request?.English ?
                            <Text style={styles.text2}>
                                English
                            </Text> : null
                        }
                        {request?.CBT ?
                            <Text style={styles.text2}>
                                CBT
                            </Text> : null
                        }
                        <Text style={styles.text2}>

                            Time of Exam: {new Date(request?.examDate.seconds * 1000).toLocaleTimeString()}
                        </Text>
                        <Text style={styles.text2}>

                            Exam Address: {request?.examAddress}
                        </Text>
                        <Text style={styles.text2}>

                            Exam Pin Code: {request?.examPinCode}
                        </Text>
                        {
                            request?.uid ?
                                <UserBox uid={uid} showMobile={true}/>
                                : null
                        }
                    </View>

                    <View style={styles.lowerHalf}>
                        <TouchableOpacity style={styles.priorityButton}
                            onPress={() => {
                                navigation.navigate("CancelRequestForScribe", { req_id: req_id, dateSlot: request.dateSlot })
                            }}
                        >
                            <Text style={styles.t1}>Reject</Text>
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
    else {
        return (<View style={styles.container}>
            <View style={styles.upperHalf}>

                <Text style={styles.text2}>You can't select more than one scribe for a day </Text>
            </View>
            <View style={styles.lowerHalf}>


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
        </View>)
    }
}

export default RequestPageForScribe
