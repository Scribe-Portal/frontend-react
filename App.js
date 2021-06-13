/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import 'react-native-gesture-handler';

import React, { Component } from 'react'
import Splash from './screens/SplashScreen';
import SelectLanguage from './screens/SelectLanguage';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  root: {
    fontFamily: 'RobotoMono-SemiBold',
    flex: 1,
  },
});

const Stack = createStackNavigator()

export class App extends Component {
  render() {
    return (
      <NavigationContainer style={styles.root}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="SelectLanguage" component={SelectLanguage} options={{ headerShown: false }} />
          
        </Stack.Navigator>
      </NavigationContainer>
      
    )
  }
}

export default App
