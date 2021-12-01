/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeLang } from '../reducers/userAppSettingsReducer';
// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
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
        color: "#19939A",
        fontSize: 35,
        fontWeight: '700',
        fontFamily: "lucida grande",

    },
    text2: {
        color: "#19939A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",

    },
    langButton1: {
        top: 71.72,
        backgroundColor:'#19939A',

        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        
    },
    langButton2: {
        backgroundColor:"#B4E2DF",
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 10,
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
function SelectLanguage({navigation}) {
        const dispatch = useDispatch()
        return (
            <View style= {styles.container}>
                <View style={styles.upperHalf}>
                    <Text style= {styles.text1}>
                        Select your Language.
                        {"\n"}{"\n"}
                        अपनी भाषा चुने.
                        {"\n"}
                    </Text>
                    <Text style= {styles.text2}>
                    You can change this later from Settings under profile settings.
                    </Text>
                </View>
                <View style={styles.lowerHalf}>
                    <TouchableOpacity style={styles.langButton1} 
                        onPress= { () => {
                            dispatch(changeLang({newLang: 'en'}))
                            navigation.navigate('SelectRole')
                        }}
                    >
                        <Text style={styles.t1}>

                            English
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.langButton2}
                        onPress = {() => {
                            dispatch(changeLang({ newLang: 'hi'}))
                            navigation.navigate('SelectRole')
                        }}
                    >
                        <Text style={styles.t2}>

                            हिंदी
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
}

export default SelectLanguage
