import React, {Component} from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

// COMPONENTS
import LoginRegister from './components/LoginRegister'
import ForgotPassword from './components/ForgotPassword'
import FeedCard from './components/FeedCard'
import Settings from './components/Settings'
import ChangePass from './components/ChangePass'
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
  Forgot: Settings,
  Camera: CameraView,
  Preview: CameraPreview,
  Main: Main,
  ChangePass: ChangePass
},{
  initialRouteName: 'Login',
  headerMode: 'none',
  mode: 'modal'
});

// EXPORT APP
const AppContainer = createAppContainer(rootNav)
export default class App extends Component{ render(){ return <AppContainer/> } }
