import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
function News() {
    const lang = useSelector(state => state.userAppSettings.lang)
    return (
        <Text>News!!!</Text>
    )
}

export default News
