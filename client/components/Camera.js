import React, {Component} from 'react'
import {Button, Text, View, TextInput, TouchableHighlight, StatusBar, ImageBackground} from 'react-native'
import Axios from 'axios'

//AUTH TOKEN
import {AUTH_TOKEN} from './LoginRegister'

//ICONS AND STYLES
import { styles } from '../style'


export default class Camera extends Component{
    render(){
        console.log(AUTH_TOKEN)
        if(!AUTH_TOKEN) {
            this.props.navigation.navigate('Auth')
            return null
        }else{
            return(
                <View style={styles.container}>
                    <View style={[styles.login,{width: 300}]}>
                        <Text>CAMERA</Text>
                    </View>
                </View>
            );
        }
    }
}