/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
    },
    upperHalf: {
        flex: 1,
        justifyContent: 'center',

        alignItems: 'center',

    },
    lowerHalf: {
        flex: 1,
    },
    text1: {
        color: "#828282",
        fontSize: 30,
        flex: 1,
        fontWeight: '700',
    },
    mainText: {
    }
});
export class SelectLanguage extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style= {styles.container}>
                <View style={styles.upperHalf}>
                    <Text style= {styles.text1}>
                        Select your Language.
                        भाषा चुने
                    </Text>
                </View>
                <View style={styles.lowerHalf}>

                </View>

            </View>
        )
    }
}

export default SelectLanguage
