import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Switch, Image, TouchableHighlight, TouchableOpacity, StatusBar, ImageBackground} from 'react-native'
import {styles} from '../styles/style';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'

const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
const validPhone = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g



export default class ForgotPassword extends Component{


  state = {
    email : '',
    phone: '',
    goodEmailPhone: false,
    isPhone: false,
  }


  submit = async () => {
    if(this.state.isPhone){
      await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/forgot-password', {
        email: null,
        phone: this.state.email_phone
      }).then(res => {
          if(res.data==true){
            console.log("IS USER")
          }
          else{
            console.log("NOT USER")
          }
      }).catch(err => console.log('Problem with forgot password: ' + err));
    }
    else{
      await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/forgot-password', {
        email: this.state.email_phone,
        phone: null
      }).then(res => {
          if(res.data==true){
            console.log("IS USER")
          }
          else{
            console.log("NOT USER")
          }
      }).catch(err => console.log('Problem with forgot password: ' + err));
    }
  }

  validateEmailPhone = str => {
      this.setState({email_phone: str})
      if(str.match(validEmail)) {this.setState({goodEmailPhone: true, isPhone: false}); console.log('valid email')}
      else if(str.match(validPhone)) {this.setState({goodEmailPhone: true, isPhone: true}); console.log('valid phone number')}
      else {this.setState({goodEmailPhone: false}); console.log('not valid email or phone')}
  }

  render() {
    return(
      <View style={[styles.container,{flexDirection: "column"},]}>
        <ImageBackground source={require('../assets/img/leaf_background.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{zIndex: 1,top:50,alignSelf: "flex-start"}}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Icon icon={faArrowLeft} style={{color: 'white'}} size={30}/>
            </TouchableOpacity>
        </View>
          <View style={[styles.login,{width: 300},{marginRight: 50}]}>
            <Text>Enter e-mail or phone #</Text>
            <TextInput
                onChangeText={email_phone => this.validateEmailPhone(email_phone)}
                style={styles.inputCenter}
                autoCapitalize='none'
                placeholder='Email or phone'
                placeholderTextColor='#999'
                returnKeyType='done'
                textContentType='none'
            />
            <Button style={styles.btn} title="Submit" onPress={() => this.submit()}/>
          </View>
        </ImageBackground>
      </View>
    )
  }
}
