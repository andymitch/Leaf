import React, {Component} from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

// COMPONENTS
import LoginRegister from './components/LoginRegister'
import ForgotPassword from './components/ForgotPassword'
// MAIN APP COMPONENTS
import Preview from './components/Preview'
import Main from './components/Main'
import ChatView from './components/ChatView'
import ChangePass from './components/ChangePass'
import ChangeName from './components/ChangeName'
import ChangeUser from './components/ChangeUser'
import Settings from './components/Settings'


// HIDE WARNINGS
console.disableYellowBox = true

// ROOT NAVIGATION
const rootNav = createStackNavigator({
  Login: LoginRegister,
  Forgot: ForgotPassword,
  Preview: Preview,
  Main: Main,
  Chat: ChatView,
  Settings: Settings,
  ChangePass: ChangePass,
  ChangeName: ChangeName,
  ChangeUser: ChangeUser
},{
  initialRouteName: 'Login',
  headerMode: 'none',
  mode: 'modal'
});

// EXPORT APP
const AppContainer = createAppContainer(rootNav)
export default class App extends Component{ render(){ return <AppContainer/> } }
