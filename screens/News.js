import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
const styles = StyleSheet.create({
    button1: {
        margin: 5,
        backgroundColor: '#19939A',
        
        borderRadius: 10,
        padding: 7,
        alignItems: 'center',
        
    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
})
function News() {
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    return (
        <TouchableOpacity style={styles.button1}
            onPress={() => {
                navigation.navigate('SelectAvailability')
            }}
            disabled={!isItAScribe}
        >
            <Text style={styles.t1}>

                Select Availability
            </Text>
        </TouchableOpacity>
    )
}

export default News
