import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
function Notifications() {
    const lang = useSelector(state => state.userAppSettings.lang)
    return (
        <Text>Notifications!!!</Text>
    )
}

export default Notifications
