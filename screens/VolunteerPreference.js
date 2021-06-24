/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { VolunteerPreferenceText } from '../translations'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
        justifyContent: 'center',


    },
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },
    centered: {
        flex: 1,
        margin: 20,

    },
    text1: {
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    tsmall: {

    },
    VolunteerPreferenceButton: {
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

    },
    radioRoot:{
        backgroundColor: "white"
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
        const { navigation } = this.props;
        const { lang } = this.props.route.params;
        
        let radio_array=[]
        ["10th Pass", "12th Pass", "Graduate"].forEach((doc, i, arr) => {

            radio_array.push(
                <RadioButton
                    i={i}
                    text={arr[i]} // arr is ["aadhar card", ...]
                    selectedRadioButton={this.state.selectedRadioButton}
                    handleChange={() => {this.setSelectedRadio(i)}}
                />
            )
        });

        return (
            <View style={styles.container}>
                <View style={styles.centered}>

                    <Text style={styles.text1}>
                        Volunteer Preference
                    </Text>
                    
                    <Text>Age</Text>
                    <TextInput onChangeText={(t) => {this.setState({name: t})}} style={styles.input}/>
                    
                    <Text>Gender</Text>
                    <TextInput onChangeText={(t) => {this.setState({name: t})}} style={styles.input}/>
                    {radio_array}
                    <TouchableOpacity style={styles.VolunteerPreferenceButton}
                        onPress={() => {

                            navigation.navigate('Home')
                        }}
                    >
                        <Text style={styles.t1}>

                            Submit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.VolunteerPreferenceButton}
                        onPress={() => {

                            navigation.navigate('Home')
                        }}
                    >
                        <Text style={styles.t1}>

                            Skip
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

export default VolunteerPreference
