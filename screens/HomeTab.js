/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
    },
    upperHalf: {
        flex: 1,
    },
    lowerHalf: {
        flex: 2,
        zIndex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',


    },
    text1: {
        flex: 1,
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    requestButton: {
        flex: 1,
        margin: 10,
        backgroundColor: '#616161',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-around',

    },
    t1: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 30
    },
});
export class HomeTab extends Component {
    constructor(props){
        super(props)
        this.navigation = this.props.navigation
        this.handleClick = () => {this.navigation.navigate('FillExamDetails')}
        this.handleClick = this.handleClick.bind(this)
        const lang = props.lang
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upperHalf}>

                    <Text style={styles.text1}>
                        Welcome.
                    </Text>
                </View>

                <View style={styles.lowerHalf} onTouchStart={this.handleClick}>
                    <TouchableOpacity style={styles.requestButton}>
                        <Text style={styles.t1}>
                            Request Scribe
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}

const selectUserSettings = (state) => ({lang: state.userAppSettings.lang})



export default connect(selectUserSettings)(HomeTab)
