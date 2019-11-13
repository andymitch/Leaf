import React, {Component} from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

// COMPONENTS
import LoginRegister from './components/LoginRegister'
import ForgotPassword from './components/ForgotPassword'
import FeedCard from './components/FeedCard'
// MAIN APP COMPONENTS
//import Feed from './components/Feed'
import CameraView from './components/CameraView'
import CameraPreview from './components/CameraPreview'
import Main from './components/Main'

// HIDE WARNINGS
console.disableYellowBox = true

// ROOT NAVIGATION
const rootNav = createStackNavigator({
  Login: LoginRegister,
  Forgot: ForgotPass,
  Camera: CameraView,
  Preview: CameraPreview,
  Main: Main
},{
  initialRouteName: 'Main',
  headerMode: 'none',
  mode: 'modal'
});

// EXPORT APP
const AppContainer = createAppContainer(rootNav)
export default class App extends Component{ render(){ return <AppContainer/> } }
