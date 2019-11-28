import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Container, Content, Footer, Header, FooterTab, Button, Badge } from 'native-base'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

// ICONS
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faHome, faSearch, faVideo, faEnvelope } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import Feed from './NewFeed'
import Messages from './Messages'
import Profile from './Profile'
import Search from './Search'
import Camera from './Camera'
// AUTH TOKEN, logout if token expires
import { AUTH_TOKEN, logout } from './LoginRegister'

/*
export default class Main extends Component {
    state = {
        page: 'Feed',
        messageNotify: 5
    }

    componentDidMount() {
        if (!AUTH_TOKEN) this.props.navigation.goBack()
    }

    notifyBadge = count => {
        if (count) {
            return (
                <Badge style={{ height: 20, width: 20, marginBottom: 10 }}>
                    <Text style={{ fontSize: 12, textAlign: 'center' }}>
                        {count}
                    </Text>
                </Badge>
            )
        } return null
    }

    renderPage = () => {
        if (this.state.page === 'Feed') return <Feed />
        if (this.state.page === 'Search') return <Search />
        if (this.state.page === 'Messages') return <Messages />
        if (this.state.page === 'Profile') return <Profile />
        return null
    }

    render() {
        return (
            <Container style={{ flex: 1, top: 0 }}>
                <Content style={{ flex: 1, top: 0 }}>
                    {this.renderPage()}
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor: 'black', borderTopColor: 'darkgrey', borderTopWidth: 1 }}>
                        <Button onPress={() => this.setState({ page: 'Feed' })}>
                            <Icon icon={faHome} size={30} style={{ color: 'white' }} />
                        </Button>
                        <Button onPress={() => this.setState({ page: 'Search' })}>
                            <Icon icon={faSearch} size={30} style={{ color: 'white' }} />
                        </Button>
                        <Button onPress={() => this.props.navigation.push('Camera')}>
                            <View style={{ borderRadius: 50, borderWidth: 1, shadowColor: "white", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderColor: 'darkgrey', width: 70, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                                <Icon icon={faVideo} size={30} style={{ color: 'white' }} />
                            </View>
                        </Button>
                        <Button badge onPress={() => this.setState({ page: 'Messages' })}>
                            {this.notifyBadge(this.state.newMsgs)}
                            <Icon icon={faEnvelope} size={30} style={{ position: 'absolute', color: 'white' }} />
                        </Button>
                        <Button badge onPress={() => this.setState({ page: 'Profile' })}>
                            <Icon icon={faUserCircle} size={30} style={{ color: 'white' }} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}
*/

const getTabBarIcon = (navigation, focused) => {
    const tint = focused ? 'gainsboro' : 'white'
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