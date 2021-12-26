/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import firebase_storage from '@react-native-firebase/storage'
import firebase_firestore from '@react-native-firebase/firestore'
import { Bar } from 'react-native-progress'
import { UploadExamDocText } from '../translations'
import { launchImageLibrary } from 'react-native-image-picker';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
        justifyContent: 'center',
        

    },
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },
    inner_container: {
        flex: 1,
        flexGrow: 1,
        marginHorizontal: 20,

    },
    middle_spacing: {
        flexGrow: 1,
        // backgroundColor: "red",
    },
    text1: {
        color: "#19939A",
        fontSize: 30,
        fontWeight: '700',
    },
    tsmall: {

    },
    UploadExamDocButton: {
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        
    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    t2: {
        color: "#19939A",
        fontSize: 30,

    },
    radioRoot:{
        backgroundColor: "white",
        flexDirection: 'row',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
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
            examDocUploaded: false,
        }
        this.setSelectedRadio = this.setSelectedRadio.bind(this)
        this.uid = props.uid
        this.reqid = props.route.params.requestId
        this.radioOptions = ["Admit Card", "Application Receipt"]
        // console.log(this.props.route.params.dateSlot)
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
                    // console.log(capture.errorMessage)
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
                    this.setState({ uploadedText: "Uploaded!", examDocUploaded: true})

                })
                firebase_storage().ref(`examDoc/${this.uid}`).getDownloadURL().then((url) => {
                    firebase_firestore()
                    .collection(`requests`)
                    .doc(this.reqid)
                    .set(
                        {
                            examDocUrl: url,
                            examDocType: this.radioOptions[this.state.selectedRadioButton]
                        })
                })

            }
        })
    }
    render() {
        const { navigation, uid, route: {params: {requestId, onto}} } = this.props;
        // console.log(this.reqid)

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.inner_container}>

                    <Text style={styles.text1}>
                        Upload Documents
                    </Text>
                    {this.radioOptions.map((item, i) => (
                        <RadioButton
                            i={i}
                            key={i}
                            text={item} // arr is ["aadhar card", ...]
                            selectedRadioButton={this.state.selectedRadioButton}
                            handleChange={() => {this.setSelectedRadio(i)}}
                        />

                    ))}
                    <View style={styles.middle_spacing}></View>
                    <TouchableOpacity style={styles.UploadExamDocButton}
                        onPress={() => {
                            if (onto==="RequestPageB") {
                                navigation.navigate("RequestPageB", {req_id: req_id, })
                            }
                            else {
                                navigation.navigate('ShowMatches', {requestId: requestId, dateSlot: this.props.route.params.dateSlot, scribe_id: 0})
                            }
                        }}
                    >
                        <Text style={styles.t1}>

                            Save and Next
                        </Text>
                    </TouchableOpacity>
                    <Bar style={{ marginVertical: 10 }} width={null} height={30} progress={this.state.uploadProgress} />
                    <Text style={styles.text1}>{this.state.uploadedText}</Text>
                </ScrollView>


            </View>
        )
    }
}
const selectUserSettings = (state) => ({
    lang: state.userAppSettings.lang,
    uid: state.userAppSettings.uid,
})

export default connect(selectUserSettings)(UploadExamDoc)
