import React, { Component } from 'react'
import { View, Image, Text, ActivityIndicator, Dimensions, StatusBar } from 'react-native'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCog, faBolt, faArrowLeft, faFire, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faGem } from '@fortawesome/free-regular-svg-icons'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { NavigationEvents } from 'react-navigation'
import { Video } from 'expo-av'
import Axios from 'axios'
import { LIGHT, DARK } from '../colorTheme'
const { height: winHeight, width: winWidth } = Dimensions.get('window')


class FullVideo extends Component {
    state = {
        liked: this.props.video.liked
    }

    async componentWillUnmount() {
        if (this.props.video.liked && !this.state.liked) await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/like', { like: false, id: this.props.video.id, token: this.props.token }).catch(err => console.log(err))
        else if (!this.props.video.liked && this.state.liked) await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/like', { like: true, id: this.props.video.id, token: this.props.token }).catch(err => console.log(err))
    }

    render() {
        const video = this.props.video
        const boltColor = this.state.liked ? 'yellow' : 'rgba(255, 255, 255, .5)'
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
                <Video source={{ uri: video.uri }} resizeMode='cover' isLooping shouldPlay style={{ width: winWidth, height: winHeight, position: 'absolute' }} />
                <View style={{ position: 'absolute', margin: 20, marginTop: 40 }}>
                    <TouchableOpacity onPress={() => this.props.goBack()} >
                        <Icon icon={faArrowLeft} style={{ color: 'white' }} size={40} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', bottom: 0, justifyContent: 'space-between', position: 'absolute', flexDirection: 'row', padding: 20 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>{video.description}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>{video.life}</Text>
                        <TouchableOpacity onPress={() => { if (this.state.liked !== null) { this.setState(prev => ({ liked: !prev.liked })); this.props.like(this.props.index) } }}>
                            <Icon icon={faBolt} style={{ color: boltColor }} size={50} />
                        </TouchableOpacity>
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
        videoAction: [],
        following: null,
        wasFollowing: null,
        onVideo: -1,
        isLoading: true,
        theme: this.props.screenProps.theme == 'dark' ? DARK : LIGHT
    }

    async componentDidMount() {
        const username = this.props.username === undefined ? "" : this.props.username
        await Axios.get(`https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/profile?username=${username}&token=${this.props.screenProps.token}`)
            .then(res => {
                console.log('got profile data')
                this.setState({
                    profile: res.data.profilepicture,
                    username: res.data.username,
                    fullname: res.data.name,
                    points: res.data.points,
                    streak: res.data.multiplier,
                    videos: res.data.videos,
                    videoAction: new Array(res.data.videos.length).fill(false),
                    following: res.data.following,
                    wasFollowing: res.data.following,
                    isLoading: false
                })
            }).catch(err => console.log(err.response))
    }

    componentWillUnmount() { this.follow() }

    goBack = () => { this.setState({ onVideo: -1 }) }

    like = index => {
        let temp = this.state.videos
        if (temp[index].liked) {
            temp[index].liked = false
            temp[index].likes -= 1
        } else {
            temp[index].liked = true
            temp[index].likes += 1
        }
        this.setState({ videos: temp })
    }

    follow = async () => {
        if (this.state.wasFollowing !== null && this.state.wasFollowing !== this.state.following) {
            await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/follow', { username: this.state.username, follow: this.state.following, token: this.props.screenProps.token })
                .catch(err => console.log(err))
            this.setState({wasFollowing: this.state.following})
        }
    }

    renderFollow = () => {
        const followColor = this.state.following ? 'lightgrey' : 'cadetblue'
        const followText = this.state.following ? 'UNFOLLOW' : 'FOLLOW'
        return (
            <TouchableOpacity style={{ backgroundColor: followColor, margin: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }} onPress={() => this.setState(prev => ({ following: !prev.following }))}>
                <Text>{followText}</Text>
            </TouchableOpacity>
        )
    }

