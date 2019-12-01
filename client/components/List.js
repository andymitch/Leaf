import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, Dimensions, StatusBar } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationEvents } from 'react-navigation'
import { createTransition, SlideUp, SlideDown, SlideLeft, SlideRight } from 'react-native-transition'

// ICONS
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faGem } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const { height: winHeight, width: winWidth } = Dimensions.get('window')
const Transition = createTransition()
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
import { Video } from 'expo-av'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN

class Avatar extends Component {
    render() {
        return (
            <View style={{ margin: 10, justifyContent: 'center'}}>
                <Image source={{ uri: this.props.item.profile }} style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black', marginRight: 5 }} />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.props.item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon icon={faGem} size={15} style={{ marginRight: 2 }} />
                    <Text>{this.props.item.points}</Text>
                </View>
            </View>
        )
    }
}

class Leaderboard extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row'  }}>
                {this.props.items.map((item, index) => { return(
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 2 }}>{index+1}.</Text>
                        <Avatar item={item} />
                    </View>
                )})}
            </View>
        )
    }
}

class Following extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {this.props.items.map(item => { return <Avatar item={item} /> })}
            </View>
        )
    }
}

export default class List extends Component {
    state = {
        items: [{
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'BillyBob',
            points: 1032
        }, {
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'BobbyBoi',
            points: 435
        }, {
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'Fineas',
            points: 231
        }, {
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'DemBoiz',
            points: 56
        }, {
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'idk',
            points: 18
        }]
    }

    render() {
        if (this.props.leaderboard) return (
            <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => this.props.goBack()}>
                        <Icon icon={faTimes} size={30} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Leaderboard</Text>
                </View>
                <Leaderboard items={this.state.items} />
            </View>
        )
        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 20 }}>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => this.props.goBack()}>
                        <Icon icon={faTimes} size={30} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Following</Text>
                </View>
                <Following items={this.state.items} />
            </View>
        )
    }
}