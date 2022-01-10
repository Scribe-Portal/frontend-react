import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import HomeTab from './HomeTab'
import Settings from './Settings'
import Notifications from './Notification'
import News from './News'
import NewsScribe from './NewsScribe'
import ScribeHomeTab from './ScribeHomeTab'
import { useSelector } from 'react-redux'



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B4E2DF",
    },
    header: {
        flex: 1,
        padding: 10,
        backgroundColor: "orange",
    },
    searchBar: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: "white",
        color: "#858585",
        padding: 7,

    },
    tabView: {
        flex: 1,
        
    }

})

const Tab = createMaterialTopTabNavigator()

function Home({ route, navigation }) {
    let [index, setIndex] = useState(0)
    let [search, setSearch] = useState('')
    const lang = useSelector(state => state.userAppSettings.lang)
    const isItAScribe = useSelector(state => state.userAppSettings.isItAScribe)
    return (
        <View style={styles.container}>
            
                <Tab.Navigator tabBarOptions={{scrollEnabled: true}}>
                    <Tab.Screen name="Home" children={() => isItAScribe?<ScribeHomeTab navigation={navigation}></ScribeHomeTab>:<HomeTab navigation={navigation}></HomeTab>}/>
                    <Tab.Screen name="Status" children={() => isItAScribe?<NewsScribe/>:<News/>}/>
                    
                    <Tab.Screen name="Settings" component={Settings}/>
                </Tab.Navigator>
        </View>
    )
}


export default Home
