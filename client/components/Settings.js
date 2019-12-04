import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import ReactNativeSettingsPage, { SwitchRow, SliderRow, SectionRow, NavigateRow, CheckRow } from 'react-native-settings-page';



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
		navigation.navigate('ChangeUser');
	}
	_navigateToName = () => {
		const { navigation } = this.props
		navigation.navigate('ChangeName');
	}
	render() {
		return (
			<ReactNativeSettingsPage style={{ top: 50 }}>
				<SectionRow text='Settings' style={{ justifyContent: 'center' }}>
					<NavigateRow
						text='Change Name'
						onPressCallback={this._navigateToName} />
					<NavigateRow
						text='Change Username'
						onPressCallback={this._navigateToUser} />
					<NavigateRow
						text='Change Password'
						onPressCallback={this._navigateToPass} />
					
				</SectionRow>
			</ReactNativeSettingsPage>
		)
	}
}

export default Settings
