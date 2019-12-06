import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList, Text } from 'react-native'
import ReactNativeSettingsPage, { SwitchRow, SliderRow, SectionRow, NavigateRow, CheckRow } from 'react-native-settings-page';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ProfileCam from './ProfileCam'


export default class Settings extends Component {
	// TODO: implement your navigationOptions
	state = {
		switch: false,
		value: 40,
		setProfile: false
	}

	goBack = () => { this.setState({setProfile: false}) }

	setTheme = async () => {
		if(this.props.screenProps.theme === 'light') this.props.screenProps.setTheme('dark')
		else this.props.screenProps.setTheme('light')
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
		if(this.state.setProfile) return <ProfileCam goBack={this.goBack} token={this.props.screenProps.token}/>
		return (
			<View style={{ flex: 1, flexDirection: "column" }}>
				<View style={{ zIndex: 1, top: 47, alignSelf: "flex-start" }}>
					<TouchableOpacity onPress={() => this.props.navigation.pop()}>
						<Icon icon={faArrowLeft} size={30} />
					</TouchableOpacity>
				</View>
				<ReactNativeSettingsPage style={{ top: 50 }}>
					<SectionRow text='             Settings' style={{ alignSelf: "flex-end" }}>
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
				<TouchableOpacity onPress={() => {this.setState({setProfile: true})}} style={{width: '50%', height: 100, alignSelf: 'center', color: 'grey'}}>
					<Text>Set Profile Picture</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {this.props.screenProps.deleteToken()}} style={{width: '50%', height: 100, alignSelf: 'center', color: 'grey'}}>
					<Text>Logout</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {alert('Mode switched. Reload app to see effects.'); this.setTheme()}} style={{width: '50%', height: 100, alignSelf: 'center', color: 'grey'}}>
					<Text>Light / Dark Mode</Text>
				</TouchableOpacity>
			</View>
		)
	}
}
