/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeFirstP, changeSecondP, changeThirdP } from '../reducers/priorityReducer';
import { changeLang } from '../reducers/userAppSettingsReducer';
// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
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
        fontWeight: '300',
    },
    priorityButton: {
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
    t2: {
        color: "#616161",
        fontSize: 30,

    }

});
function ScribePage({ navigation, route: { params: {scribe_id, selected} } }) {
    const scribe = useSelector(state => state.firestore.data.scribes[scribe_id])

    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>
                    {scribe.name}
                    
                </Text>
                <Text style={styles.text2}>

                    {
                        scribe.review
                    }
                </Text>
            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        if (selected){

                            dispatch(removeP({scribe_id: scribe_id}))
                        }
                        else {

                            dispatch(addP({scribe_id: scribe_id}))
                        }
                        navigation.navigate('ShowMatches', {scribe_id: scribe_id})
                    }}
                >
                    <Text style={styles.t1}>

                        {
                            (selected?"Deselect":"Select this volunteer")   
                        }
                    </Text>
                </TouchableOpacity>
                
            </View>

        </View>
    )
}

export default ScribePage
