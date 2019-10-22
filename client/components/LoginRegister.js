import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Switch, Image, TouchableHighlight} from 'react-native'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import {faUserCircle, faLock, faLeaf} from '@fortawesome/free-solid-svg-icons'
import {styles} from '../style';

export default class LoginRegister extends Component {
    state = {
        newUser: false,
        hidePassword: true,
        name: '',
        username: '',
        password: '',
        again_password: ''
    }

    Form = () => {
        const eyecon = this.state.hidePassword ? faEye : faEyeSlash
        
        if(this.state.newUser)return(
            <View style={{flex: 2, justifyContent: 'center'}}>
                <Text>Register</Text>
                <TextInput
                    onChangeText={name => this.setState({name: name})}
                    style={styles.input}
                    autoCapitalize='words'
                    placeholder='Name'
                    placeholderTextColor='#999'
                    textContentType='name'
                />
                <TextInput
                    onChangeText={username => this.setState({username: username})}
                    style={styles.input}
                    placeholder='Username'
                    placeholderTextColor='#999'
                    autoCapitalize='none'
                    textContentType='username'
                />
                <View style={styles.passwordInput}>
                    <TextInput
                        onChangeText={password => this.setState({password: password})}
                        style={styles.input}
                        autoCapitalize='none'
                        secureTextEntry={this.state.hidePassword}
                        placeholder='Password'
                        placeholderTextColor='#999'
                        returnKeyType='next'
                        textContentType='password'
                    />
                    <TouchableHighlight style={styles.eyeconBtn} onPress={() => this.setState(prev => ({hidePassword: !prev.hidePassword}))}> 
                        <Icon icon={eyecon} style={{color: 'gray'}} size={24}/>
                    </TouchableHighlight>
                </View>
                <TextInput
                    onChangeText={again_password => this.setState({again_password: again_password})}
                    style={styles.input} autoCapitalize='none'
                    secureTextEntry={this.state.hidePassword}
                    placeholder='Confirm Password'
                    placeholderTextColor='#999'
                    returnKeyType='go'
                    textContentType='newPassword'
                />
            </View>
        )
        else return(
            <View style={{flex: 2, justifyContent: 'center'}}>
                <Text>Login</Text>
                <TextInput
                    onChangeText={name => this.setState({name: name})}
                    style={styles.input}
                    autoCapitalize='none'
                    placeholder='Username'
                    placeholderTextColor='#999'
                    returnKeyType='next'
                    textContentType='username'
                />
                <View style={styles.passwordInput}>
                    <TextInput
                        onChangeText={password => this.setState({password: password})}
                        style={styles.input}
                        autoCapitalize='none'
                        secureTextEntry={this.state.hidePassword}
                        placeholder='Password'
                        placeholderTextColor='#999'
                        returnKeyType='go'
                        textContentType='password'
                    />
                    <TouchableHighlight style={styles.eyeconBtn} onPress={() => this.setState(prev => ({hidePassword: !prev.hidePassword}))}> 
                        <Icon icon={eyecon} style={{color: 'gray'}} size={24}/>
                    </TouchableHighlight> 
                </View>
            </View>
        )
    }

    render(){
        const otherForm = this.state.newUser ? 'login' : 'register'

        return(
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
                    <Button style={styles.btn} title="Login"/>
                    <View style={[styles.passwordInput,{width: 200, justifyContent: 'center'}]}>
                        <Text style={{margin: 10, width: 60}} onPress={() => this.setState(prevState => ({newUser: !prevState.newUser}))}>{otherForm}</Text>
                        <Text style={{margin: 10}}>forgot password?</Text>
                    </View>
                </View>
            </View>
        )
    }
}