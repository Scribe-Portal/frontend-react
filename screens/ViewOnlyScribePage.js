/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { addP, removeP } from '../reducers/priorityReducer'
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
        margin: 20
    },
    lowerHalf: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-around'
    },
    text1: {
        top: 20,
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
    },
    text3: {
        top: 10,
        color: "#19939A",
        fontSize: 20,
        fontWeight: '400',
    },
    text6: {
        top: 10,
        textAlign: "right",
        color: "#19939A",
        fontSize: 20,
        fontWeight: '400',
    },
    text4: {
        top: 60,
        color: "#19939A",
        fontSize: 22,
        fontWeight: '400',
    },
    text2: {
        top: 80,
        color: "#828282",
        fontSize: 20,
        fontWeight: '300',
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
function ViewOnlyScribePage({ navigation, route: { params: { scribe_id, selected } } }) {
    useFirestoreConnect(() => [
        { collection: 'scribes', doc: scribe_id }
    ])
    const scribe = useSelector(state => state.firestore.data.scribes && state.firestore.data.scribes[scribe_id])


    if (scribe) {

        return (
            <View style={styles.container}>

                <Text style={styles.text1}>
                    {`${(typeof scribe?.name === 'string') ? scribe.name : "Unnamed"} `}

                </Text>
                <Text style={styles.text6}>

                    {`${(typeof scribe?.rating === 'number') ? scribe.rating : "unrated"}/5`}
                </Text>
                <Text style={styles.text3}>
                    Voulnteered 15 times
                </Text>
                <Text style={styles.text4}>
                    Reviews
                </Text>
                <Text style={styles.text2}>


                    {`${(typeof scribe?.review === 'string') ? scribe?.review : "unreviewed"}`}

                </Text>




            </View>
        )
    }
    else {
        return (

            <View style={styles.container}>
                <Text>Can't find the person.</Text>
            </View>
        )
    }
}

export default ViewOnlyScribePage
