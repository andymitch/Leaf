import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, Dimensions, StatusBar } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationEvents } from 'react-navigation'
import { createTransition, SlideUp, SlideDown, SlideLeft, SlideRight } from 'react-native-transition'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faStream, faFire, faTrophy, faUserFriends, faPlay, faBolt } from '@fortawesome/free-solid-svg-icons'

const { height: winHeight, width: winWidth } = Dimensions.get('window')
const Transition = createTransition()

import List from './List'
import Profile from './Profile'

import Axios from 'axios'
import { Video } from 'expo-av'


const popFeed = [{
    id: 1,
    liked: false,
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'popFirst',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'My first post!',
    likes: 12
}, {
    id: 2,
    liked: false,
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'popSecond',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'posty post!',
    likes: 5
}, {
    id: 3,
    liked: true,
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'popThird',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'yupp!',
    likes: 13
}, {
    id: 4,
    liked: false,
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'popFourth',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'okay boomer!',
    likes: 20
}]
const folFeed = [{
    id: 1,
    liked: false,
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'folFirst',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'My first post!',
    likes: 12
}, {
    id: 2,
    liked: false,
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'folSecond',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'posty post!',
    likes: 5
}, {
    id: 3,
    liked: true,
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'folThird',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'yupp!',
    likes: 13
}, {
    id: 4,
    liked: false,
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'folFourth',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'okay boomer!',
    likes: 20
}]

class FeedContent extends Component {
    state = {
        liked: this.props.liked,
        likes: this.props.likes,
        play: true
    }

    async componentWillUnmount() {
        if (this.props.likes < this.state.likes) {
            await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/like', { like: true, id: this.props.id, token: this.props.token })
                .then(() => console.log('liked'))
                .catch(err => console.log('Problem Liking: ' + err))
            this.props.like(this.props.onPopular, this.props.index, 1)
        } else if (this.props.likes > this.state.likes) {
            await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/like', { like: false, id: this.props.id, token: this.props.token })
                .then(() => console.log('unliked'))
                .catch(err => console.log('Problem Unliking: ' + err))
            this.props.like(this.props.onPopular, this.props.index, -1)
        }
    }

    renderPlay = () => {
        if (this.state.play) return null
        return <Icon icon={faPlay} size={200} style={{ color: 'rgba(0,0,0,.2)', left: (winWidth / 2) - 80 }} />
    } 

    render() {
        const boltColor = this.state.liked ? 'yellow' : 'rgba(255, 255, 255, .5)'
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black', width: winWidth }}>
                <Video
                    resizeMode='cover'
                    shouldPlay={this.state.play}
                    isLooping
                    rate={1.0}
                    volume={3.0}
                    source={{ uri: this.props.content }}
                    style={{ width: winWidth, height: winHeight, position: 'absolute' }}
                />

                <View style={{ width: winWidth, height: winHeight - 300, top: 100, position: 'absolute' }}>
                    <TouchableOpacity onPress={() => { this.setState(prev => ({ play: !prev.play })) }} style={{ zIndex: 1, height: winHeight - 300, width: winWidth, alignContent: 'center', justifyContent: 'center' }}>
                        <View style={{ width: winWidth, justifyContent: 'center' }}>
                            {this.renderPlay()}
                        </View>
                    </TouchableOpacity>
                </View>

                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                    style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: winWidth, bottom: 0, position: 'absolute', zIndex: 1, padding: 20 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => this.props.gotoProfile(this.props.name)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: this.props.profile }} style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'white', marginRight: 5 }} />
                            <Text style={{ fontSize: 30, color: 'white' }}>{this.props.name}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'white' }}>{this.props.caption}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 18, marginRight: 5 }}>{this.state.likes}</Text>
                        <TouchableOpacity onPress={() => {
                            if (this.state.liked) this.setState(prev => ({ likes: prev.likes - 1 }))
                            else this.setState(prev => ({ likes: prev.likes + 1 }))
                            this.setState(prev => ({ liked: !prev.liked }))
                        }}>
                            <Icon icon={faBolt} size={30} style={{ color: boltColor }} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

