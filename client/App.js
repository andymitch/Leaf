import React, {Component} from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

// COMPONENTS
import LoginRegister from './components/LoginRegister'
import ForgotPassword from './components/ForgotPassword'
import CameraView from './components/CameraView'
import Main from './components/Main'

// HIDE WARNINGS
console.disableYellowBox = true

// ROOT NAVIGATION
const rootNav = createStackNavigator({
  LoginRegister: LoginRegister,
  ForgotPass: ForgotPassword,
  Camera: CameraView,
  Main: Main
},{
  initialRouteName: 'Main',
  headerMode: 'none'
});

// EXPORT APP
const AppContainer = createAppContainer(rootNav)
export default class App extends Component{ render(){ return <AppContainer/> } }
