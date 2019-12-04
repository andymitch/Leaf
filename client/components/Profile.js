import React, { Component } from 'react'
import { View, Image, Text, ActivityIndicator, Dimensions } from 'react-native'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCog, faBolt, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faGem } from '@fortawesome/free-regular-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationEvents } from 'react-navigation'
import { Video } from 'expo-av'
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN
import Settings from './Settings'
const { height: winHeight, width: winWidth } = Dimensions.get('window')
let following = null


// FOR TESTING PURPOSES
const _videos = [
    {
        id: 111,
        liked: false,
        uri: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
        caption: 'this is my caption!',
        life: 3
    }, {
        id: 111,
        liked: false,
        uri: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
        caption: 'this is my caption!',
        life: 3
    }, {
        id: 111,
        liked: false,
        uri: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
        caption: 'this is my caption!',
        life: 3
    }
]

class FullVideo extends Component{
    render(){
        const video = this.props.video
        const boltColor = video.liked ? 'yellow' : 'rgba(255, 255, 255, .5)'
        return(
            <View style={{height: winHeight, width: winWidth}}>
                <View style={{position: 'absolute', margin: 20}}>
                    <Icon icon={faArrowLeft} style={{color: 'white'}} size={30}/>
                </View>
                <Video source={{ uri: video.uri }} resizeMode='cover' isLooping shouldPlay style={{ width: winWidth, height: winHeight, position: 'absolute' }} />
                <View style={{width: '100%', bottom: 20, justifyContent: 'space-between'}}>
                    <Text>{video.caption}</Text>
                    <View>
                        <Text style={{ color: 'white' }}>{video.life}</Text>
                        <Icon icon={faBolt} style={{ color: boltColor }} size={30} />
                    </View>
                </View>
            </View>
        )
    }
}

export default class Profile extends Component {
    state = {
        profile: '',
        username: '',
        fullname: '',
        points: 0,
        videos: [],
        following: null,
        onSettings: false,
        onVideo: -1,
        isLoading: true
    }

    async componentDidMount() {
        // FOR TESTING PURPOSES
        this.setState({
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            username: 'andymitch559',
            fullname: 'Andrew Mitchell',
            points: 1056,
            videos: _videos,
            isLoading: false
        })
        /*
        const username = this.props.username ? this.props.username : null
        await Axios.get('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/profile', { params: { username: username } })
            .then(res => {
                this.setState({
                    profile: res.data.profile,
                    username: res.data.username,
                    fullname: res.data.fullname,
                    points: res.data.points,
                    videos: res.data.videos,
                    following: res.data.following
                })
                following = res.data.following
            }).catch(err => console.log(err))
        */
    }

    componentWillUnmount() { this.follow() }

    goBack = () => { this.setState({ onSettings: false, onVideo: -1 }) }

    like = index => {

    }

    follow = async () => {
        if (following !== null && following !== this.state.following) {
            await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/follow', { username: this.state.username, follow: this.state.following })
                .catch(err => console.log(err))
            following = this.state.following
        }
    }

    renderFollow = () => {
        if (this.state.following === null) return null
        const followColor = this.state.following ? 'lightgrey' : 'cadetblue'
        const followText = this.state.following ? 'UNFOLLOW' : 'FOLLOW'
        return (
            <TouchableOpacity style={{ backgroundColor: followColor, margin: 5, paddingHorizontal: 10, paddingVertical: 5 }} onPress={() => this.setState(prev => ({ following: !prev.following }))}>
                <Text>{followText}</Text>
            </TouchableOpacity>
        )
    }

    renderVideoItem = (video, index) => {
        const boltColor = video.liked ? 'yellow' : 'rgba(255, 255, 255, .5)'
        return (
            <TouchableOpacity onPress={() => this.setState({onVideo: index})} style={{ width: (winWidth / 2) - 40, height: (winWidth / 2) - 40 }}>
                <Video source={{ uri: video.uri }} resizeMode='cover' isLooping isMuted shouldPlay style={{ width: (winWidth / 2) - 40, height: (winWidth / 2) - 40, position: 'absolute' }} />
                <View style={{ position: 'absolute', bottom: 0, right: 0, margin: 10, flexDirection: 'row' }}>
                    <Text style={{ color: 'white' }}>{video.life}</Text>
                    <Icon icon={faBolt} style={{ color: boltColor }} />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'black' }}>
                    <ActivityIndicator size='large' color='blue' animated />
                </View>
            )
        }
        if (this.state.onSettings) return <Settings goBack={this.goBack} />
        if (this.state.onVideo+1) return <FullVideo goBack={this.goBack} like={this.like} video={this.state.videos[this.state.onVideo]}/>
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <NavigationEvents onDidBlur={() => this.follow()} />
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: this.state.profile }} style={{ height: 70, width: 70, borderRadius: 45, borderWidth: 1, borderColor: 'black', marginRight: 5 }} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.username}</Text>
                            <Text style={{ fontSize: 15, fontStyle: 'italic', color: 'grey' }}>{this.state.fullname}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon icon={faGem} size={20} />
                                <Text>{this.state.points}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        {this.renderFollow()}
                        <TouchableOpacity>
                            <Icon icon={faCog} size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.state.videos.map((video, index) => this.renderVideoItem(video, index))}
                </View>
            </View>
        )
    }
}