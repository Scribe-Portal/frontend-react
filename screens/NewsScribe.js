import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import { SelectAvailability } from '../translations'
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
function NewsScribe() {
    const lang = useSelector(state => state.userAppSettings.lang)
    
    const navigation = useNavigation()
    return (
        

            <TouchableOpacity style={styles.button1}
                onPress={() => {
                    navigation.navigate('SelectAvailability')
                }}
                
            >
                <Text style={styles.t1}>

                    {SelectAvailability[lang]}
                </Text>
            </TouchableOpacity> 
    )
}

export default NewsScribe
