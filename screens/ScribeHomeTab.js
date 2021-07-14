/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';

import { firestoreConnect, isEmpty, isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { isPlainObject } from '@reduxjs/toolkit';


// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
    },
    text1: {
        flex: 1,
        color: "#828282",
        fontSize: 30,
        fontWeight: '700',
    },
    text2: {
        flex: 1,
        padding: 20,
        color: "#828282",
        fontSize: 20,
        fontWeight: '500',
    },
    removeText:{
        fontWeight: '700',
        fontSize: 10,
    },
    removeBox:{
        alignItems: 'flex-end',
        
    },
    upperHalf: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerHalf: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-around'
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
    
    requestBox: {
        backgroundColor: "#D4D4D4",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    requestRoot:{
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: "#616161",
    },
    myRequests:{
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderWidth: 3,
        borderColor: "green",
    },
    examName: {
        
    },
    examDate: {
        
    }
});

function Request({req_id, uid, requestType}) {
    const request = (requestType==="my") ? useSelector(({firestore: { data }})=> data.myRequests && data.myRequests[req_id]) :  useSelector(({firestore: { data }})=> data.pendingRequests && data.pendingRequests[req_id]);
    const navigation = useNavigation()
    const firestore = useFirestore()
    if (request) {
        
        return (
            <View style={
                (requestType === "my")
                ?
                styles.myRequests
                :
                styles.requestRoot}>
    
                <TouchableOpacity style={styles.requestBox} onPress={() => navigation.navigate((requestType==="my")?"RequestPageForScribeActive":"RequestPageForScribe", {req_id: req_id, uid: uid})}>
                    <Text style={styles.examName}>{request.examName}</Text>
                    <Text style={styles.examDate}>{request.examDate}</Text>
                </TouchableOpacity>
            </View>
    
        )
    }
    else {
        return null;
    }
}
function Requests({uid}){
    useFirestoreConnect([
        {
            collection: `requests`,
            where: [['status','==', 'pending']],
            storeAs: 'pendingRequests'
        }
    ])
    const requests = useSelector(state => state.firestore.data.pendingRequests)
    if (!isLoaded(requests)){
        return (
            <Text style={styles.text2}>
                Loading...
            </Text>
        )

    }
    if (isEmpty(requests)){
        return (
            <Text style={styles.text2}>
                No Requests available
            </Text>
        )
    }
    console.log(requests)
    return Object.keys(requests).map((id, ind) => {
        
        
        if (requests[id]){
            return <Request requestType="ordinary" req_id={id} uid={uid} key={`${ind}-${id}`}/>
        }
        else {
            return null
        }
    
    })
}
function MyRequests({uid}){
    useFirestoreConnect([
        {
            collection: `requests`,
            where: [['volunteer','==', uid]],
            storeAs: 'myRequests'
        }
    ])
    const requests = useSelector(state => state.firestore.ordered.myRequests)
    if (!isLoaded(requests)){
        return (
            <Text style={styles.text2}>
                Loading...
            </Text>
        )

    }
    if (isEmpty(requests)){
        return (
            <Text style= {styles.text2}>
                No Requests assigned to you.
            </Text>
        )
    }
    console.log(requests)
    return Object.keys(requests).map((id, ind) => {
        if (requests[id]) return <Request requestType = "my" req_id={id} uid={uid} key={`${ind}-${id}`}/>
        else return null;
    })
}
export class ScribeHomeTab extends Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation
        this.handleClick = () => { this.navigation.navigate('FillExamDetails') }
        this.handleClick = this.handleClick.bind(this)
        const lang = props.lang
    }

    render() {
        return (
            <ScrollView>

                <View style={styles.container}>
                    <View style={styles.upperHalf}>

                        <Text style={styles.text1}>
                            Welcome.
                        </Text>
                    </View>

                    <View style={styles.lowerHalf} >
                        <MyRequests uid = {this.props.auth.uid}/>
                        <Requests uid={this.props.auth.uid}/> 
                    </View>

                </View>
            </ScrollView>
        )
    }
}



export default connect((state) => ({
    auth: state.firebase.auth, 
    lang: state.userAppSettings.lang
}))(ScribeHomeTab)
