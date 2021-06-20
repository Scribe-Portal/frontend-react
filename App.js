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
import EnterMobile from './screens/EnterMobile'
import EnterOTP from './screens/EnterOTP'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore

import { createStore, combineReducers, compose } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

firebase.initializeApp({
  apiKey: "AIzaSyC5NOMhO8GCjF5v5HikigBQQ88cB7KDXQI",
  authDomain: "scribe-portal-nss.firebaseapp.com",
  projectId: "scribe-portal-nss",
  storageBucket: "scribe-portal-nss.appspot.com",
  messagingSenderId: "380046350969",
  appId: "1:380046350969:web:20c0098e2ca972762412a8",
  measurementId: "G-QL9YXM3SMT"
})

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}



// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

const styles = StyleSheet.create({
  root: {
    fontFamily: 'RobotoMono-SemiBold',
    flex: 1,
  },
});

firebase.firestore().settings({experimentalForceLongPolling: true})

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
      <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <NavigationContainer style={styles.root}>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            <Stack.Screen name="SelectLanguage" component={SelectLanguage} initialParams={{changeLang: this.changeLang }} options={{ headerShown: false }} />
            <Stack.Screen name="SelectRole" component={SelectRole} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            <Stack.Screen name="LoginOrSignUp" component={LoginOrSignUp} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            <Stack.Screen name="FillInfo" component={FillInfo} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            <Stack.Screen name="EnterMobile" component={EnterMobile} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            <Stack.Screen name="EnterOTP" component={EnterOTP} options={{ headerShown: false }} initialParams={{lang: this.state.lang}} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </ReactReduxFirebaseProvider>
    </Provider>
      
    )
  }
}

export default App
