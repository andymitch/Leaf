import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
//import ChangePass from '../changepass'
import ReactNativeSettingsPage, { SwitchRow, SliderRow, SectionRow, NavigateRow, CheckRow } from 'react-native-settings-page';
// export default class Settings extends Component{
//     render(){
//         return(
//             <View style={{flex: 1}}>
//                 <Text>SETTINGS</Text>
//             </View>
//         )
//     }
// }



export class Settings extends Component {
	// TODO: implement your navigationOptions
	state = {
		switch: false,
		value: 40
	}
	_navigateToPass = () => {
		const { navigation } = this.props
		navigation.navigate('ChangePass');
	}
	_navigateToUser = () => {
		const { navigation } = this.props
		navigation.navigate('Your-Screen-Name');
	}
	_navigateToName = () => {
		const { navigation } = this.props
		navigation.navigate('Your-Screen-Name');
	}
	_navigateToScreen = () => {
		alert("hello world");
	}
	render() {
		return (
			<ReactNativeSettingsPage style={{ top: 50 }}>
				<SectionRow text='Settings' style={{ justifyContent: 'center' }}>
					<NavigateRow
						text='Change Name'
						onPressCallback={this._navigateToScreen} />
					<NavigateRow
						text='Change Username'
						onPressCallback={this._navigateToScreen} />
					<NavigateRow
						text='Change Password'
						onPressCallback={this._navigateToPass} />
					<SwitchRow
						text='Toggle Dark Mode'
						_value={this.state.switch}
						_onValueChange={() => { this.setState(prev => ({ switch: !prev.switch })) }} />
				</SectionRow>
			</ReactNativeSettingsPage>
		)
	}
}

export default Settings