    renderStreak = () => {
        if (this.state.streak == 1) return null
        const streak = `x${this.state.streak}`
        return (
            <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ position: 'absolute', zIndex: 1 }}>
                    <Text style={[{ fontWeight: 'bold', bottom: -2, fontSize: 10 }, this.state.theme.text]}>{streak}</Text>
                </View>
                <View style={{ position: 'absolute', zIndex: 0 }}>
                    <Icon icon={faFire} size={20} style={this.state.theme.streak} />
                </View>
            </View>
        )
    }

    action = index => {
        if(this.state.following === null){
            const videoAction = this.state.videoAction
            videoAction[index] = !videoAction[index]
            this.setState({videoAction})
        }
    }

    deleteVideo = async index => {
        const videoAction = this.state.videoAction
        const videos = this.state.videos
        //await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/deleteVideo', {id: videos[index].id, token: this.props.screenProps.token})
        videoAction.splice(index,1)
        videos.splice(index,1)
        this.setState({videos, videoAction})
    }

    renderVideoItem = (video, index) => {
        const boltColor = video.liked ? 'yellow' : 'rgba(255, 255, 255, .5)'
        return (
            <View style={{width: (winWidth / 2) - 30, height: (winWidth / 2) - 40, margin: 5, borderRadius: 5}}>
                {this.state.videoAction[index] && <View style={{width: (winWidth / 2) - 30, height: (winWidth / 2) - 40, margin: 5, borderRadius: 5, zIndex: 1, backgroundColor: 'rgba(128,128,128,.5)', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.action(index)}>
                        <Icon icon={faTimesCircle} style={{color: 'dimgrey'}} size={40}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deleteVideo(index)}>
                        <Icon icon={faTrash} style={{color: 'dimgrey'}} size={40}/>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity key={index} onLongPress={() => this.action(index)} onPress={() => this.setState({ onVideo: index })} style={{ width: (winWidth / 2) - 30, height: (winWidth / 2) - 40, margin: 5, borderRadius: 5 }}>
                    <Video source={{ uri: video.uri }} resizeMode='cover' isLooping isMuted shouldPlay style={{ width: (winWidth / 2) - 30, height: (winWidth / 2) - 40, position: 'absolute', borderRadius: 5 }} />
                    <View style={{ position: 'absolute', bottom: 0, right: 0, margin: 10, flexDirection: 'row' }}>
                        <Text style={{ color: 'white' }}>{video.life}</Text>
                        <Icon icon={faBolt} style={{ color: boltColor }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={[{ alignItems: 'center', justifyContent: 'center', flex: 1 }, this.state.theme.container]}>
                        <View style={{ position: 'absolute', right: 0, top: 20, margin: 20, zIndex: 1 }}>
                            <TouchableOpacity onPress={() => { console.log('trying to go to settings '); this.props.screenProps.push('Settings') }}>
                                <Icon icon={faCog} size={30} style={{color: 'grey'}} />
                            </TouchableOpacity>
                        </View>
                    <StatusBar hidden={false} />
                    <ActivityIndicator size='large' color='blue' animated />
                </View>
            )
        }
        if (this.state.onVideo + 1) return <FullVideo token={this.props.screenProps.token} index={this.state.onVideo} following={this.state.following} goBack={this.goBack} like={this.like} video={this.state.videos[this.state.onVideo]} />
        return (
            <View style={[{ flex: 1, padding: 20, paddingTop: 40, paddingBottom: 0 }, this.state.theme.container]}>
                <NavigationEvents onDidBlur={() => {this.setState({ videoAction: new Array(this.state.videos.length).fill(false) }); this.follow()}}/>
                {this.state.following !== null &&
                    <TouchableOpacity onPress={() => this.props.goBack()}>
                        <Icon icon={faArrowLeft} size={35} style={{ margin: 10, marginTop: 0, color: 'grey' }} />
                    </TouchableOpacity>
                }
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: this.state.profile }} style={[{ height: 70, width: 70, borderRadius: 35, borderWidth: 1, borderColor: 'black', marginRight: 5 }, this.state.theme.image]} />
                        <View>
                            <Text style={[{ fontSize: 20, fontWeight: 'bold' }, this.state.theme.text]}>{this.state.username}</Text>
                            <Text style={{ fontSize: 15, fontStyle: 'italic', color: 'grey' }}>{this.state.fullname}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {this.renderStreak()}
                                <Icon icon={faGem} size={20} style={this.state.theme.icon} />
                                <Text style={this.state.theme.text}>{this.state.points}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        {this.state.following !== null && this.renderFollow()}
                        {this.state.following === null &&
                            <TouchableOpacity onPress={() => { console.log('trying to go to settings '); this.props.screenProps.push('Settings') }}>
                                <Icon icon={faCog} size={30} style={this.state.theme.icon} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <ScrollView style={{ height: '100%', borderRadius: 10 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flexWrap: 'wrap', width: winWidth - 40, justifyContent: 'space-between', height: '100%', flexDirection: 'row' }}>
                        {this.state.videos.map((video, index) => this.renderVideoItem(video, index))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
