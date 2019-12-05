import React, { Component } from 'react'
import { View, Text, Image, StatusBar, ActivityIndicator } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { NavigationEvents } from 'react-navigation'
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN
import Profile from './Profile'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { getItemAsync } from 'expo-secure-store'
import { LIGHT, DARK } from '../colorTheme'
let theme
const getTheme = async () => {
    await getItemAsync('theme')
    .then(res => {
        if(res === 'dark') theme = DARK
        else theme = LIGHT
    })
}
getTheme()

// FOR TESTING PURPOSES
const requests = [
    {
        username: 'Aaron',
        profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        follow: true,
        accept: false
    }, {
        username: 'Ben',
        profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        follow: false,
        id: 1
    }, {
        username: 'Charlie',
        profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        follow: true,
        accept: false
    }
]
const chats = [
    {
        id: 2,
        group: [
            {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            }, {
                username: 'Ben',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            }, {
                username: 'Charlie',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            },
        ],
        messages: [
            {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Charlie',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Ben',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Ben',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            },
        ],
        myIndex: 3
    }, {
        id: 3,
        group: [
            {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            }, {
                username: 'Ben',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            },
        ],
        messages: [
            {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Ben',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Ben',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            },
        ],
        myIndex: 4
    }, {
        id: 4,
        group: [
            {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            }, {
                username: 'Charlie',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            },
        ],
        messages: [
            {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Charlie',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Charlie',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Aaron',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                username: 'Charlie',
                profilepicture: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            },
        ],
        myIndex: 2
    }
]

class ChatItem extends Component {
    renderGroup = group => {
        let groupStr = ''
        for (user of group) groupStr += `, ${user.username}`
        groupStr = groupStr.slice(2, groupStr.length)
        return (
            <View style={{ flexDirection: 'row', borderRadius: 10, backgroundColor: 'rgba(128,128,128,.5)', width: '100%', marginVertical: 5, padding: 10 }}>
                <Image source={{ uri: group[0].profilepicture }} style={[{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, marginRight: 5 }, theme.image]} />
                <Text style={[{ fontWeight: 'bold' }, theme.text]}>{groupStr}</Text>
            </View>
        )
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.goto(this.props.index)}>
                {this.renderGroup(this.props.group)}
            </TouchableOpacity>
        )
    }
}

class ReqItem extends Component {
    action = async () => {
        if (this.props.follow) {
            if (this.props.accept) {
                // follow back
                this.props.clear(this.props.index)
                console.log('following')
                /*
                await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/follow', { username: this.props.name, follow: true })
                    .then(() => this.props.clear(this.props.index))
                    .catch(err => console.log(err))
                */
            } else {
                // accept follow
                this.props.acceptFollow(this.props.index)
                console.log('accepted follow')
            }
        } else {
            // join chat group
            this.props.clear(this.props.index)
            console.log('joined chat group ' + this.props.id)
            /*
            await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/join', { id: this.props.id })
                .then(() => {
                    this.props.clear(this.props.index)
                    this.props.get()
                }).catch(err => console.log(err))
            */
        }
    }

    render() {
        const acceptBtn = this.props.accept ? 'FOLLOW' : 'ACCEPT'
        const acceptColor = this.props.accept ? 'cadetblue' : '#00bfff'
        if (this.props.follow) {
            return (
                <View style={[{ width: '100%', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }, theme.container]}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPress={() => this.props.goto(this.props.username)}>
                            <Image source={{ uri: this.props.profilepicture }} style={[{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, marginRight: 5 }, theme.image]} />
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={[{ fontWeight: 'bold', marginHorizontal: 5 }, theme.text]}>{this.props.username}</Text>
                            <Text style={theme.text}>would like to follow you.</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.action()} style={{ backgroundColor: acceptColor, borderRadius: 20, justifyContent: 'center', margin: 5 }}>
                            <Text style={{ marginHorizontal: 10, marginVertical: 5, color: 'white' }}>{acceptBtn}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.clear(this.props.index)}>
                            <Icon icon={faTimesCircle} size={25} style={{ color: '#c6c6c6' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={[{ width: '100%', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }, theme.container]}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: this.props.profilepicture }} style={[{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, marginRight: 5 }, theme.image]} />
                    <View>
                        <Text style={[{ fontWeight: 'bold', marginHorizontal: 5 }, theme.text]}>{this.props.username}</Text>
                        <Text style={theme.text}>invites you to join a chat group.</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.action()} style={{ backgroundColor: acceptColor, borderRadius: 20, justifyContent: 'center', margin: 5 }}>
                        <Text style={{ marginHorizontal: 10, marginVertical: 5, color: 'white' }}>JOIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.clear(this.props.index)}>
                        <Icon icon={faTimesCircle} size={25} style={{ color: '#c6c6c6' }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default class Messages extends Component {
    state = {
        requests: [],
        chats: [],
        gotoProfile: null,
        isLoading: true
    }

    componentDidMount() {
        this.get()
    }

    get = async () => {
        this.setState({ requests: requests, chats: chats, isLoading: false })
        /*
        //get requests
        await Axios.get('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/requests')
            .then(res => this.setState({ requests: res.data }))
            .catch(err => console.log(err))

        //get chats
        await Axios.get('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/chats')
            .then(res => this.setState({ chats: res.data }))
            .catch(err => console.log(err))
        */
    }

    acceptFollow = async index => {
        let temp = this.state.requests
        temp[index].accept = true
        this.setState({ requests: temp })
        /*
            await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/accept', { username: this.props.name })
                .then(() => this.setState({ accepted: true }))
                .catch(err => console.log(err))
        */
    }

    clear = async index => {
        let temp = this.state.requests
        temp.splice(index, 1)
        this.setState({ requests: temp })
        /*
        await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/requests', { requests: temp })
            .catch(err => console.log(err))
        */
    }

    goBack = () => { this.setState({ gotoProfile: null }) }

    goto = loc => {
        if (Number.isInteger(loc)) {
            // goto chat
            this.props.navigation.push('Chat', { messages: this.state.chats[loc].messages, myIndex: this.state.chats[loc].myIndex, id: this.state.chats[loc].id })
        } else {
            //goto profile of username
            this.setState({ gotoProfile: loc })
        }
    }

    render() {
        if (this.state.isLoading) return (
            <View style={[{ alignItems: 'center', justifyContent: 'center', flex: 1}, theme.container]}>
                <ActivityIndicator size='large' color='blue' animated />
            </View>
        )
        if (this.state.gotoProfile) return <Profile goBack={this.goBack} username={this.state.gotoProfile} />
        return (
            <View style={[{ flex: 1, padding: 20, paddingTop: 40 }, theme.container]}>
                <NavigationEvents onWillFocus={() => this.get()} />
                <Text style={[{ fontSize: 40, fontWeight: 'bold' }, theme.text]}>Chats & Requests</Text>
                <View>
                    <Text style={[{ fontSize: 30, fontWeight: 'bold' }, theme.text]}>Requests</Text>
                    {this.state.requests.map((req, i) => <ReqItem key={i} index={i} goto={this.goto} acceptFollow={this.acceptFollow} clear={this.clear} get={this.get} {...req} />)}
                </View>
                <View>
                    <Text style={[{ fontSize: 30, fontWeight: 'bold' }, theme.text]}>Chats</Text>
                    {this.state.chats.map((chat, i) => <ChatItem key={i} index={i} goto={this.goto} {...chat} />)}
                </View>
            </View>
        )
    }
}