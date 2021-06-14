/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import 'react-native-gesture-handler';

import React, { Component } from 'react'
import Splash from './screens/SplashScreen'
import SelectLanguage from './screens/SelectLanguage'
import SelectRole from './screens/SelectRole'
import LoginOrSignUp from './screens/LoginOrSignUp'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import FillInfo from './screens/FillInfo'
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
  constructor(props) {
    super(props)
    this.state = {
      lang: 'en'
    }
    this.changeLang = this.changeLang.bind(this)
  }
  changeLang(newLang){
    this.setState({
      lang: newLang
    })
  }
  render() {
    return (
      <NavigationContainer style={styles.root}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
          <Stack.Screen name="SelectLanguage" component={SelectLanguage} initialParams={{changeLang: this.changeLang }} options={{ headerShown: false }} />
          <Stack.Screen name="SelectRole" component={SelectRole} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
          <Stack.Screen name="LoginOrSignUp" component={LoginOrSignUp} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
          <Stack.Screen name="FillInfo" component={FillInfo} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
          
        </Stack.Navigator>
      </NavigationContainer>
      
    )
  }
}

export default App
