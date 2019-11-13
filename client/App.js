import React, {Component} from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

//AUTH TOKEN
import {AUTH_TOKEN} from './components/LoginRegister'

// AUTHENTICATION COMPONENTS AND TOKENS
import LoginRegister from './components/LoginRegister'
import ForgotPassword from './components/ForgotPassword'
import Post from './components/Post'
// MAIN APP COMPONENTS
//import Feed from './components/Feed'
import CameraView from './components/CameraView'
import CameraPreview from './components/CameraPreview'
//import Messages from './components/Messages'
//import Settings from './components/Settings'
//import Profile from './components/Profile'
//import FullSearch from './components/FullSearch'


// ROOT NAVIGATION
const Nav = createStackNavigator({
  LoginRegister: {screen: LoginRegister},
  ForgotPass: {screen: ForgotPassword},
  //Feed: Feed,
  CameraView: CameraView,
  CameraPreview: CameraPreview,
  //Messages: Messages,
  //Settings: Settings,
  //Profile: {screen: Profile, path: },
  //FullSearch: FullSearch
},{
  initialRouteName: 'LoginRegister',
  headerMode: 'none'
});

// EXPORT APP
const AppContainer = createAppContainer(Nav)
export default class App extends Component{ render(){ return <AppContainer/> } }
