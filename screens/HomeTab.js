/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';

import { compose } from 'redux';
import { firestoreConnect, isEmpty, isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Loading, NoRequests, RequestAScribe, RequestScribe_text } from '../translations';


// hi
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
    },
    inner_container: {
        flexGrow: 1,
        
        
    },
    text1: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: '700',
    },
    lowerHalf: {
        
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,

    },
    removeText:{
        fontWeight: '700',
        fontSize: 10,
    },
    removeBox:{
        alignItems: 'flex-end',
        
    },
    requestButton: {
        
        marginHorizontal: 10,
        backgroundColor: '#19939A',
        borderRadius: 10,
        
        padding: 40,
        alignItems: 'center',
        

    },
    t1: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 50,
        textAlign: "center",
        
        
    },
    
    requestBox: {
        backgroundColor: "#B4E2DF",
        flexDirection: "row",
        marginVertical: 30,
        justifyContent: 'space-between'
    },
    requestRoot:{
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: "#19939A",
    },
    examName: {
        
    },
    examDate: {
        
    }
});

function Request({req_id}) {
    const request = useSelector(({firestore: { data }})=> data.requests && data.requests[req_id])
    const navigation = useNavigation()
    

    return (
        <View style={styles.requestRoot}>

            <TouchableOpacity style={styles.requestBox} onPress={() => navigation.navigate("RequestPage", {req_id: req_id, })}>
                <Text style={styles.examName}>{request.examName}</Text>
                {/* <Text style={styles.examDate}>{request.examDate.toLocaleStrrin}</Text> */}
            </TouchableOpacity>
        </View>

    )
}
function Requests({uid, lang}){
    useFirestoreConnect([
        {
            collection: 'requests',
            where: [['uid', '==', uid]],

        }
    ])
    const requests = useSelector(state => state.firestore.ordered.requests)
    if (!isLoaded(requests)){
        return (
            <Text style={styles.text1}>
            {Loading[lang]}
            </Text>
        )

    }
    if (isEmpty(requests)){
        return (
            <Text>
                {NoRequests[lang]}
            </Text>
        )
    }
    return requests.map(({id: id}, ind) => (
        <Request req_id={id}  key={`${ind}-${id}`}/>
    ))
}
export class HomeTab extends Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation
        // const { user } = this.props
        this.handleClick = () => {    
            this.navigation.navigate('FillExamDetails')
        }
        this.handleClick = this.handleClick.bind(this)
        
    }
    
    showDialog1 = () => {
        return Alert.alert(
            "Documents",
            "You need to first upload documents by going to \"Upload Documents\" under Settings",
            [
                
                {
                    text: "OK",
                    onPress: () => {
                    }
                }
            ]

        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.inner_container}>

                    <View style={styles.lowerHalf} onTouchStart={this.handleClick}>
                        <TouchableOpacity style={styles.requestButton}>
                            <Text style={styles.t1}>
                               {RequestScribe_text[this.props.lang]}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    

                </ScrollView>
            </View>
        )
    }
}



export default compose(
    connect((state) => ({
        uid: state.userAppSettings.uid, 
        lang: state.userAppSettings.lang
    }),
        
    ),
    firestoreConnect((props) => ([{
        collection: 'requests',
        where: [['uid', '==', (props.uid || "none")]],

    },
    {
        collection: 'users',
        doc: props.uid,
    }])),
    connect((state, props) => ({user: state.firestore.data.users && state.firestore.data.users[props.uid]}))
    

)(HomeTab)
