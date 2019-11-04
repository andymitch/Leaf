import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Switch, Image, TouchableHighlight, TouchableOpacity, StatusBar, ImageBackground} from 'react-native'
import {styles} from '../styles/style';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'


export default class ForgotPassword extends Component{

state = {
  recovery_email : ''
}

  render() {
    return(
      <View style={[styles.container,{flexDirection: "column"},]}>
        <ImageBackground source={require('../assets/img/leaf_background.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{zIndex: 1,top:50,alignSelf: "flex-start"}}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{backgroundColor: 'red'}}>
                <Icon icon={faArrowLeft} style={{color: 'white'}} size={30}/>
            </TouchableOpacity>
        </View>
          <View style={[styles.login,{width: 300},{marginRight: 50}]}>
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
        </ImageBackground>
      </View>
    )
  }
}
