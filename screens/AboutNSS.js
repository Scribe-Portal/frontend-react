/* eslint-disable prettier/prettier */
import React, { Component,  } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Linking } from 'react-native';

import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { AboutNSSTxt, NSSWebsitetxt, TextInsideAboutNSS1 } from '../translations';

const NSSWebsite = 'http://nss.iitd.ac.in/'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    inner_container: {
        flexGrow: 1,
        backgroundColor: "#B4E2DF",


    },
    text1: {
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
        textAlign: "center",
    },
    c1: {
        marginHorizontal: 20,
        
        alignItems: 'center',
        marginVertical: 15,
    },
    c2: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    c3: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    text2: {
        color: "#19939A",
        fontSize: 20,
        fontWeight: '400',
    },
    FillInfoButton: {
        backgroundColor: '#19939A',
        marginVertical: 5,

        borderRadius: 10,
        padding: 5,
        alignItems: 'center',

    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
});
function AboutNSS({ navigation }) {
    const lang = useSelector(state => state.userAppSettings.lang)
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>


                <View style={styles.c1}>

                    <Image source={require('../assets/nss_logo_updated_5.png')}></Image>
                </View>
                <View style={styles.c2}>
                    <Text style={styles.text1}>
                        {AboutNSSTxt[lang]}
                    </Text>
                    <Text style={styles.text2}>
                        {TextInsideAboutNSS1[lang]}
                    </Text>
                    

                </View>
                <View style={styles.c3}>
                <TouchableOpacity style={styles.FillInfoButton}
                        onPress={() => {
                            
                            Linking.canOpenURL(NSSWebsite).then(supported => {
                                if (supported) {
                                    Linking.openURL(NSSWebsite);
                                } else {
                                    showFail()
                                }
                            });

                        }}
                    >
                        <Text style={styles.t1}>

                            {NSSWebsitetxt[lang]}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
    )

}

export default AboutNSS
