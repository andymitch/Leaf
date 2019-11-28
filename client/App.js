import React, {Component} from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

// COMPONENTS
import LoginRegister from './components/LoginRegister'
import ForgotPassword from './components/ForgotPassword'
// MAIN APP COMPONENTS
import Camera from './components/Camera'
import Preview from './components/Preview'
import Main from './components/Main'

// HIDE WARNINGS
console.disableYellowBox = true

// ROOT NAVIGATION
const rootNav = createStackNavigator({
  Login: LoginRegister,
  Forgot: ForgotPassword,
  //Camera: Camera,
  Preview: Preview,
  Main: Main
},{
  initialRouteName: 'Login',
  headerMode: 'none',
  mode: 'modal'
});

// EXPORT APP
const AppContainer = createAppContainer(rootNav)
export default class App extends Component{ render(){ return <AppContainer/> } }
