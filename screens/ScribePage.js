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
        
        color: "#19939A",
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
    },
    
    text2: {
        color: "#9E6E12",
        fontSize: 20,
        fontWeight : '300',
        textAlign: 'left',
    },
    volunteerBox: {
        backgroundColor:"#FDF1DB",
        borderRadius: 10,
        padding: 7,
        marginVertical: 5,
    },
    priorityButton: {
        top: 80,
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        textAlign: "center",
        borderWidth: 3,
    },
    priorityButton1: {
        top: 80,
        backgroundColor: '#456DBA',
        borderColor: "#456DBA",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        textAlign: "center",
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
function ScribePage({ navigation, route: { params: { scribe_id, selected, modifiable } } }) {
    
    const scribe = useSelector(state => state.firestore.data.scribes && state.firestore.data.scribes[scribe_id])
    const num_selected = useSelector(state => state.priority.num)
    const lang = useSelector(state => state.userAppSettings.lang)

    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={styles.upperHalf}>
                <Text style={styles.text1}>
                    Volunteer Details

                </Text>
                <View style={styles.volunteerBox}>
                    <Text style={styles.text2}>
                        {`Name: ${(typeof scribe?.name === 'string') ? scribe?.name : "Unnamed"} `}

                    </Text>
                    <Text style={styles.text2}>
                        {`Gender: ${(typeof scribe?.gender === 'string') ? (scribe?.gender==='male' ? "Male" : "Female") : "Unknown"} `}

                    </Text>
                    
                    {scribe?.Hindi ?
                        <Text style={styles.text2}>
                            The volunteer is comfortable giving exams in Hindi
                        </Text> : null
                    }
                    {scribe?.English ?
                        <Text style={styles.text2}>
                            The volunteer is comfortable giving exams in English
                        </Text> : null
                    }
                    
                    {scribe?.CBT ?
                        <Text style={styles.text2}>
                            The volunteer is comfortable giving Computer Based Tests
                        </Text> : null
                    }
                    {scribe?.Math ?
                        <Text style={styles.text2}>
                            The volunteer is comfortable giving exams with Maths
                        </Text> : null
                    }
                    <Text style={styles.text2}>
                        Age: {`${(scribe?.DOB) ? Math.floor((new Date() - scribe?.DOB?.toDate()) / 31557600000) : "Unknown"}`}
                    </Text>
                    

                </View>
            </View>
            
            
            <View style={styles.lowerHalf}>
                {modifiable ?
                    <TouchableOpacity style={selected ? styles.priorityButton1 : styles.priorityButton}
                        onPress={() => {
                            // console.log(num_selected)
                            if (selected) {

                                dispatch(removeP({ scribe_id: scribe_id }))
                            }
                            else if (num_selected < 3) {

                                dispatch(addP({ scribe_id: scribe_id }))
                            }
                            else {
                                // console.log("cant add more")
                            }
                            navigation.navigate('ShowMatches', { scribe_id: scribe_id })
                        }}
                    >
                        <Text style={styles.t1}>

                            {
                                (selected
                                    ? "Discard this Volunteer"
                                    : (num_selected < 3
                                        ? "Select this volunteer"
                                        : "Can't select more than 3"
                                    ))
                            }
                        </Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
            
            


        </View>
    )
}

export default ScribePage
