import React, { Component } from 'react'
import { NativeModules, NativeEventEmitter } from 'react-native';
const { RNLiveAudioStream } = NativeModules;
const EventEmitter = new NativeEventEmitter(RNLiveAudioStream);

const options = {
    sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only (see below)
    bufferSize: 4096    // default is 2048
};

RNLiveAudioStream.init(options);

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
    callButtonGreen: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "green"
    },
    callButtonRed: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "red"
    }
})



export class AudioCall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onCall: true,
        }
        this.changeCallState = this.changeCallState.bind(this)
    }
    changeCallState() {
        this.setState({
            onCall: !this.state.onCall,
        })
    }
    startCall() {
        RNLiveAudioStream.start()
        EventEmitter.removeAllListeners('data')
        EventEmitter.addListener('data', voiceData => {
            
        })
        this.changeCallState()
    }
    endCall() {

        this.changeCallState()
        RNLiveAudioStream.stop()
        EventEmitter.removeAllListeners('data')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.centered}>
                    <TouchableOpacity style={this.state.onCall ? styles.callButtonRed : styles.callButtonGreen}
                        onPress={this.state.onCall ? endCall : this.startCall }
                    >
                        <Text>Call</Text>
                    </TouchableOpacity>
                </View>
            </View>            

        )
    }
}

export default AudioCall
