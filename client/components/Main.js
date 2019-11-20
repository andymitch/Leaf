import React, {Component} from 'react'
import {View, Text, StatusBar} from 'react-native'
import {Container, Content, Footer, FooterTab, Button, Badge, Header, Left, Right, Body} from 'native-base'

// ICONS
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faUserCircle, faCog, faHome, faSearch, faVideo, faBell, faEnvelope} from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import Feed from './Feed'
import Messages from './Messages'
import Notifications from './Notifications'
import Settings from './Settings'
import Profile from './Profile'
import Search from './Search'

// AUTH TOKEN, logout if token expires
import {AUTH_TOKEN, logout} from './LoginRegister'


export default class Main extends Component{
    state = {
        page: 'Feed',
        notiNotify: 5,
        messageNotify: 5
    }

    componentDidMount(){
        if(!AUTH_TOKEN) this.props.navigation.goBack()
    }

    notifyBadge = count => {
        if(count){
            return(
                <Badge style={{height: 20, width: 20, marginBottom: 10}}>
                    <Text style={{fontSize: 12, textAlign: 'center'}}>
                        {count}
                    </Text>
                </Badge>
            )
        } return null
    }

    renderPage = () => {
        if(this.state.page === 'Feed') return <Feed/>
        if(this.state.page === 'Search') return <Search/>
        if(this.state.page === 'Notifications') return <Notifications/>
        if(this.state.page === 'Messages') return <Messages/>
        if(this.state.page === 'Profile') return <Profile/>
        if(this.state.page === 'Settings') return <Settings/>
        return null
    }

    render(){
        return(
            <Container>
                <StatusBar hidden/>
                <Header style={{backgroundColor: 'white'}}>
                    <Left>
                        <Button transparent onPress={() => this.setState({page: 'Profile'})}>
                            <Icon icon={faUserCircle} size={30}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>LEAF</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.setState({page: 'Settings'})}>
                            <Icon icon={faCog} size={30}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {this.renderPage()}
                </Content>
                <Footer>
                    <FooterTab style={{backgroundColor: 'white', borderTopColor: 'darkgrey', borderTopWidth: 1}}>
                        <Button onPress={() => this.setState({page: 'Feed'})}>
                            <Icon icon={faHome} size={30}/>
                        </Button>
                        <Button onPress={() => this.setState({page: 'Search'})}>
                            <Icon icon={faSearch} size={30}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.push('Camera')}>
                            <View style={{borderRadius: 50, borderWidth: 1, shadowColor: "#000", shadowOffset: {width: 0,height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderColor: 'darkgrey', width: 70, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                                <Icon icon={faVideo} size={30}/>
                            </View>
                        </Button>
                        <Button badge onPress={() => this.setState({page: 'Notifications'})}>
                            {this.notifyBadge(this.state.notiNotify)}
                            <Icon icon={faBell} size={30} style={{position: 'absolute'}}/>
                        </Button>
                        <Button badge onPress={() => this.setState({page: 'Messages'})}>
                            {this.notifyBadge(this.state.messageNotify)}
                            <Icon icon={faEnvelope} size={30} style={{position: 'absolute'}}/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}