import React, {Component} from 'react'
import {Button, TextInput, TouchableOpacity, View, FlatList, Text} from 'react-native'
import { styles } from '../styles/style'
import Axios from 'axios'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { LIGHT, DARK } from '../colorTheme'


const validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
const validUsername = /^[a-z][a-z0-9_]{4,18}$/gm
export class ChangePass extends Component{
  state = {
    current: '',
    password: '',
    goodPass: false,
    passStrength: 'grey',
    again_password: '',
    againPassStrength: 'grey',
    goodAgainPass: false,
    theme: this.props.screenProps.theme == 'dark' ? DARK : LIGHT
  }
  validatePassword = (pass, isAgain) => {
      if (!isAgain) {
          this.setState({ password: pass })
          if (pass.match(validPass)) this.setState({ passStrength: 'limegreen', goodPass: true })
          else this.setState({ passStrength: 'red', goodPass: false })
      } else {
          this.setState({ again_password: pass })
          if (pass.match(validPass) && pass === this.state.password) this.setState({ againPassStrength: 'limegreen', goodAgainPass: true })
          else this.setState({ againPassStrength: 'red', goodAgainPass: false })
      }
  }
  submit = async () => {
    await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/change-password', {
      current: this.state.current,
      password: this.state.password,
      token: this.props.screenProps.token
    }).then(res => {
        if(res.data.body==true){
          console.log("pass changed")
          alert("Your password has been changed.")
          this.props.navigation.goBack()
        }
        else{
          console.log("not changed")
          alert("Your current password was incorrect. Please try again.")
          this.props.navigation.goBack()
        }
    }).catch(err => console.log('Problem with changing password: ' + err));
  } 
  Form = () => {
      return (
          <View style={{ flex: 1, justifyContent: 'center'}}>
              <Text style={[{left: 30, fontSize: 17}, this.state.theme.text]}>Change Password</Text>
              <TextInput
                  onChangeText={current => this.setState({current: current})}
                  style={[styles.input2, this.state.theme.text, { borderBottomColor: 'grey' }]}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  placeholder='Current password'
                  placeholderTextColor='#999'
                  returnKeyType='next'
                  textContentType='password' />
              <TextInput
                  onChangeText={pass => this.validatePassword(pass, false)}
                  style={[styles.input2, this.state.theme.text, { borderBottomColor: this.state.passStrength }]}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  placeholder='New Password'
                  placeholderTextColor='#999'
                  returnKeyType='next'
                  textContentType='password' />
              <Button style={[styles.btn, this.state.theme.text]} title="SUBMIT" onPress={() => this.submit()} />

          </View>
      )
  }
    render(){
        return(
          <View style={[{flex: 1, flexDirection: "column"}, this.state.theme.container]}>
            <View style={{zIndex: 1,top:50,alignSelf: "flex-start"}}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                    <Icon icon={faArrowLeft} style={this.state.theme.icon} size={30}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.change, {backgroundColor: 'rgba(240,240,240,.5)'}]}>
              <this.Form/>
            </View>
          </View>
        )
    }
}
export default ChangePass
