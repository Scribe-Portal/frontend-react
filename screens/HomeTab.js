/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';

import { compose } from 'redux';
import { firestoreConnect, isEmpty, isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { store } from '../App';
import { removeAll } from '../reducers/priorityReducer';
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
    removeText:{
        fontWeight: '700',
        fontSize: 10,
    },
    removeBox:{
        alignItems: 'flex-end',
        
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
    textA: {
        color: "#3C8C88",
        
        fontSize: 16,
        fontWeight : '700',
        textAlign: 'center',
        
    },
    textB: {
        color: "#923737",
        fontSize: 16,
        fontWeight : '700',
        textAlign: 'center',
    },
    textC: {
        color: "#9E6E12",
        fontSize: 16,
        fontWeight : '700',
        textAlign: 'center',
    },
    requestA:{
        backgroundColor: "#BFE9E7",
        paddingHorizontal: 16,
        paddingVertical: 25,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    requestB:{
        paddingHorizontal: 16,
        paddingVertical: 25,
        backgroundColor:"#FDF1DB",
        marginHorizontal: 30,
        marginVertical: 12,
    },
    requestC:{
        paddingHorizontal: 16,
        paddingVertical: 25,
        backgroundColor: "#FCC8D7",
        marginHorizontal: 30,
        marginVertical: 12,
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
function Requests({uid}){
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
                Loading...
            </Text>
        )

    }
    if (isEmpty(requests)){
        return (
            <Text>
                No Requests
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
        
        this.handleClick = () => { 
            // props.removeAll()
            this.navigation.navigate('FillExamDetails')
        }
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

                    <View style={styles.lowerHalf} onTouchStart={this.handleClick}>
                        <TouchableOpacity style={styles.requestButton}>
                            <Text style={styles.t1}>
                                Request Scribe
                            </Text>
                        </TouchableOpacity>

                    </View>
                    {/* <Requests uid={this.props.auth.uid}/> */}
                    <TouchableOpacity style={styles.requestA} onPress={()=>{
                        this.navigation.navigate('RequestsA')
                    }}>
                        <Text style = {styles.textA}>Volunteer Search Successful</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.requestB} onPress={()=>{
                        this.navigation.navigate('RequestsB')
                    }}>
                        <Text style = {styles.textC}>Pending Requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.requestC} onPress={()=>{
                        this.navigation.navigate('RequestsC')
                    }}>
                        <Text style = {styles.textB}>Volunteer Search Failed</Text>
                    </TouchableOpacity>
                    

                </View>
            </ScrollView>
        )
    }
}



export default compose(
    connect((state) => ({
        auth: state.firebase.auth, 
        lang: state.userAppSettings.lang
    }),
        { removeAll }
    ),
    firestoreConnect((props) => ([{
        collection: 'requests',
        where: [['uid', '==', props.auth.uid]],

    }])),

)(HomeTab)
