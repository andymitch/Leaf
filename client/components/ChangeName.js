import React, {Component} from 'react'
import {Button, TextInput, TouchableOpacity, View, Text} from 'react-native'
import { styles } from '../styles/style'
import Axios from 'axios'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

export class ChangeName extends Component{
  state = {
    current: '',
    name: '',
  }

  submit = async () => {
    await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/change-name', {
      name: this.state.name,
      current: this.state.current
    }).then(res => {
        if(res.data==true){
          console.log("name changed")
          alert("Your name has been changed.")
          this.props.navigation.goBack()
        }
        else{
          console.log("not changed")
          alert("Your current password was incorrect. Please try again.")
          this.props.navigation.goBack()
        }
    }).catch(err => console.log('Problem with changing name: ' + err));
  }

  Form = () => {
      return (
          <View style={{ flex: 1, justifyContent: 'center'}}>
              <Text style={{left: 42, fontSize: 17}}>Change Name</Text>
              <TextInput
                  onChangeText={current => this.setState({current: current})}
                  style={styles.input2}
                  autoCapitalize='none'
                  secureTextEntry='true'
                  placeholder='Current password'
                  placeholderTextColor='#999'
                  returnKeyType='next'
                  textContentType='password' />
              <TextInput
                  onChangeText={name => this.setState({ name: name })}
                  style={styles.input2}
                  autoCompleteType='name'
                  autoCapitalize='words'
                  placeholder='New Name'
                  placeholderTextColor='#999'
                  textContentType='name' />
              <Button style={styles.btn} title="SUBMIT" onPress={() => this.submit()} />

          </View>
      )
  }
    render(){
        return(
          <View style={{flex: 1, flexDirection: "column"}}>
            <View style={{zIndex: 1,top:50,alignSelf: "flex-start"}}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                    <Icon icon={faArrowLeft} style={{color: 'black'}} size={30}/>
                </TouchableOpacity>
            </View>
            <View style={styles.change}>
              <this.Form/>
            </View>
          </View>
        )
    }
}
export default ChangeName
