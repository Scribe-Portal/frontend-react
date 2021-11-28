/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CodePush from 'react-native-code-push';
import { Bar } from 'react-native-progress';
import { connect } from 'react-redux';
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "#D4D4D4",
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
        this.goAhead.bind(this)
        this.state = {
            updateStatus: "Checking for updates...",
            downloadProgress: 0,
        }
    }
    goAhead() {
        if (this.props.uid !== "none") {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
        }
        else {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'SelectLanguage' }] })

        }
    }
    async componentDidMount() {
        const update = await CodePush.checkForUpdate();
        // If mandatory update -> Init CodePush sync flow
        if (update && update.isMandatory) {
            const { IMMEDIATE } = CodePush.InstallMode;
            return await CodePush.sync(
                { installMode: IMMEDIATE, updateDialog: true },
                status => {

                    switch (status) {
                        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                            this.setState({ updateStatus: "Checking for updates..." })
                            break;
                        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                            this.setState({ updateStatus: "Downloading updates..." })
                            break;
                        case codePush.SyncStatus.INSTALLING_UPDATE:
                            this.setState({ updateStatus: "Installing updates..." })
                            break;
                        case codePush.SyncStatus.UP_TO_DATE:
                            this.goAhead();
                            break;
                        case codePush.SyncStatus.UPDATE_INSTALLED:
                            this.goAhead();
                            break;
                    }
                },
                ({ receivedBytes, totalBytes, }) => {
                    this.setState({ downloadProgress: receivedBytes / totalBytes })
                },
                () => { } // Don't remove this function (github.com/Microsoft/react-native-code-push/issues/516)
            );
        }
        else {
            this.goAhead()
        }

    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}
            // onStartShouldSetResponder={() => {
            //     navigation.navigate("SelectLanguage")
            // }}
            >
                <Text style={styles.mainText}>
                    Scribe
                </Text>
                <Text style={styles.subText}>
                    {this.state.updateStatus}
                </Text>

                <Bar style={{ margin: 10 }} width={null} height={30} progress={this.state.downloadProgress} />
            </View>
        )
    }
}
export default connect((state) => ({
    lang: state.userAppSettings.lang,
    uid: state.userAppSettings.uid,
}))(Splash)