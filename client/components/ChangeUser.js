import React, {Component} from 'react'
import {Button, TextInput, View, TouchableOpacity, FlatList, Text} from 'react-native'
import { styles } from '../styles/style'
import Axios from 'axios'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'


import { LIGHT, DARK } from '../colorTheme'

const validUsername = /^[a-z][a-z0-9_]{4,18}$/gm

export class ChangeUser extends Component{
  state = {
    current: '',
    goodUsername: false,
    username: '',
    theme: this.props.screenProps.theme == 'dark' ? DARK : LIGHT
  }
  validateUsername = async str => {
      this.setState({ username: str })
      console.log(str)
      if (str.match(validUsername)) {
          await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/check-username', { username: str })
              .then(res => { console.log(res.data.body); this.setState({ goodUsername: res.data.body }) })
              .catch(err => console.log(err));
      } else this.setState({ goodUsername: false })
  }
  _navigateBack = () => {
		const { navigation } = this.props
		navigation.navigate('Settings');
	}
  submit = async () => {
    await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/change-username', {
      current: this.state.current,
      username: this.state.username,
      token: this.props.screenProps.token
    }).then(res => {
      console.log(AUTH_TOKEN)
        if(res.data.body==true){
          console.log("username changed")
          alert("Your username has been changed.")
          this._navigateBack()
        }
        else{
          console.log("not changed")
          alert("Your current password was incorrect. Please try again.")
          this._navigateBack()
        }
    }).catch(err => console.log('Problem with changing username: ' + err));
  }
  Form = () => {
      return (
          <View style={{ flex: 1, justifyContent: 'center'}}>
              <Text style={[{left: 30, fontSize: 17}, this.state.theme.text]}>Change Username</Text>
              <TextInput
                  onChangeText={current => this.setState({current: current})}
                  style={[styles.input2, this.state.theme.text, { borderBottomColor: this.state.passStrength }]}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  placeholder='Current password'
                  placeholderTextColor='#999'
                  returnKeyType='next'
                  textContentType='password' />
              <TextInput
                  onChangeText={username => this.validateUsername(username)}
                  style={[styles.input2, this.state.theme.text]}
                  placeholder='New Username'
                  placeholderTextColor='#999'
                  autoCapitalize='none'
                  textContentType='username' />
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
            <View style={styles.change}>
              <this.Form/>
            </View>
          </View>
        )
    }
}
export default ChangeUser
