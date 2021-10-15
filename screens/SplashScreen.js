/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    }
    componentDidMount() {
        if (this.props.uid !=="none") {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
        }
        if (this.props.lang!=="none"){
            this.props.navigation.navigate("SelectRole")
        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style= {styles.container} onStartShouldSetResponder={() => {
                
                navigation.navigate("SelectLanguage")
            }}>
                <Text style={styles.mainText}>
                    Scribe
                </Text>
            </View>
        )
    }
}
export default connect((state) => ({
    lang: state.userAppSettings.lang,
    uid: state.userAppSettings.uid,
}))