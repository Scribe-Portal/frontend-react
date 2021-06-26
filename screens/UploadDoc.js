/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
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
    UploadDocButton: {
        backgroundColor: '#616161',
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
        backgroundColor: "white",
        flexDirection: 'row',
        padding: 20,
        margin: 10,
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
export class UploadDoc extends Component {
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
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
        }, ({didCancel, errorCode, errorMessage, assets}) => {
            console.log(didCancel, errorCode, errorMessage)
        })
    }
    render() {
        const { navigation } = this.props;
        
        let radio_array=[]
        const radioOptions = ["Aadhar Card", "Voter ID Card", "Driving License", "PAN Card"]
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
            <View style={styles.container}>
                <View style={styles.centered}>

                    <Text style={styles.text1}>
                        Upload Documents
                    </Text>
                    {radio_array}
                    <TouchableOpacity style={styles.UploadDocButton}
                        onPress={() => {

                            navigation.navigate('VolunteerPreference')
                        }}
                    >
                        <Text style={styles.t1}>

                            Save and Next
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}
const selectUserSettings = (state) => ({lang: state.userAppSettings.lang})
export default connect(selectUserSettings)(UploadDoc)
