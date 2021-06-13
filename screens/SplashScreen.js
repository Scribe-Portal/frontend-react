/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
export default class Splash extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style= {styles.container} onStartShouldSetResponder={() => {
                console.log("touched")
                navigation.navigate("SelectLanguage")
            }}>
                <Text style={styles.mainText}>
                    Scribe
                </Text>
            </View>
        )
    }
}
