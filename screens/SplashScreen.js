/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import codePush from 'react-native-code-push'
import { Bar } from 'react-native-progress'
import crashlytics from '@react-native-firebase/crashlytics'
import { connect } from 'react-redux'
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "#DEFCFC",
    },
    mainText: {
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    }
});
class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updateStatus: "",
            downloadProgress: 0,
        }
        this.goAhead.bind(this)
        this.setupdateStatus.bind(this)
        this.setDownloadState.bind(this)
        this.syncStatusChange.bind(this)
        this.downloadProgressChange.bind(this)
    }
    goAhead() {
        if (this.props.uid !== "none") {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
        }
        else {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'SelectLanguage' }] })

        }
    }
    setupdateStatus(statusText) {
        this.setState({ updateStatus: statusText });
    }
    setDownloadState(downloadProgress) {
        this.setState({ downloadProgress: downloadProgress })
    }
    syncStatusChange = (status) => {

        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setupdateStatus("Checking for updates...")
                break
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setupdateStatus("Downloading updates...")
                break
            case codePush.SyncStatus.INSTALLING_UPDATE:
                this.setupdateStatus("Installing updates...")
                break
            case codePush.SyncStatus.UP_TO_DATE:
                this.goAhead()
                break
            case codePush.SyncStatus.UPDATE_INSTALLED:
                crashlytics().log("update installed.")
                this.goAhead()
                break
            case codePush.SyncStatus.UNKNOWN_ERROR:
                this.setupdateStatus("Unknown error")
                crashlytics().log("unknown error updating from appcenter")
                break
            case codePush.SyncStatus.UPDATE_IGNORED:
                crashlytics().log("update cancelled by user")
                this.goAhead()
                break
            case codePush.SyncStatus.AWAITING_USER_ACTION:
                this.setupdateStatus("awaiting user action");
                break
        }
    }
    downloadProgressChange = ({ receivedBytes, totalBytes }) => {
        this.setDownloadState({ downloadProgress: receivedBytes / totalBytes })
    }
    async componentDidMount() {
        const { IMMEDIATE } = codePush.InstallMode;
        await codePush.sync(
            {installMode: IMMEDIATE, updateDialog: true},
            this.syncStatusChange,
            this.downloadProgressChange
        )

    }
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>

                
                <Image source={require('../assets/main_logo.jpg')}></Image>
                <Text style={styles.subText}>
                    {this.state.updateStatus}
                </Text>

                <Bar style={{ margin: 10 }} width={100} height={30} progress={this.state.downloadProgress} />
            </View>
        )
    }
}
export default connect((state) => ({
    lang: state.userAppSettings.lang,
    uid: state.userAppSettings.uid,
}))(Splash)