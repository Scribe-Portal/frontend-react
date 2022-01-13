import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import { PendingRequests, VolunteerSearchSuccessful } from '../translations'
const styles = StyleSheet.create({
    button1: {
        margin: 5,
        backgroundColor: '#19939A',

        borderRadius: 10,
        padding: 7,
        alignItems: 'center',

    },
    container: {
        flex: 1,
        
    },
    inner_container: {
        flexGrow: 1,
        
        backgroundColor: "#B4E2DF",
    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    textA: {
        color: "#FFFFFF",

        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',

    },
    textB: {
        color: "#923737",
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    textC: {
        color: "#9E6E12",
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    requestA: {
        backgroundColor: "#9933FF",
        paddingHorizontal: 16,
        paddingVertical: 25,
        marginHorizontal: 10,
        marginVertical: 12,
        borderRadius: 10,
    },
    requestB: {
        paddingHorizontal: 16,
        paddingVertical: 25,
        backgroundColor: "#FDF1DB",
        marginHorizontal: 10,
        marginVertical: 12,
        borderRadius: 10,
    },
    requestC: {
        paddingHorizontal: 16,
        paddingVertical: 25,
        backgroundColor: "#FCC8D7",
        marginHorizontal: 10,
        marginVertical: 12,
        borderRadius: 10,
    },

})
function News() {
    const lang = useSelector(state => state.userAppSettings.lang)
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>

                <TouchableOpacity style={styles.requestA} onPress={() => {
                    navigation.navigate('RequestsA')
                }}>
                    <Text style={styles.textA}>{VolunteerSearchSuccessful[lang]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.requestB} onPress={() => {
                    navigation.navigate('RequestsB')
                }}>
                    <Text style={styles.textC}>{PendingRequests[lang]}</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>

    )
}

export default News
