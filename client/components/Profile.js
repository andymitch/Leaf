import React, {Component} from 'react'
import {Button, View, FlatList, Text} from 'react-native'
import { styles } from '../styles/style'

export default class Profile extends Component{
  _navigateToName = () => {
    const { navigation } = this.props
    navigation.navigate('Settings');
  }
    render(){
        return(
          <View style={{flex: 1, top: 100}}>
                <Button style={styles.btn} title="SETTINGS" onPress={() => this._navigateToName()} />
            </View>

        )
    }
}
