/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { VolunteerPreferenceText } from '../translations'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
        justifyContent: 'center',


    },
    input: {
        top:50,
        margin:0.5,
        width:"97%",
        height: 60,
        backgroundColor: "white"
    },
    centered: {
        flex: 1,
        margin: 20,

    },
    text1: {
       top: 20,
       textAlign: "center",
       color: "#19939A",
       fontSize: 30,
       fontWeight: '700',
    },
    text2: {
        top: 40,
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    text3: {
        top: 70,
        color: "#3A3A3A",
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "lucida grande",
    },
    tsmall: {

    },
    button1: {
        top:95,
        margin: 5,
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        borderWidth: 3,
    },
    button2: {
        top:105,
        margin: 4,
        backgroundColor: "#B4E2DF",
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

    },
    textInpu: {
        position:"absolute",
        top: 160,
        flex:-1,
        width:300
    },
    radioRoot:{
        top:80,
        width:"95%",
        backgroundColor: "white",
        flexDirection: 'row',
        padding: 20,
        margin: 5,
    },

});
function RadioButton({ i, text, selectedRadioButton, handleChange }) {
    return (
        <TouchableOpacity
            style={styles.radioRoot}
            onPress={handleChange}
        >
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {
                    selectedRadioButton == i ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
            <Text>{text}</Text>
        </TouchableOpacity>

    );
}
export class VolunteerPreference extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRadioButton: 0
        }
        this.setSelectedRadio = this.setSelectedRadio.bind(this)
    }
    setSelectedRadio(i){
        this.setState({
            selectedRadioButton: i
        })
    }
    render() {
        const { navigation,lang } = this.props;
        let radio_array=[]
        let radioOptions = ["10th Pass", "12th Pass", "Graduate"]
        radioOptions.forEach((doc, i, arr) => {

            radio_array.push(
                <RadioButton
                    i={i}
                    key={i}
                    text={arr[i]} // arr is ["aadhar card", ...]
                    selectedRadioButton={this.state.selectedRadioButton}
                    handleChange={() => {this.setSelectedRadio(i)}}
                />
            )
        });

        return (
            <ScrollView>

                <View style={styles.container}>
                    <View style={styles.centered}>

                        <Text style={styles.text1}>
                            Volunteer Preference,
                        </Text >                     
                        <Text style={styles.text2}>Gender</Text>
                        <TextInput onChangeText={(t) => {this.setState({name: t})}} style={styles.input}/>
                        <Text style={styles.text3} >Qualification Preference</Text>
                        {radio_array}
                        <TouchableOpacity style={styles.button1}
                            onPress={() => {

                                navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                            }}
                        >
                            <Text style={styles.t1}>
                                Request Volunteer
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2}
                            onPress={() => {

                                navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                            }}
                        >
                            <Text style={styles.t1}>
                            Decide later
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
        )
    }
}
const selectUserSettings = (state) => ({lang: state.userAppSettings.lang})

export default connect(selectUserSettings)(VolunteerPreference)
