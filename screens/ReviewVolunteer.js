/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import firebase_firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { addP, removeP } from '../reducers/priorityReducer'
import { changeFirstP, changeSecondP, changeThirdP } from '../reducers/priorityReducer';
import { changeLang } from '../reducers/userAppSettingsReducer';

// hi
const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    inner_container: {
        flexGrow: 1,
        backgroundColor: "#B4E2DF",


    },
    upperHalf: {

        margin: 20
    },
    lowerHalf: {
        margin: 20,

    },
    text1: {

        color: "#19939A",
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
    },

    text2: {

        color: "#9E6E12",
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'left',
    },
    text3: {
        color: "#19939A",

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
        marginVertical: 5,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',

    },
    input: {
        marginVertical: 5,
        height: 100,
        backgroundColor: "white",
        textAlignVertical: "top",
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
function ReviewVolunteer({ navigation, route: { params: { scribe_id, req_id, } } }) {
    useFirestoreConnect(() => [
        { collection: `scribes/${scribe_id}/reviews`, storeAs: 'reviews' }
    ])
    const scribe = useSelector(state => state.firestore.data.scribes && state.firestore.data.scribes[scribe_id])
    const review = useSelector(state => state.firestore.data.reviews && state.firestore.data.reviews[req_id])
    const lang = useSelector(state => state.userAppSettings.lang)


    const firestore = useFirestore()
    let [revw, setReview] = useState('')
    let rating = useRef(3)

    const review_values = ["Terrible", "Not good", "OK", "Good", "Great"]
    const showAlert = (text) => {
        Alert.alert(
            "Info",
            text,
            [
                {
                    text: "OK",
                    onPress: () => { },
                }
            ]
        )
    }
    const askRatingConfirmation = () => {
        
        Alert.alert(
            "Rating",
            `Do you want to rate the volunteer ${review_values[rating.current - 1]}?`,
            [
                {
                    text: "Yes",
                    onPress: async () => {
                        try {

                            parent_doc = await firebase_firestore().collection('scribes')
                                .doc(scribe_id)
                                .get()
                            if (parent_doc.exists) {
                                parent_doc_data = parent_doc.data()
                            }
                            else {
                                return
                            }
                        }
                        catch (err) {
                            console.log("fail 1", err)
                            return
                        }
                        try {

                            doc = await firebase_firestore().collection('scribes')
                                .doc(scribe_id)
                                .collection('reviews')
                                .doc(req_id)
                                .get()
                        }
                        catch (err) {
                            console.log("fail 2", err)
                            return
                        }
                        try {

                            if (doc.exists && doc.data().rating) {
                                console.log("I already exist")
                                var delta = rating.current - doc.data().rating;

                                doc.ref.update({rating: rating.current})
                                parent_doc.ref.update({rating: delta / parent_doc_data.numRatings + parent_doc_data.rating})
                            }
                            else {
                                console.log("just rated ", rating.current)
                                doc.ref.set({rating: rating.current})
                                parent_doc.ref.update({rating: (parent_doc_data.numRatings * (parent_doc_data.rating || 0) + rating.current ) / (parent_doc_data.numRatings + 1), numRatings: parent_doc_data.numRatings + 1})
    
                            }
                        }     
                        catch (err) {
                            console.log("fail 3", err)
                            return
                        }
                            
                        Alert.alert("Succesfully rated!")
                            

                    }
                },
                {
                    text: "No",
                    onPress: () => {

                    }
                }

            ]

        )
    }
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>

                <View style={styles.upperHalf}>
                    <Text style={styles.text1}>
                        Volunteer Details

                    </Text>
                    <View style={styles.volunteerBox}>
                        <Text style={styles.text2}>
                            {`Name: ${(typeof scribe?.name === 'string') ? scribe?.name : "Unnamed"} `}

                        </Text>
                        <Text style={styles.text2}>
                            {`Gender: ${(typeof scribe?.gender === 'string') ? (scribe?.gender === 'male' ? "Male" : "Female") : "Unknown"} `}

                        </Text>
                        <Text style={styles.text2}>
                            {`Preferred Languages: ${(typeof scribe?.languages === 'string') ? scribe?.languages : "Unnamed"} `}

                        </Text>
                        <Text style={styles.text2}>
                            Rating: {`${(typeof scribe?.rating === 'number') ? scribe?.rating.toFixed(2) : ""}` } 
                        </Text>
                        <Text style={styles.text2}>
                            Age: {`${(scribe?.DOB) ? Math.floor((new Date() - scribe?.DOB?.toDate()) / 31557600000) : "Unknown"}`}
                        </Text>


                    </View>
                </View>


                <View style={styles.lowerHalf}>
                    <View style={styles.review}>
                        <AirbnbRating
                            count={5}
                            reviews={review_values}
                            showRating
                            onFinishRating={(r) => { rating.current = r }}
                            defaultRating={3}
                            size={20}
                        />
                        <TouchableOpacity style={styles.priorityButton}
                            onPress={
                                askRatingConfirmation
                            }
                        >
                            <Text style={styles.t1}>Rate the volunteer</Text>
                        </TouchableOpacity>
                        {review?.words ?
                            <View>
                                <Text style={styles.text3}>Write a review</Text>
                                <TextInput multiline={true} numberOfLines={10} onChangeText={setReview} defaultValue={review.words} style={styles.input} />
                                <TouchableOpacity style={styles.priorityButton}
                                    onPress={() => {

                                        if (scribe && revw !== '') {

                                            firestore.collection('scribes')
                                                .doc(scribe_id)
                                                .collection('reviews')
                                                .doc(req_id)
                                                .update({ words: revw })
                                                .catch((err) => {
                                                    console.log("cant do", err)
                                                    showAlert("Sorry! Can't review right now, please try again later!")
                                                })
                                                .then(() => {
                                                    console.log("reviwed")
                                                    showAlert("Succesfully reviewed!")
                                                })
                                        }
                                    }}
                                >
                                    <Text style={styles.t1}>Update Review</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <Text style={styles.text3}>Write a review</Text>
                                <TextInput multiline={true} numberOfLines={10} onChangeText={setReview} style={styles.input} />
                                <TouchableOpacity style={styles.priorityButton}
                                    onPress={() => {

                                        if (scribe && revw !== '') {

                                            firestore.collection('scribes')
                                                .doc(scribe_id)
                                                .collection('reviews')
                                                .doc(req_id)
                                                .set({ words: revw })
                                                .catch((err) => {
                                                    console.log("cant do", err)
                                                    showAlert("Sorry! Can't review right now, please try again later!")
                                                })
                                                .then(() => {
                                                    console.log("reviwed")
                                                    showAlert("Succesfully reviewed!")
                                                })
                                        }
                                    }}
                                >
                                    <Text style={styles.t1}>Submit Review</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    <TouchableOpacity style={styles.priorityButton}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.t1}>Back</Text>
                    </TouchableOpacity>




                </View>

            </ScrollView>
        </View>
    )
}

export default ReviewVolunteer
