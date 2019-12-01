import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, Dimensions, StatusBar } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationEvents } from 'react-navigation'
import { createTransition, SlideUp, SlideDown, SlideLeft, SlideRight } from 'react-native-transition'

// ICONS
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faStream, faFire, faHeart, faTrophy, faUserFriends } from '@fortawesome/free-solid-svg-icons'

const { height: winHeight, width: winWidth } = Dimensions.get('window')
const Transition = createTransition()
import List from './List'
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
import { Video } from 'expo-av'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN
const _feed = new Array(15).fill({
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'BillyBob',
    content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
    caption: 'My first post!',
    likes: 12
})

class FeedContent extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black', width: winWidth }}>
                <Video
                    resizeMode='cover'
                    shouldPlay
                    isLooping
                    rate={1.0}
                    volume={3.0}
                    source={{ uri: this.props.item.content }}
                    style={{ width: winWidth, height: winHeight, position: 'absolute' }}
                />
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                    style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: winWidth, bottom: 0, position: 'absolute', zIndex: 1, padding: 20 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: this.props.item.profile }} style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'white', marginRight: 5 }} />
                            <Text style={{ fontSize: 30, color: 'white' }}>{this.props.item.name}</Text>
                        </View>
                        <Text style={{ color: 'white' }}>{this.props.item.caption}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 18, marginRight: 5 }}>{this.props.item.likes}</Text>
                        <Icon icon={faHeart} size={30} style={{ color: 'white' }} />
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

export default class Feed extends Component {
    state = {
        popular: _feed,
        following: _feed,
        //popular: [],
        //following: [],
        popularIndex: 0,
        followingIndex: 0,
        onPopular: false,
        blurred: false,
        isLoading: true,
        gotoLeaderboard: false,
        gotoFollowing: false
    }

    componentDidMount() {
        this.getFeed(true, 'popular')
        this.getFeed(true, 'following')
    }

    onSwipe = (gName) => {
        if (gName === swipeDirections.SWIPE_UP) {
            if (this.state.onPopular) {
                if (this.state.popularIndex < this.state.popular.length - 1) {
                    this._transition.show(this.renderContent(this.state.popularIndex + 1), SlideUp)
                    this.setState(prev => ({ popularIndex: prev.popularIndex + 1 }))
                    if (this.state.popularIndex > this.state.popular.length - 3) this.getFeed(false, 'popular')
                }
            } else {
                if (this.state.followingIndex < this.state.following.length - 1) {
                    this._transition.show(this.renderContent(this.state.followingIndex + 1), SlideUp)
                    this.setState(prev => ({ followingIndex: prev.followingIndex + 1 }))
                    if (this.state.followingIndex > this.state.following.length - 3) this.getFeed(false, 'following')
                }
            }
        }
        if (gName === swipeDirections.SWIPE_DOWN) {
            if (this.state.onPopular) {
                if (this.state.popularIndex > 0) {
                    this._transition.show(this.renderContent(this.state.popularIndex - 1), SlideDown)
                    this.setState(prev => ({ popularIndex: prev.popularIndex - 1 }))
                } else {
                    this.getFeed(true, 'popular')
                }
            } else {
                if (this.state.followingIndex > 0) {
                    this._transition.show(this.renderContent(this.state.followingIndex - 1), SlideDown)
                    this.setState(prev => ({ followingIndex: prev.followingIndex - 1 }))
                } else {
                    this.getFeed(true, 'following')
                }
            }

        }
    }

    getFeed = async (refresh, from) => {
        this.setState({ isLoading: true })
        if (from === 'popular') {
            if (refresh) this.setState({ popular: _feed, isLoading: false })
            else this.setState(prev => ({ popular: [...prev.popular, ..._feed], isLoading: false }))
        } else {
            if (refresh) this.setState({ following: _feed, isLoading: false })
            else this.setState(prev => ({ following: [...prev.following, ..._feed], isLoading: false }))
        }
        /*
        await Axios.get(`https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/feed`, { params: { from: from } })
            .then(res => {
                if (from === 'popular') {
                    if (refresh) this.setState({ popular: res.data, isLoading: false })
                    else this.setState(prev => ({ popular: [...prev.popular, ...res.data], isLoading: false }))
                } else {
                    if (refresh) this.setState({ following: res.data, isLoading: false })
                    else this.setState(prev => ({ following: [...prev.following, ...res.data], isLoading: false }))
                }
            }).catch(err => console.log(err))
        */
    }

    renderContent = () => {
        if (this.state.loading) return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'black' }}>
                <ActivityIndicator size='large' color='blue' animated />
            </View>
        )
        const config = { velocityThreshold: 0.3, directionalOffsetThreshold: 80 }
        if (this.state.onPopular) {
            return (
                <GestureRecognizer onSwipe={this.onSwipe} config={config} style={{ flex: 1, backgroundColor: 'black' }}>
                    <FeedContent leaderboard={true} item={this.state.popular[this.state.popularIndex]} />
                </GestureRecognizer>
            )
        } else {
            return (
                <GestureRecognizer onSwipe={this.onSwipe} config={config} style={{ flex: 1, backgroundColor: 'black' }}>
                    <FeedContent leaderboard={false} item={this.state.following[this.state.followingIndex]} />
                </GestureRecognizer>
            )
        }
    }

    goBack = () => {
        this.setState({ gotoFollowing: false, gotoLeaderboard: false })
    }

    render() {
        if (this.state.blurred) return (
            <View>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true })}
                />
            </View>
        )
        if (this.state.gotoFollowing) return <List leaderboard={false} goBack={this.goBack} />
        if (this.state.gotoLeaderboard) return <List leaderboard={true} goBack={this.goBack} />
        const whatList = this.state.onPopular ? faTrophy : faUserFriends
        const fColor = this.state.onPopular ? 'rgba(210,210,210,.8)' : 'white'
        const pColor = this.state.onPopular ? 'white' : 'rgba(210,210,210,.8)'
        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true })}
                />
                <StatusBar hidden={false} barStyle='light-content' />
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <LinearGradient colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']} style={{ width: winWidth, zIndex: 1, position: 'absolute', top: 0 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: winWidth, padding: 20, top: 20 }}>
                            <TouchableOpacity onPress={() => {
                                if (this.state.onPopular) this.setState({ gotoLeaderboard: true })
                                else this.setState({ gotoFollowing: true })
                            }}>
                                <Icon icon={whatList} size={30} style={{ color: 'white' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: winWidth, top: -20 }}>
                            <TouchableWithoutFeedback style={{ flexDirection: 'row' }} onPress={() => {
                                if (this.state.onPopular) {
                                    this.setState({ onPopular: false })
                                    this._transition.show(this.renderContent(), SlideRight)
                                }
                            }}>
                                <Icon icon={faStream} size={20} style={{ color: fColor, marginRight: 5 }} />
                                <Text style={{ color: fColor }} >Following</Text>
                            </TouchableWithoutFeedback>
                            <Text style={{ color: 'white', fontSize: 30, top: -10 }}> | </Text>
                            <TouchableWithoutFeedback style={{ flexDirection: 'row' }} onPress={() => {
                                if (!this.state.onPopular) {
                                    this.setState({ onPopular: true })
                                    this._transition.show(this.renderContent(), SlideLeft)
                                }
                            }}>
                                <Text style={{ color: pColor }} >Popular</Text>
                                <Icon icon={faFire} size={20} style={{ color: pColor, marginLeft: 2 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </LinearGradient>
                    <Transition ref={(node) => { this._transition = node; }}>
                        {this.renderContent()}
                    </Transition>
                </View>
            </View>
        )
    }
}