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
function ScribePage({ navigation, route: { params: {scribe_id} } }) {
    const scribe = useSelector(state => state.firestore.data.scribes[scribe_id])

    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>
                    {scribe.name}
                    
                </Text>
            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        dispatch(changeFirstP({ scribe_id: scribe_id }))
                        navigation.navigate('ShowMatches')
                    }}
                >
                    <Text style={styles.t1}>

                        First Priority
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        dispatch(changeSecondP({ scribe_id: scribe_id }))
                        navigation.navigate('ShowMatches')
                    }}
                >
                    <Text style={styles.t1}>

                        Second Priority
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priorityButton}
                    onPress={() => {
                        dispatch(changeThirdP({ scribe_id: scribe_id }))
                        navigation.navigate('ShowMatches')
                    }}
                >
                    <Text style={styles.t1}>
                        Third Priority
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ScribePage
