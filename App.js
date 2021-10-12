/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import 'react-native-gesture-handler'

import React, { Component } from 'react'

import Splash from './screens/SplashScreen'
import SelectLanguage from './screens/SelectLanguage'
import SelectRole from './screens/SelectRole'
import Login from './screens/Login'
import FillInfo from './screens/FillInfo'
import EnterMobile from './screens/EnterMobile'
import EnterOTP from './screens/EnterOTP'
import VolunteerPreference from './screens/VolunteerPreference'
import UploadDoc from './screens/UploadDoc'
import Home from './screens/Home'
import FillExamDetails from './screens/FilllExamDetails'
import UploadExamDoc from './screens/UploadExamDoc'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore' // <- needed if using firestore
import userAppSettingsReducer from './reducers/userAppSettingsReducer';
import { createStore, combineReducers, compose } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import ShowMatches from './screens/ShowMatches';
import priorityReducer from './reducers/priorityReducer';
import ScribePage from './screens/ScribePage';
import RequestPageA from './screens/RequestPageA';
import RequestPageB from './screens/RequestPageB';
import RequestPageC from './screens/RequestPageC';
import RequestPageForScribePendingRequest from './screens/RequestPageForScribePendingRequest'
import RequestPageForScribeOwnRequest from './screens/RequestPageForScribeOwnRequest'
import RequestsB from './screens/RequestsB'
import RequestsA from './screens/RequestsA'
import RequestsC from './screens/RequestsC'
import CancelRequest from './screens/CancelRequest'
// react-redux-firebase 
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}



// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  userAppSettings: userAppSettingsReducer,
  priority: priorityReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
export const store = createStore(rootReducer, initialState)

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

// firebase.firestore().settings({ experimentalForceLongPolling: true })

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 'en'
    }
    this.changeLang = this.changeLang.bind(this)
  }
  changeLang(newLang) {
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
              <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
              <Stack.Screen name="SelectLanguage" component={SelectLanguage} options={{ headerShown: false }} />
              <Stack.Screen name="SelectRole" component={SelectRole} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="FillInfo" component={FillInfo} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="EnterMobile" component={EnterMobile} options={{ headerShown: false }} />
              <Stack.Screen name="UploadDoc" component={UploadDoc} options={{ headerShown: false }} />
              <Stack.Screen name="VolunteerPreference" component={VolunteerPreference} options={{ headerShown: false }} />
              <Stack.Screen name="EnterOTP" component={EnterOTP} options={{ headerShown: false }} />
              <Stack.Screen name="UploadExamDoc" component={UploadExamDoc} options={{ headerShown: false }} />
              <Stack.Screen name="FillExamDetails" component={FillExamDetails} options={{ headerShown: false }} />
              <Stack.Screen name="ShowMatches" component={ShowMatches} options={{ headerShown: false }} />
              <Stack.Screen name="ScribePage" component={ScribePage} options={{ headerShown: false }} />
              <Stack.Screen name="RequestPageA" component={RequestPageA} options={{ headerShown: false }} />
              <Stack.Screen name="RequestPageB" component={RequestPageB} options={{ headerShown: false }} />
              <Stack.Screen name="RequestPageC" component={RequestPageC} options={{ headerShown: false }} />
              <Stack.Screen name="RequestsA" component={RequestsA} options={{ headerShown: false }} />
              <Stack.Screen name="RequestsB" component={RequestsB} options={{ headerShown: false }} />
              <Stack.Screen name="RequestsC" component={RequestsC} options={{ headerShown: false }} />
              <Stack.Screen name="CancelRequest" component={CancelRequest} options={{ headerShown: false }} />
              <Stack.Screen name="RequestPageForScribeOwnRequest" component={RequestPageForScribeOwnRequest} options={{ headerShown: false }} />
              <Stack.Screen name="RequestPageForScribePendingRequest" component={RequestPageForScribePendingRequest} options={{ headerShown: false }} />
              
            </Stack.Navigator>
          </NavigationContainer>
        </ReactReduxFirebaseProvider>
      </Provider>

    )
  }
}

export default App
