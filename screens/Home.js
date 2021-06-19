import React, { Component } from 'react'
import { NativeModules, NativeEventEmitter } from 'react-native';

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
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.centered}>
                    <Text>Yo</Text>
                </View>
            </View>            

        )
    }
}

export default Home
