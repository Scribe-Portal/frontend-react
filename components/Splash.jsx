import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
const styles = StyleSheet.create({
    centered: {
        justifyItems: 'center',
        alignItems: 'center'
    }
})
export default class Splash extends Component {
    render() {
        return (
            
            <Text style={styles.centered}>
                Scribe
            </Text>
        )
    }
}


