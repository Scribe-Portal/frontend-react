import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
        justifyContent: 'center',
        
        
    },
    centered: {
        flex: 1,
        margin: 20,

    },
})



export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isItAScribe: "don\'t know"
        }
        this.gotScribeStatus = this.gotScribeStatus.bind(this)
    }
    gotScribeStatus(newState) {
        this.setState({
            isItAScribe: newState
        })
    }
    render() {
        const { uid } = this.props.route.params;

        firebase.firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.gotScribeStatus(doc.isItAScribe)
            });
        });
        
        return (
            <View style={styles.container}>
                <View style={styles.centered}>
                    <Text>Yo {uid} {this.state.isItAScribe} </Text>
                </View>
            </View>            

        )
    }
}

export default Home
