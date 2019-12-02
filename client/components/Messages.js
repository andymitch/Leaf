import React, { Component } from 'react'
import { View, Text, Dimensions, ScrollView, Button, Image } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { NavigationEvents } from 'react-navigation'
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN
import Profile from './Profile'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
const { height: winHeight, width: winWidth } = Dimensions.get('window')

// FOR TESTING PURPOSES
const requests = [
    {
        name: 'Aaron',
        profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        follow: true
    }, {
        name: 'Ben',
        profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        follow: false,
        id: 1
    }, {
        name: 'Charlie',
        profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        follow: true
    }
]
const chats = [
    {
        id: 2,
        group: [
            {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            }, {
                name: 'Ben',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            }, {
                name: 'Charlie',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            },
        ],
        messages: [
            {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Charlie',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Ben',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Ben',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            },
        ],
        myIndex: 3
    }, {
        id: 3,
        group: [
            {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            }, {
                name: 'Ben',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            },
        ],
        messages: [
            {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Ben',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Ben',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            },
        ],
        myIndex: 4
    }, {
        id: 4,
        group: [
            {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            }, {
                name: 'Charlie',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            },
        ],
        messages: [
            {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Charlie',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Charlie',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Aaron',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            }, {
                name: 'Charlie',
                profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
                content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4'
            },
        ],
        myIndex: 2
    }
]

class ChatItem extends Component {
    renderGroup = group => {
        console.log(group)
        let groupStr = ''
        for(user of group) groupStr += `, ${user.name}`
        groupStr = groupStr.slice(2,groupStr.length)
        return(
            <View style={{flexDirection: 'row', borderRadius: 10, backgroundColor: 'gainsboro', width: '100%', marginVertical: 5, padding: 10}}>
                <Image source={{ uri: group[0].profile }} style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'black', marginRight: 5 }} />
                <Text style={{ fontWeight: 'bold' }}>{groupStr}</Text>
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
    state = {
        accepted: false
    }

    action = async () => {
        if (this.props.follow) {
            if (this.state.accepted) {
                // follow back
                this.props.clear(this.props.index)
                console.log('following')
                /*
                await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/follow', { user: this.props.name })
                    .then(() => this.props.clear(this.props.index))
                    .catch(err => console.log(err))
                */
            } else {
                // accept follow
                this.setState({accepted: true})
                console.log('accepted follow')
                /*
                await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/accept', { user: this.props.name })
                    .then(() => this.setState({ accepted: true }))
                    .catch(err => console.log(err))
                */
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
        const acceptBtn = this.state.accepted ? 'FOLLOW' : 'ACCEPT'
        const acceptColor = this.state.accepted ? 'cadetblue' : '#00bfff'
        if (this.props.follow) {
            return (
                <View style={{ width: '100%', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPress={() => this.props.goto(this.props.name)}>
                            <Image source={{ uri: this.props.profile }} style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'black', marginRight: 5 }} />
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>{this.props.name}</Text>
                            <Text>would like to follow you.</Text>
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
            <View style={{ width: '100%', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: this.props.profile }} style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'black', marginRight: 5 }} />
                    <View>
                        <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>{this.props.name}</Text>
                        <Text>invites you to join a chat group.</Text>
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
        gotoProfile: null
    }

    componentDidMount() {
        this.get()
    }

    get = async () => {
        this.setState({ requests: requests, chats: chats })
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
            this.props.navigation.push('Chat', { messages: this.state.chats[loc] })
        } else {
            //goto profile of username
            this.setState({ gotoProfile: loc })
        }
    }

    render() {
        console.log('render')
        if (this.state.gotoProfile) return <Profile goBack={this.goBack} user={this.state.gotoProfile} />
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <NavigationEvents onWillFocus={() => this.get()} />
                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Chats & Requests</Text>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Requests</Text>
                    {this.state.requests.map((req, i) => <ReqItem index={i} goto={this.goto} clear={this.clear} get={this.get} {...req} />)}
                </View>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Chats</Text>
                    {this.state.chats.map((chat, i) => <ChatItem index={i} goto={this.goto} {...chat} />)}
                </View>
            </View>
        )
    }
}