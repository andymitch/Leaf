import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// AUTH COMPONENTS
import LoginRegister from './components/LoginRegister'
import ForgotPassword from './components/ForgotPassword'
import deviceStorage from './deviceStorage'
// MAIN COMPONENTS
import Preview from './components/Preview'
import Main from './components/Main'
import ChatView from './components/ChatView'
import ChangePass from './components/ChangePass'
import ChangeName from './components/ChangeName'
import ChangeUser from './components/ChangeUser'
import Settings from './components/Settings'


// HIDE WARNINGS
console.disableYellowBox = true

// LOGIN NAVIGATION
const authNav = createStackNavigator({
  Login: { screen: props => <LoginRegister {...props} {...this.props} /> },
  Forgot: { screen: props => <ForgotPassword {...props} {...this.props} /> }
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
  mode: 'modal'
})

// ROOT NAVIGATION
const mainNav = createStackNavigator({
  Main: { screen: props => <Main {...props} {...this.props} /> },
  Chat: { screen: props => <ChatView {...props} {...this.props} /> },
  Preview: { screen: props => <Preview {...props} {...this.props} /> },
  Settings: { screen: props => <Settings {...props} {...this.props} /> },
  ChangePass: { screen: props => <ChangePass {...props} {...this.props} /> },
  ChangeName: { screen: props => <ChangeName {...props} {...this.props} /> },
  ChangeUser: { screen: props => <ChangeUser {...props} {...this.props} /> }
}, {
  initialRouteName: 'Main',
  headerMode: 'none',
  mode: 'modal'
});

// EXPORT APP

const AuthContainer = createAppContainer(authNav)
const MainContainer = createAppContainer(mainNav)
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
      theme: 'light',
      loading: true
    }

    this.setToken = this.setToken.bind(this)
    this.getToken = deviceStorage.getToken.bind(this)
    this.deleteToken = deviceStorage.deleteToken.bind(this)
    this.setTheme = this.setTheme.bind(this)
    this.getTheme = deviceStorage.getTheme.bind(this)
    this.getTheme()
    this.getToken()
  }

  setToken(token) {
    deviceStorage.set('token', token)
    this.setState({ token: token })
  }
  setTheme(theme) {
    deviceStorage.set('theme', theme)
    this.setState({ theme: theme })
    console.log('Theme set to: ' + theme)
  }

  render() {
    if (this.state.loading) return <View style={{ flex: 1, backgroundColor: this.state.theme === 'dark' ? '#151515' : 'white' }} />
    if (this.state.token === '') {
      console.log('auth...')
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle={this.state.theme === 'dark' ? 'light-content' : 'dark-content'}/>
          <AuthContainer screenProps={{token: this.state.token, setToken: this.setToken}} />
        </View>
      )
    }
    console.log('main...')
    return (
      <View style={{flex: 1}}>
          <StatusBar barStyle={this.state.theme === 'dark' ? 'light-content' : 'dark-content'}/>
          <MainContainer screenProps={{token: this.state.token, setToken: this.setToken, deleteToken: this.deleteToken, theme: this.state.theme, setTheme: this.setTheme}}/>
      </View>
    )
  }
}
