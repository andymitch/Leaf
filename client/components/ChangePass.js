import React, {Component} from 'react'
import {Button, TextInput, View, FlatList, Text} from 'react-native'
import { styles } from '../styles/style'

const validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
const validUsername = /^[a-z][a-z0-9_]{4,18}$/gm
export class ChangePass extends Component{
  state = {
    password: '',
    goodPass: false,
    again_password: '',
    againPassStrength: 'grey',
    goodAgainPass: false
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
    alert("pressed the button")
    // await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/change-password', {
    //   password: this.state.password
    // }).then(res => {
    //     if(res.data==true){
    //       console.log("pass changed")
    //       alert("Your password has been changed.")
    //     }
    //     else{
    //       console.log("not changed")
    //       alert("Password not updated.")
    //     }
    // }).catch(err => console.log('Problem with changing password: ' + err));
  }
  Form = () => {
      return (
          <View style={{ flex: 1, justifyContent: 'center'}}>
              <Text style={{left: 30, fontSize: 17}}>Change Password</Text>
              <TextInput
                  onChangeText={pass => this.validatePassword(pass, false)}
                  style={[styles.input2, { borderBottomColor: this.state.passStrength }]}
                  autoCapitalize='none'
                  secureTextEntry={this.state.hidePassword}
                  placeholder='New Password'
                  placeholderTextColor='#999'
                  returnKeyType='next'
                  textContentType='password' />
              <Button style={styles.btn} title="SUBMIT" onPress={() => this.submit()} />

          </View>
      )
  }
    render(){
        return(
          <View style={styles.change}>
            <this.Form/>
          </View>
        )
    }
}
export default ChangePass