export default class Feed extends Component {
    state = {
        popular: [],
        following: [],
        popularIndex: 0,
        followingIndex: 0,
        onPopular: false,
        blurred: false,
        isLoading: true,
        gotoLeaderboard: false,
        gotoFollowing: false,
        gotoProfile: null,
        noMore: false
    }

    componentDidMount() {
        this.getFeed(true, 'popular')
        this.getFeed(true, 'following')
    }

    getFeed = async (refresh, from) => {
        this.setState({ isLoading: true })
        await Axios.get(`https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/feed?from=${from}&token=${this.props.screenProps.token}`)
            .then(res => {
                console.log(res)
                if(res.data.length < 5) this.setState({noMore: true})
                if (from === 'popular') {
                    if (refresh) this.setState({ popular: res.data, isLoading: false })
                    else this.setState(prev => ({ popular: [...prev.popular, ...res.data], isLoading: false }))
                } else {
                    if (refresh) this.setState({ following: res.data, isLoading: false })
                    else this.setState(prev => ({ following: [...prev.following, ...res.data], isLoading: false }))
                }
            }).catch(err => console.log(err))
    }

    onSwipe = gName => {
        if (gName === swipeDirections.SWIPE_UP) {
            if (this.state.onPopular) {
                if (this.state.popularIndex < this.state.popular.length - 1) {
                    this._transition.show(this.renderContent(this.state.popularIndex + 1, true), SlideUp)
                    this.setState(prev => ({ popularIndex: prev.popularIndex + 1 }))
                    if (this.state.popularIndex > this.state.popular.length - 3 && !this.state.noMore) this.getFeed(false, 'popular')
                }
            } else {
                if (this.state.followingIndex < this.state.following.length - 1) {
                    this._transition.show(this.renderContent(this.state.followingIndex + 1, false), SlideUp)
                    this.setState(prev => ({ followingIndex: prev.followingIndex + 1 }))
                    if (this.state.followingIndex > this.state.following.length - 3 && !this.state.noMore) this.getFeed(false, 'following')
                }
            }
        }
        if (gName === swipeDirections.SWIPE_DOWN) {
            if (this.state.onPopular) {
                if (this.state.popularIndex > 0) {
                    this._transition.show(this.renderContent(this.state.popularIndex - 1, true), SlideDown)
                    this.setState(prev => ({ popularIndex: prev.popularIndex - 1 }))
                } else {
                    console.log('refreshing...')
                    this.getFeed(true, 'popular')
                }
            } else {
                if (this.state.followingIndex > 0) {
                    this._transition.show(this.renderContent(this.state.followingIndex - 1, false), SlideDown)
                    this.setState(prev => ({ followingIndex: prev.followingIndex - 1 }))
                } else {
                    console.log('refreshing...')
                    this.getFeed(true, 'following')
                }
            }

        }
    }

    goBack = () => { this.setState({ gotoFollowing: false, gotoLeaderboard: false, gotoProfile: null }) }

    gotoProfile = username => { this.setState({ gotoProfile: username }) }

    like = (isPopular, index, liked) => {
        if (isPopular) {
            temp = this.state.popular
            temp[index].likes += liked
            temp[index].liked = liked > 0 ? true : false
            this.setState({ popular: temp })
        } else {
            temp = this.state.following
            temp[index].likes += liked
            temp[index].liked = liked > 0 ? true : false
            this.setState({ following: temp })
        }
    }

