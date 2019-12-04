import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

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
    const tint = focused ? 'white' : '#bbb'
    switch (navigation.state.routeName) {
        case 'Home': return <Icon icon={faHome} size={30} color={tint} />
        case 'Search': return <Icon icon={faSearch} size={30} color={tint} />
        case 'Camera': return <Icon icon={faVideo} size={30} color={tint} />
        case 'Messages': return <Icon icon={faEnvelope} size={30} color={tint} />
        case 'Profile': return <Icon icon={faUserCircle} size={30} color={tint} />
    }
}

export default createMaterialBottomTabNavigator({
    Home: { screen: Feed },
    Search: { screen: Search },
    Camera: { screen: Camera },
    Messages: { screen: Messages },
    Profile: { screen: Profile }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => getTabBarIcon(navigation, focused)
    }),
    initialRouteName: 'Camera',
    labeled: false,
    activeColor: '#444',
    inactiveColor: 'black',
    barStyle: { backgroundColor: 'black' }
})