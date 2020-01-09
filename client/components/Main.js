import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createAppContainer } from 'react-navigation'
import {_getTheme} from '../deviceStorage'

// ICONS
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faHome, faSearch, faVideo, faEnvelope } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import Feed from './Feed'
import Messages from './Messages'
import Profile from './Profile'
import Search from './Search'
import Camera from './Camera'


const getTabBarIcon = (navigation, focused) => {
    const tint = focused ? 'white' : 'grey'
    switch (navigation.state.routeName) {
        case 'Home': return <Icon icon={faHome} size={30} color={tint} />
        case 'Search': return <Icon icon={faSearch} size={30} color={tint} />
        case 'Camera': return <Icon icon={faVideo} size={30} color={tint} />
        case 'Messages': return <Icon icon={faEnvelope} size={30} color={tint} />
        case 'Profile': return <Icon icon={faUserCircle} size={30} color={tint} />
    }
}

const mainNav = createMaterialBottomTabNavigator({
    Home: { screen: props => <Feed {...props} {...this.props} /> },
    Search: { screen: props => <Search {...props} {...this.props} /> },
    Camera: { screen: Camera },
    Messages: { screen: props => <Messages {...props} {...this.props} /> },
    Profile: { screen: props => <Profile {...props} {...this.props} /> }
}, {
    defaultNavigationOptions: ({ navigation }) => ({ tabBarIcon: ({ focused }) => getTabBarIcon(navigation, focused) }),
    initialRouteName: 'Camera',
    labeled: false,
    activeColor: '#444',
    inactiveColor: 'black',
    barStyle: { backgroundColor: 'black' }
})

const Main = createAppContainer(mainNav)

export default class extends Component{
    render(){
        return <Main screenProps={{...this.props.screenProps, ...this.props.navigation}}/>
    }
}