    loading = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'black' }}>
                <ActivityIndicator size='large' color='blue' animated />
            </View>
        )
    }

    renderContent = (index, pop) => {
        const config = { velocityThreshold: 0.3, directionalOffsetThreshold: 80 }
        if (pop) {
            return (
                <GestureRecognizer onSwipe={this.onSwipe} config={config} style={{ flex: 1, backgroundColor: 'black' }}>
                    <FeedContent token={this.props.screenProps.token} gotoProfile={this.gotoProfile} like={this.like} onPopular={true} index={index} {...this.state.popular[index]} />
                </GestureRecognizer>
            )
        } else {
            return (
                <GestureRecognizer onSwipe={this.onSwipe} config={config} style={{ flex: 1, backgroundColor: 'black' }}>
                    <FeedContent token={this.props.screenProps.token} gotoProfile={this.gotoProfile} like={this.like} onPopular={false} index={index} {...this.state.following[index]} />
                </GestureRecognizer>
            )
        }
    }

    render() {
        if (this.state.isLoading) return this.loading()
        if (this.state.blurred) return (
            <View>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true, gotoFollowing: false, gotoLeaderboard: false, gotoProfile: null })}
                />
            </View>
        )
        if (this.state.gotoProfile !== null) return (
            <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true, gotoFollowing: false, gotoLeaderboard: false, gotoProfile: null })}
                />
                <Profile  screenProps={{theme: this.props.screenProps.theme, token: this.props.screenProps.token}} username={this.state.gotoProfile} goBack={this.goBack} />
            </View>
        )
        if (this.state.gotoFollowing) return (
            <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true, gotoFollowing: false, gotoLeaderboard: false, gotoProfile: null })}
                />
                <List theme={this.props.screenProps.theme} token={this.props.screenProps.token} leaderboard={false} gotoProfile={this.gotoProfile} goBack={this.goBack} />
            </View>

        )
        if (this.state.gotoLeaderboard) return (
            <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true, gotoFollowing: false, gotoLeaderboard: false, gotoProfile: null })}
                />
                <List theme={this.props.screenProps.theme} token={this.props.screenProps.token} leaderboard={true} gotoProfile={this.gotoProfile} goBack={this.goBack} />
            </View>
        )

        const whatList = this.state.onPopular ? faTrophy : faUserFriends
        const fColor = this.state.onPopular ? 'rgba(210,210,210,.8)' : 'white'
        const pColor = this.state.onPopular ? 'white' : 'rgba(210,210,210,.8)'
        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true })}
                />
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <LinearGradient colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']} style={{ width: winWidth, zIndex: 1, position: 'absolute', top: 0 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: winWidth, padding: 20, top: 20 }}>
                            <TouchableOpacity onPress={() => {
                                if (this.state.onPopular) this.setState({ gotoLeaderboard: true })
                                else this.setState({ gotoFollowing: true })
                            }}>
                                <Icon icon={whatList} size={30} style={{ color: 'rgba(255,255,255,.8)' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: winWidth, top: -20 }}>
                            <TouchableWithoutFeedback style={{ flexDirection: 'row' }} onPress={() => {
                                if (this.state.onPopular) {
                                    this.setState({ onPopular: false })
                                    this._transition.show(this.renderContent(this.state.followingIndex, false), SlideRight)
                                }
                            }}>
                                <Icon icon={faStream} size={20} style={{ color: fColor, marginRight: 5 }} />
                                <Text style={{ color: fColor }} >Following</Text>
                            </TouchableWithoutFeedback>
                            <Text style={{ color: 'white', fontSize: 30, top: -10 }}> | </Text>
                            <TouchableWithoutFeedback style={{ flexDirection: 'row' }} onPress={() => {
                                if (!this.state.onPopular) {
                                    this.setState({ onPopular: true })
                                    this._transition.show(this.renderContent(this.state.popularIndex, true), SlideLeft)
                                }
                            }}>
                                <Text style={{ color: pColor }} >Popular</Text>
                                <Icon icon={faFire} size={20} style={{ color: pColor, marginLeft: 2 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </LinearGradient>
                    <Transition ref={(node) => { this._transition = node; }}>
                        {this.renderContent(0, false)}
                    </Transition>
                </View>
            </View>
        )
    }
}
