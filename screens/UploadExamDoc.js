/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'
import firebase_storage from '@react-native-firebase/storage'
import firebase_firestore from '@react-native-firebase/firestore'
import { Bar } from 'react-native-progress'
import { UploadExamDocText } from '../translations'
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
    UploadExamDocButton: {
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
                margin: 5,
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
export class UploadExamDoc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRadioButton: 0,
            uploadProgress: 0,
            uploadedText: '',
        }
        this.setSelectedRadio = this.setSelectedRadio.bind(this)
        this.uid = props.auth.uid
        this.reqid = props.route.params.requestId
    }
    setSelectedRadio(i){
        this.setState({
            selectedRadioButton: i
        })
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
                    .ref(`examDoc/${this.uid}`)
                    .putFile(capture["assets"][0]["uri"])
                // console.log('upload successful!')
                task.on('state_changed', taskSnapshot => {
                    this.setState({ uploadProgress: taskSnapshot.bytesTransferred / taskSnapshot.totalBytes })
                })
                task.then(() => {
                    this.setState({ uploadedText: "Uploaded!"})
                })
                firebase_storage().ref(`examDoc/${this.uid}`).getDownloadURL().then((url) => {
                    firebase_firestore()
                    .collection(`users/${this.uid}/requests`)
                    .doc(this.reqid)
                    .update(
                        {
                            examDocUrl: url,
                            examDocType: this.radioOptions[this.state.selectedRadioButton]
                        })
                })

            }
        })
    }
    render() {
        const { navigation, route: {params: {requestId}} } = this.props;
        const { uid } = this.props.auth
        let radio_array=[]
        this.radioOptions = ["Admit Card", "Application Receipt"]
        this.radioOptions.forEach((doc, i, arr) => {

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
                    <TouchableOpacity style={styles.UploadExamDocButton}
                        onPress={() => {
                            
                                navigation.navigate('ShowMatches', {requestId: requestId, scribe_id: 0})
                        }}
                    >
                        <Text style={styles.t1}>

                            Save and Next
                        </Text>
                    </TouchableOpacity>
                    <Bar style={{ margin: 10 }} width={null} height={30} progress={this.state.uploadProgress} />
                    <Text style={styles.text1}>{this.state.uploadedText}</Text>
                </View>


            </View>
        )
    }
}
const selectUserSettings = (state) => ({
    lang: state.userAppSettings.lang,
    auth: state.firebase.auth
})

export default connect(selectUserSettings)(UploadExamDoc)
