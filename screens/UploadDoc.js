/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'

import { connect } from 'react-redux'
import firebase_storage from '@react-native-firebase/storage'
import firebase_firestore from '@react-native-firebase/firestore'
import { Bar } from 'react-native-progress'
import { launchImageLibrary } from 'react-native-image-picker'
import { compose } from 'redux';
import { useFirestore, withFirestore } from 'react-redux-firebase';
import { Picker } from '@react-native-picker/picker'
import { ScrollView } from 'react-native'

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
    input: {
        margin: 10,
        height: 40,
        backgroundColor: "white"
    },
    centered: {
        flex: 1,
        margin: 20,

    },
    tsmall: {

    },
    UploadDocButton: {
        backgroundColor: '#19939A',
        borderColor: "#19939A",
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,

        alignItems: 'center',

    },
    t1: {
        color: "#FFFFFF",
        fontSize: 30
    },
    t3: {
        color: "#FFFFFF",
        fontSize: 25,
    },
    t2: {
        color: "#19939A",
        fontSize: 30,

    },
    text3: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: '200',
    },
    radioRoot: {
        backgroundColor: "white",
        flexDirection: 'row',
        padding: 10,
        borderRadius: 9,
        marginVertical: 10,
    },
    itemStyle: {
        fontSize: 10,
        fontFamily: "Roboto-Regular",
        color: "#000000",
    },
    pickerStyle: {
        width: "100%",
        height: 40,
        backgroundColor: "#FFFFFF",

        fontSize: 14,
        borderRadius: 5,
        fontFamily: "Roboto-Regular"
    },
    textStyle: {
        fontSize: 14,
        fontFamily: "Roboto-Regular"
    },
    radioText: {
        margin: 7,
    },
    picker: {},
    pickerView: {
        marginVertical: 20,

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
            <Text style={styles.radioText}>{text}</Text>
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
            eduCertifUploaded: false,
            disabCertifUploaded: false,
            idCertifUploaded: false,
            buttonDisabled: false,
            uploadedText2: '',
            selectedEdu: '12th'
        }
        this.setSelectedRadio = this.setSelectedRadio.bind(this)
        this.eduCertif = this.eduCertif.bind(this)
        this.uploadDisabCertif = this.uploadDisabCertif.bind(this)
        this.uploadEduCertif = this.uploadEduCertif.bind(this)
        this.uploadIdentityDoc = this.uploadIdentityDoc.bind(this)
        this.disabCertif = this.disabCertif.bind(this)
        this.uid = props.uid
        this.radioOptions = ["Aadhar Card", "Voter ID Card", "Driving License", "PAN Card"]

        
    }
    uploadDisabCertif (capture){
        const { firestore, uid } = this.props
        if (capture.didCancel || capture.errorCode) {
            if (capture.errorCode) {
                // console.log(capture.errorMessage)
            }
        }
        else {
            let task = firebase_storage()
                .ref(`DisabCertif/${uid}`)
                .putFile(capture["assets"][0]["uri"])
            // console.log('upload successful!')
            task.on('state_changed', taskSnapshot => {
                this.setState({ uploadProgress: taskSnapshot.bytesTransferred / taskSnapshot.totalBytes })
            })
            task.then(() => {
                this.setState({
                    // uploadedText2: "Disability Certificate Uploaded " + capture["assets"][0]["fileName"],
                    uploadedText2: "Disability Certificate Uploaded ",
                    disabCertifUploaded: true,
                })

            })
            firebase_storage().ref(`DisabCertif/${uid}`).getDownloadURL().then((url) => {
                firestore
                    .collection('users')
                    .doc(uid)
                    .update(
                        {
                            disabCertURL: url,
                            disabCertifUploaded: true,
                        })

                this.setState({ disabCertifUploaded: true, buttonDisabled: false })
            })

        }
    }
    disabCertif() {
        this.setState({ buttonDisabled: true })
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
        }, this.uploadDisabCertif )
    }
    showNoDocumentsDialog = () => {
        return Alert.alert(
            "Document Not Uploaded",
            "Please upload both the documents",
            [
                {
                    text: "OK",
                },
            ]
            
            )
        }
    uploadEduCertif (capture) {
        const { firestore, uid } = this.props
        if (capture.didCancel || capture.errorCode) {
            if (capture.errorCode) {
                // console.log(capture.errorMessage)
            }
        }
        else {
            let task = firebase_storage()
                .ref(`EducCertif/${uid}`)
                .putFile(capture["assets"][0]["uri"])
            // console.log('upload successful!')
            task.on('state_changed', taskSnapshot => {
                this.setState({ uploadProgress: taskSnapshot.bytesTransferred / taskSnapshot.totalBytes })
            })
            task.then(() => {
                this.setState({
                    // uploadedText2: "Education Certificate Uploaded " + capture["assets"][0]["fileName"],
                    uploadedText2: "Education Certificate Uploaded ",
                    eduCertifUploaded: true,
                })

            })
            firebase_storage().ref(`EduCertif/${uid}`).getDownloadURL().then((url) => {
                firestore
                    .collection('scribes')
                    .doc(uid)
                    .update(
                        {
                            eduCertURL: url,
                            eduCertType: this.state.selectedEdu,
                            eduCertifUploaded: true,
                        })
            })
            this.setState({ eduCertifUploaded: true, buttonDisabled: false })

        }
    }
    eduCertif() {

        
        this.setState({ buttonDisabled: true })
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
        }, this.uploadEduCertif)
    }
    uploadIdentityDoc(capture) {
        const { isItAScribe, firestore, uid } = this.props
        if (capture.didCancel || capture.errorCode) {
            if (capture.errorCode) {
                // console.log(capture.errorMessage)
            }
        }
        else {
            let task = firebase_storage()
                .ref(`IdentityDoc/${uid}`)
                .putFile(capture["assets"][0]["uri"])
            // console.log('upload successful!')
            task.on('state_changed', taskSnapshot => {
                this.setState({ uploadProgress: taskSnapshot.bytesTransferred / taskSnapshot.totalBytes })
            })
            task.then(() => {
                this.setState({
                    // uploadedText: "Uploaded! " + capture["assets"][0]["fileName"],
                    uploadedText: "Uploaded! ",

                })
            }).catch((err) => {console.log("error in uploading", err)})
            firebase_storage().ref(`IdentityDoc/${uid}`).getDownloadURL().then((url) => {
                firestore
                    .collection(isItAScribe ? "scribes" : "users")
                    .doc(uid)
                    .update(
                        {
                            identityDocURL: url,
                            identityDocType: this.radioOptions[this.state.selectedRadioButton],
                            idCertifUploaded: true,
                        })
                    .catch((err) => {console.log("error putting url", err)})
                    })
                    .catch((err) => {console.log("error putting url", err)})
                    
            this.setState({ idCertifUploaded: true })
        }
            
    }
    setSelectedRadio(i) {
        this.setState({
            selectedRadioButton: i
        })
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
        }, this.uploadIdentityDoc)
    }
    nextButton1() {

        const { route: { params: { fromHome } }, navigation, isItAScribe, firestore, uid } = this.props
        if (fromHome) {

            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })



        }

        else if (isItAScribe && this.state.eduCertifUploaded && this.state.idCertifUploaded) {


            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })



        }
        else if (!isItAScribe && this.state.disabCertifUploaded && this.state.idCertifUploaded) {


            navigation.navigate('VolunteerPreference')

        }
        else {
            this.showNoDocumentsDialog()
        }
    }
    
    onValueChangeCat(newVal) {
        this.setState({ selectedEdu: newVal })
        this.eduCertif()
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
                <ScrollView contentContainerStyle={styles.inner_container}>

                    <View style={styles.centered}>

                        <Text style={styles.text1}>
                            Upload Documents for Verification
                        </Text>
                        {radio_array}
                    </View>
                    <View style={styles.centered}>
                        {
                            isItAScribe ? (

                                <View style={styles.pickerView}>

                                    <Text style={styles.text1}>
                                        Highest Educational Qualification
                                    </Text>
                                    <View style={styles.picker}>
                                        <Picker
                                            itemStyle={styles.itemStyle}
                                            mode="dropdown"
                                            style={styles.pickerStyle}
                                            selectedValue={this.state.selectedEdu}
                                            onValueChange={this.onValueChangeCat.bind(this)}
                                        >
                                            {edus.map((item, ind) => (
                                                <Picker.Item

                                                    label={item}
                                                    value={item}
                                                    key={ind}
                                                    index={ind}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={styles.UploadDocButton}
                                    onPress={this.disabCertif.bind(this)}
                                >

                                    <Text style={styles.t3}>Upload Disability Certificate </Text>
                                </TouchableOpacity>
                            )
                        }

                        <TouchableOpacity style={styles.UploadDocButton}
                            onPress={this.nextButton1.bind(this)}

                        >

                            <Text style={styles.t1}>

                                Save and Next
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.UploadDocButton}
                            onPress={this.nextButton2.bind(this)}
                            disabled={this.state.buttonDisabled}
                        >

                            <Text style={styles.t1}>
                                Do it later
                            </Text>
                        </TouchableOpacity> */}

                        <Bar style={{ marginVertical: 10, }} width={null} height={30} progress={this.state.uploadProgress} />
                        <Text style={styles.text1}>{this.state.uploadedText}</Text>
                        <Text style={styles.text1}>{this.state.uploadedText2}</Text>
                    </View>
                </ScrollView>


            </View>

        )
    }
}
const selectUserSettings = (state) => ({
    lang: state.userAppSettings.lang,
    uid: state.userAppSettings.uid,
    isItAScribe: state.userAppSettings.isItAScribe,
})
export default compose(
    connect(selectUserSettings),
    withFirestore,
)(UploadDoc)
// export default connect(selectUserSettings)(UploadDoc)
