import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Switch, Image, TouchableHighlight, StatusBar, ImageBackground} from 'react-native'
import {styles} from '../styles/style';


export default class ForgotPassword extends Component{

state = {
  recovery_email : ''
}

  render() {
    return(
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text>Enter your recovery e-mail address:</Text>
        <TextInput
            onChangeText={recovery_email => this.setState({recovery_email: recovery_email})}
            style={styles.input}
            autoCapitalize='none'
            placeholder='e-mail address'
            placeholderTextColor='#999'
            returnKeyType='done'
            textContentType='emailAddress'
        />
        <Button style={styles.btn} title="Submit" onPress={() => this.props.navigation.pop()}/>
      </View>
    )
  }
}
