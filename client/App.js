import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, StatusBar} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginRegister from './components/LoginRegister';
import {styles} from './style'


export default class App extends Component{ render(){ return <AppContainer/> } }

const AuthenticationNavigator = createStackNavigator({
  Login: LoginRegister,
  //ForgotPassword: ForgotPasswordScreen,
});

const AppNavigator = createSwitchNavigator({
  Auth: AuthenticationNavigator,
  //Home: HomeScreen,
});

const AppContainer = createAppContainer(AppNavigator);