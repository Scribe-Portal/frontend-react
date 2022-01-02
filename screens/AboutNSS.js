/* eslint-disable prettier/prettier */
import React, { Component,  } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

import { ScrollView } from 'react-native';

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
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner_container}>



                <View style={styles.c1}>
                    <Image source={require('../assets/nss_logo.jpg')}></Image>
                    <Text style={styles.text1}>
                        About NSS
                    </Text>
                    <Text style={styles.text2}>
                        NSS IIT Delhi is the IIT Delhi chapter of the National Service Scheme, institutionalized under the Ministry of Youth Affairs & Sports Govt. of India. Our sole aim is to motivate students at IITD to indulge in nation building activities through various events and projects which are aimed towards the benefit of people in and around IIT Delhi. We share the belief that such activities are almost always means of great satisfaction and joy.
                    </Text>
                    
                    <Text style={styles.text2}>
                        NSS IITD has a volunteer base of around 2000 students belonging to various disciplines and degrees of IIT Delhi. We work on a diverse range of social issues including blood donation, teaching, environmental issues, etc. We also collaborate with several NGO's in and around IIT Delhi on working on these issues. 
                    </Text>

                </View>

            </ScrollView>


        </View>
    )

}

export default AboutNSS
