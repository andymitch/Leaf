import React, {Component} from 'react'
import {Button, Text, View, TextInput, TouchableHighlight, StatusBar, ImageBackground} from 'react-native'
import Axios from 'axios'

//ICONS, STYLES
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import {faLeaf, faTimesCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import {styles} from '../style'

//REGEX
const validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
const validPhone = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g
const validUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/igm

//AUTH TOKEN
export let AUTH_TOKEN = null

//AUTH COMPONENT
export default class LoginRegister extends Component {
    state = {
        newUser: false,
        hidePassword: true,
        goodPass: false,
        goodAgainPass: false,
        goodEmailPhone: false,
        goodUsername: false,
        isPhone: false,
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        again_password: '',
        passStrength: 'grey', // WILL CHANGE TO RED OR GREEN WHEN INPUT CHANGES
        againPassStrength: 'grey'
    }

    validatePassword = (pass, isAgain) => {
        if(!isAgain){
            this.setState({password: pass})
            if(pass.match(validPass)) this.setState({passStrength: 'limegreen', goodPass: true})
            else this.setState({passStrength: 'red', goodPass: false})
        }else{
            this.setState({again_password: pass})
            if(pass.match(validPass) && pass === this.state.password) this.setState({againPassStrength: 'limegreen', goodAgainPass: true})
            else this.setState({againPassStrength: 'red', goodAgainPass: false})
        }
    }

    validateEmailPhone = str => {
        this.setState({email_phone: str})
        if(str.match(validEmail)) {this.setState({goodEmailPhone: true, isPhone: false}); console.log('valid email')}
        else if(str.match(validPhone)) {this.setState({goodEmailPhone: true, isPhone: true}); console.log('valid phone number')}
        else {this.setState({goodEmailPhone: false}); console.log('not valid email or phone')}
    }

    validateUsername = async str => {
        this.setState({username: str})
        console.log(str)
        if(str.match(validUsername)){
            /*
            await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/check-username', {username: str})
            .then(res => this.setState({goodUsername: res.data}))
            .catch(err => console.log(err));
            */
           this.setState({goodUsername: true})
        }else this.setState({goodUsername: false})
    }

    login = async () => {
        if(this.state.newUser){
            if(this.state.isPhone){
                await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/register', {
                    name: this.state.name,
                    username: this.state.username,
                    email: null,
                    phone: this.state.email_phone,
                    password: this.state.password
                }).then(res => {
                    console.log('registered and logged in'),
                    AUTH_TOKEN = res.data,
                    this.props.navigation.navigate('Home')
                }).catch(err => console.log('Problem Registering: ' + err));
            }else{
                await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/register', {
                    name: this.state.name,
                    username: this.state.username,
                    email: this.state.email_phone,
                    phone:  null,
                    password: this.state.password
                }).then(res => {
                    console.log('registered and logged in'),
                    AUTH_TOKEN = res.data,
                    this.props.navigation.navigate('Home')
                }).catch(err => console.log('Problem Registering: ' + err));
            }
        }else{
            console.log('requesting...')
            await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/login', {
                //username: this.state.username,
                //password: this.state.password
                token: null
            })
            .then(res => {
                console.log('logged in'),
                AUTH_TOKEN = res.data.token,
                this.props.navigation.navigate('Home')
            }).catch(err => console.log('Problem Logging in: ' + err));
        }
    }

    // RETURNS EITHER LOGIN OR REGISTER VIEW
    Form = () => {
        const eyecon = this.state.hidePassword ? faEye : faEyeSlash // EYE/EYESLASH ICON
        const checkUsername = this.state.goodUsername ? faCheckCircle : faTimesCircle
        const checkUsernameColor = this.state.goodUsername ? 'dodgerblue' : '#999'
        const checkEmailPhone = this.state.goodEmailPhone ? faCheckCircle : faTimesCircle
        const checkEmailPhoneColor = this.state.goodEmailPhone ? 'dodgerblue' : '#999'

        if(this.state.newUser) return(
            <View style={{flex: 2, justifyContent: 'center'}}>
                <Text>Register</Text>
                <TextInput
                    onChangeText={name => this.setState({name: name})}
                    style={styles.input}
                    autoCapitalize='words'
                    placeholder='Name'
                    placeholderTextColor='#999'
                    textContentType='name'/>
                <TextInput
                    onChangeText={username => this.validateUsername(username)}
                    style={styles.input}
                    placeholder='Username'
                    placeholderTextColor='#999'
                    autoCapitalize='none'
                    textContentType='username'/>
                <TouchableHighlight style={styles.check_username} disabled>
                    <Icon icon={checkUsername} style={{color: checkUsernameColor}} size={20}/>
                </TouchableHighlight>
                <TextInput
                    onChangeText={email_phone => this.validateEmailPhone(email_phone)} 
                    style={styles.input}
                    placeholder='Email or Phone'
                    placeholderTextColor='#999'
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    keyboardType='email-address'/>
                <TouchableHighlight style={styles.check_emailPhone} disabled>
                    <Icon icon={checkEmailPhone} style={{color: checkEmailPhoneColor}} size={20}/>
                </TouchableHighlight>
                <View style={styles.passwordInput}>
                    <TextInput
                        onChangeText={pass => this.validatePassword(pass, false)}
                        style={[styles.input,{borderBottomColor: this.state.passStrength}]}
                        autoCapitalize='none'
                        secureTextEntry={this.state.hidePassword}
                        placeholder='Password'
                        placeholderTextColor='#999'
                        returnKeyType='next'
                        textContentType='password'/>
                    <TouchableHighlight style={styles.eyeconBtn} onPress={() => this.setState(prev => ({hidePassword: !prev.hidePassword}))}> 
                        <Icon icon={eyecon} style={{color: '#999'}} size={24}/>
                    </TouchableHighlight>
                </View>
                <TextInput
                    onChangeText={pass => this.validatePassword(pass, true)}
                    style={[styles.input,{borderBottomColor: this.state.againPassStrength}]}
                    autoCapitalize='none'
                    secureTextEntry={this.state.hidePassword}
                    placeholder='Confirm Password'
                    placeholderTextColor='#999'
                    returnKeyType='go'
                    textContentType='newPassword'/>
            </View>
        )
        return(
            <View style={{flex: 2, justifyContent: 'center'}}>
                <Text>Login</Text>
                <TextInput
                    onChangeText={name => this.setState({name: name})}
                    style={styles.input}
                    autoCapitalize='none'
                    placeholder='Username'
                    placeholderTextColor='#999'
                    returnKeyType='next'
                    textContentType='username'/>
                <View style={styles.passwordInput}>
                    <TextInput
                        onChangeText={password => this.setState({password: password})}
                        style={styles.input}
                        autoCapitalize='none'
                        secureTextEntry={this.state.hidePassword}
                        placeholder='Password'
                        placeholderTextColor='#999'
                        returnKeyType='go'
                        textContentType='password'/>
                    <TouchableHighlight style={styles.eyeconBtn} onPress={() => this.setState(prev => ({hidePassword: !prev.hidePassword}))}> 
                        <Icon icon={eyecon} style={{color: 'gray'}} size={24}/>
                    </TouchableHighlight> 
                </View>
            </View>
        )
    }

    //LOGIN/REGISTER CONTAINER
    render(){
        const otherForm = this.state.newUser ? 'login' : 'register' // LOGIN/REGISTER TEXT LINK
        const loginBtn = this.state.newUser ? 'Register & Login' : 'Login' // LOGIN/REGISTER BUTTON
        const disableBtn = (!this.state.newUser || (this.state.goodPass && this.state.goodAgainPass && this.state.goodEmailPhone && this.state.goodUsername)) ? false : true
         
        if(AUTH_TOKEN){
            this.props.navigation.navigate('Home')
            return null
        }else return(
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <ImageBackground source={require('../assets/img/leaf_background.jpg')} style={{width: '100%', height: '100%'}}>
                    <View style={styles.login}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', bottom: -10}}>
                            <Text>DemBoiz present</Text>
                            <View style={styles.passwordInput}>
                                <Icon icon={faLeaf} size={70}/>
                                <Text style={{fontWeight: 'bold', marginLeft: 10}}>Leaf</Text>
                            </View>
                            <Text style={{fontStyle: 'italic'}}>aka Bootleg Vine!</Text>
                            <Text> </Text>
                        </View>

                        <this.Form/>
                        
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Button style={styles.btn} title={loginBtn} disabled={disableBtn} onPress={() => this.login()}/>
                            <View style={[styles.passwordInput,{width: 200, justifyContent: 'center'}]}>
                                <Text style={{margin: 10, width: 60}} onPress={() => this.setState(prevState => ({newUser: !prevState.newUser}))}>{otherForm}</Text>
                                <Text style={{margin: 10}} onPress={() => {console.log('forgot password'); this.props.navigation.push('ForgotPass')}}>forgot password?</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}