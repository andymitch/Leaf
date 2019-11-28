import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import { Container, Content, Tab, Tabs, TabHeading } from 'native-base'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationEvents } from 'react-navigation'
import { createTransition, SlideUp, SlideDown } from 'react-native-transition'

// ICONS
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faStream, faFire, faHeart, faTrophy, faUserFriends, faUpload } from '@fortawesome/free-solid-svg-icons'
const { height: winHeight, width: winWidth } = Dimensions.get('window')
const Transition = createTransition()
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
import { Video } from 'expo-av'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN


class FeedContent extends Component {
    state = {
        feed: [],
        isLoading: true
    }

    render() {
        const whatList = this.props.leaderboard ? faTrophy : faUserFriends
        if (!this.props.item) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size='large' color='blue' animated />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'cadetblue', width: winWidth }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: winWidth, zIndex: 1, padding: 20 }}>
                    <Icon icon={whatList} size={30} style={{ color: 'white' }} />
                </View>

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
                    <Icon icon={faHeart} size={30} style={{ color: 'white' }} />
                </LinearGradient>
            </View>
        )
    }
}

export default class Feed extends Component {
    state = {
        items: [{
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'BillyBob',
            location: 'Boulder, Colorado',
            content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
            caption: 'My first post!',
            likes: 12
        }, {
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'Fineas',
            location: 'Boulder, Colorado',
            content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
            caption: 'My first post!',
            likes: 12
        }, {
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'Gary',
            content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
            caption: 'My first post!',
            likes: 12
        }],
        index: 0,
        blured: false
    }

    onSwipe = (gName, gState) => {
        console.log('swiping: ' + gName)
        if (gName === swipeDirections.SWIPE_UP)
            if (this.state.index < this.state.items.length - 1)
                this._transition.show(
                    this.renderContent(this.state.index+1),
                    SlideUp
                )
                this.setState(prev => ({ index: prev.index + 1 }))
        if (gName === swipeDirections.SWIPE_DOWN)
            if (this.state.index > 0)
                this._transition.show(
                    this.renderContent(this.state.index-1),
                    SlideDown
                )
                this.setState(prev => ({ index: prev.index - 1 }))
    }

    renderContent = (index) => {
        if(this.state.blured) return null
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        }
        return (
            <GestureRecognizer onSwipe={this.onSwipe} config={config} style={{ flex: 1 }}>
                <FeedContent leaderboard={true} item={this.state.items[index]} />
            </GestureRecognizer>
        )
    }

    render() {
        console.log(this.state.index)

        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents
                    onWillFocus={() => this.setState({blured: false})}
                    onDidBlur={() => this.setState({blured: true})}
                />
                <Transition ref={(node) => { this._transition = node; }}>
                    {this.renderContent(this.state.index)}
                </Transition>
            </View>
        )
    }
}