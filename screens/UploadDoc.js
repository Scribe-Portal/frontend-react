/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

import { connect } from 'react-redux'
import firebase_storage from '@react-native-firebase/storage'
import firebase_firestore from '@react-native-firebase/firestore'
import { Bar } from 'react-native-progress'
import { launchImageLibrary } from 'react-native-image-picker'
import { compose } from 'redux';
import { useFirestore, withFirestore } from 'react-redux-firebase';
import { Picker } from '@react-native-picker/picker'

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
        fontSize: 18,
        fontWeight: '700',
    },
    text2: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: '700',
    },
    tsmall: {

    },
    UploadDocButton: {
        backgroundColor: '#616161',
        borderColor: "#616161",
        borderRadius: 10,
        padding: 5,
        margin: 5,
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
    text3: {
        color: "#828282",
        fontSize: 15,
        fontWeight: '200',
    },
    radioRoot: {
        backgroundColor: "white",
        flexDirection: 'row',
        padding: 10,
        borderRadius: 9,
        margin: 10,
    },
    itemStyle: {
        fontSize: 10,
        fontFamily: "Roboto-Regular",
        color: "#007aff"
    },
    pickerStyle: {
        width: "100%",
        height: 40,
        color: "#007aff",
        fontSize: 14,
        fontFamily: "Roboto-Regular"
    },
    textStyle: {
        fontSize: 14,
        fontFamily: "Roboto-Regular"
    }

});
function RadioButton({ i, text, selectedRadioButton, handleChange }) {
    return (
        <TouchableOpacity
            style={styles.radioRoot}
            onPress={handleChange}
        >
            <View style={{
                padding: 3,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                margin: 5,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {
                    selectedRadioButton == i ?
                        <View style={{
                            height: 8,
                            width: 8,
                            borderRadius: 4,
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
            selectedRadioButton: -1,
            uploadProgress: 0,
            uploadedText: '',
            eduCertifUploaded: -1,
            uploadedText2: '',
            selectedEdu: '12th'
        }
        this.setSelectedRadio = this.setSelectedRadio.bind(this)
        this.uid = props.auth.uid
        // this.firestore = props.firestore
    }
    eduCertif() {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
        }, (capture) => {
            if (capture.didCancel || capture.errorCode) {
                if (capture.errorCode) {
                    console.log(capture.errorMessage)
                }
            }
            else {
                let task = firebase_storage()
                    .ref(`EducCertif/${this.uid}`)
                    .putFile(capture["assets"][0]["uri"])
                // console.log('upload successful!')
                task.on('state_changed', taskSnapshot => {
                    this.setState({ uploadProgress: taskSnapshot.bytesTransferred / taskSnapshot.totalBytes })
                })
                task.then(() => {
                    this.setState({
                        uploadedText2: "Education Certificate Uploaded " + capture["assets"][0]["fileName"],
                        eduCertifUploaded: 1,
                    })

                })
                firebase_storage().ref(`IdentityDoc/${this.uid}`).getDownloadURL().then((url) => {
                    firebase_firestore()
                        .collection('users')
                        .doc(this.uid)
                        .update(
                            {
                                eduCertURL: url,
                                eduCertType: this.state.selectedEdu
                            })
                })

            }
        })
    }
    setSelectedRadio(i) {
        // console.log('uid: ', this.uid);
        // console.log(this.props.auth)

        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
        }, (capture) => {
            if (capture.didCancel || capture.errorCode) {
                if (capture.errorCode) {
                    console.log(capture.errorMessage)
                }
            }
            else {
                let task = firebase_storage()
                    .ref(`IdentityDoc/${this.uid}`)
                    .putFile(capture["assets"][0]["uri"])
                // console.log('upload successful!')
                task.on('state_changed', taskSnapshot => {
                    this.setState({ uploadProgress: taskSnapshot.bytesTransferred / taskSnapshot.totalBytes })
                })
                task.then(() => {
                    this.setState({
                        uploadedText: "Uploaded! " + capture["assets"][0]["fileName"],
                        selectedRadioButton: i
                    })
                })
                firebase_storage().ref(`IdentityDoc/${this.uid}`).getDownloadURL().then((url) => {
                    firebase_firestore()
                        .collection('users')
                        .doc(this.uid)
                        .update(
                            {
                                identityDocURL: url,
                                identityDocType: this.radioOptions[this.state.selectedRadioButton]
                            })
                })

            }
        })
    }
    onValueChangeCat(newVal) {
        this.setState({ selectedEdu: newVal })
    }
    render() {
        const { navigation, isItAScribe } = this.props;

        let radio_array = []
        let edus = ["10th", "12th", "None", "8th", "5th", "Graduate", "PostGraduate", "Doctorate"]
        this.radioOptions = ["Aadhar Card", "Voter ID Card", "Driving License", "PAN Card"]
        this.radioOptions.forEach((doc, i, arr) => {

            radio_array.push(
                <RadioButton
                    i={i}
                    key={i}
                    text={arr[i]} // arr is ["aadhar card", ...]
                    selectedRadioButton={this.state.selectedRadioButton}
                    handleChange={() => { this.setSelectedRadio(i) }}
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
                    <Text style={styles.text1}>
                        Highest Educational Qualification
                    </Text>
                    <View style={{ flex: 0.7, fontSize: 14 }}>
                        <Picker
                            itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={styles.pickerStyle}
                            selectedValue={this.state.selectedEdu}
                            onValueChange={this.onValueChangeCat.bind(this)}
                        >
                            {edus.map((item, ind) => (
                                <Picker.Item
                                    color="#0087F0"
                                    label={item}
                                    value={item}
                                    key={ind}
                                    index={ind}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={styles.centerered}>

                    <TouchableOpacity
                        style={styles.UploadDocButton}
                        onPress={this.eduCertif.bind(this)}
                    >
                        
                        <Text style = {styles.text2}>Upload Educational Certificate </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.UploadDocButton}
                        onPress={() => {
                            // if (this.state.selectedRadioButton === -1 || this.state.eduCertifUploaded === -1) {
                            //     return
                            // }
                            if (isItAScribe) {
                                navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                            }
                            else {
                                navigation.navigate('VolunteerPreference')
                            }

                        }}
                    >

                        <Text style={styles.t1}>

                            Save and Next
                        </Text>
                    </TouchableOpacity>

                    <Bar style={{ margin: 10 }} width={null} height={30} progress={this.state.uploadProgress} />
                    <Text style={styles.text3}>{this.state.uploadedText}</Text>
                    <Text style={styles.text3}>{this.state.uploadedText2}</Text>
                </View>
            </View>



        )
    }
}
const selectUserSettings = (state) => ({
    lang: state.userAppSettings.lang,
    auth: state.firebase.auth,
    isItAScribe: state.userAppSettings.isItAScribe,
})

export default connect(selectUserSettings)(UploadDoc)
