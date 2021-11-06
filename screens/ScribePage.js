/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addP, removeP } from '../reducers/priorityReducer'
import { changeFirstP, changeSecondP, changeThirdP } from '../reducers/priorityReducer';
import { changeLang } from '../reducers/userAppSettingsReducer';
// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
    },
    upperHalf: {
        flex: 1,
        margin:20
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
    text3: {
        top: 10,
        color: "#616161",
        fontSize: 20,
        fontWeight: '400',
    },
    text6: {
        top: 10,
        textAlign: "right",
        color: "#616161",
        fontSize: 20,
        fontWeight: '400',
    },
    text4: {
        top: 60,
        color: "#616161",
        fontSize: 22,
        fontWeight: '400',
    },
    text2: {
        top:80,
        color: "#828282",
        fontSize: 20,
        fontWeight: '300',
    },
    priorityButton: {
        top:80,
        backgroundColor: '#616161',
        borderColor: "#616161",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        borderWidth: 3,
    },
    priorityButton1: {
        top:80,
        backgroundColor: '#456DBA',
        borderColor: "#456DBA",
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
    t2: {
        color: "#616161",
        fontSize: 30,

    }

});
function ScribePage({ navigation, route: { params: {scribe_id, selected} } }) {
    const scribe = useSelector(state => state.firestore.data.scribes[scribe_id])
    const num_selected = useSelector(state => state.priority.num)

    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>
                    {scribe.name}
                    
                </Text>
                <Text style={styles.text6}>
                    Rating:
                    {scribe.rating}
                </Text>
                <Text style={styles.text3}>
                    Voulnteered 15 times
                </Text>
                <Text style={styles.text4}>
                Reviews
                </Text>
                <Text style={styles.text2}>

                    {
                        scribe.review
                    }
                </Text>
            </View>
            <View style={styles.lowerHalf}>
                <TouchableOpacity style={selected?styles.priorityButton1:styles.priorityButton}
                    onPress={() => {
                        // console.log(num_selected)
                        if (selected){

                            dispatch(removeP({scribe_id: scribe_id}))
                        }
                        else if (num_selected < 3){

                            dispatch(addP({scribe_id: scribe_id}))
                        }
                        else {
                            // console.log("cant add more")
                        }
                        navigation.navigate('ShowMatches', {scribe_id: scribe_id})
                    }}
                >
                    <Text style={styles.t1}>

                        {
                            (selected
                            ?"Discard this Volunteer"
                            :(num_selected < 3
                            ?"Select this volunteer"
                            :"Can't select more than 3"
                            ))   
                        }
                    </Text>
                </TouchableOpacity>
                
            </View>

        </View>
    )
}

export default ScribePage
