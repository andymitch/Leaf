import React from 'react';
import {StyleSheet, Text, View, ImageBackground, StatusBar} from 'react-native';
import LoginRegister from './components/LoginRegister';
import {styles} from './style'

export default function App(){
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <ImageBackground source={require('./assets/img/leaf_background.jpg')} style={{width: '100%', height: '100%'}}>
        <LoginRegister/>
      </ImageBackground>
    </View>
  );
}
