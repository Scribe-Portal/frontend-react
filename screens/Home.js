import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Tab, TabView, SearchBar, Icon } from 'react-native-elements'
import HomeTab from './HomeTab'
import Settings from './Settings'
import Notifications from './Notification'
import News from './News'

import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4D4D4",
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


function Home({ route, navigation }) {

    let [index, setIndex] = useState(0)
    let [search, setSearch] = useState('')
    const lang = useSelector(state => state.userAppSettings.lang)
    const profile = useSelector(state => state.firebase.profile)
    // console.log(profile)
    return (
        <View style={styles.container}>
            <SearchBar
                style={styles.searchInput}
                placeholder="Search"
                platform="ios"
                onChangeText={setSearch}
                value={search}
                searchIcon={
                    <Icon name="search" type='font-awesome'/>
                }
            />
            
            <Tab value={index} onChange={setIndex}>
                <Tab.Item title="Home" />
                <Tab.Item title="News" />
                <Tab.Item title="Notifications" />
                <Tab.Item title="Settings" />
            </Tab>

            <TabView value={index} onChange={setIndex} style= {styles.tabView}>
                <TabView.Item>
                    <HomeTab navigation={navigation} />
                </TabView.Item>
                <TabView.Item>
                    <News />
                </TabView.Item>
                <TabView.Item >
                    <Notifications />
                </TabView.Item>
                <TabView.Item >
                    <Settings />
                </TabView.Item>
            </TabView>
        </View>
    )
}


export default Home
