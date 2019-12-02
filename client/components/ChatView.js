import React, { Component } from 'react'
import { View, Text, Dimensions, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Video } from 'expo-av'
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN
import ChatCam from './ChatCam'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
const { height: winHeight, width: winWidth } = Dimensions.get('window')

export default class ChatView extends Component {
    state = {
        messages: this.props.messages,
        index: this.props.videoIndex
    }

    componentDidMount() {
        setTimeout(() => this._scrollView.scrollTo({ x: (index * 60) + 30, y: 0 }), 0);
    }

    postMessage = async message => {
        await Axios.post('/chat', { uri: message })
    }

    reel = () => {
        return (
            <ScrollView ref={(view) => this._scrollView = view} horizontal contentContainerStyle={{ width: winWidth, height: 60, alignContent: 'center', bottom: 0 }}>
                {this.state.messages.map((message, i) => {
                    <TouchableOpacity onPress={() => this.setState({ index: i })}>
                        <Video resizeMode='cover' shouldPlay={false} source={{ uri: message.content }} style={{ width: 60, height: 60, position: 'absolute' }} />
                        <View style={{ position: 'absolute' }}>
                            <Image source={{ uri: message.profile }} style={{ height: 20, width: 20, borderRadius: 10, borderWidth: 1, borderColor: 'white' }} />
                            <Text style={{ fontWeight: 'bold' }}>{message.name}</Text>
                        </View>
                    </TouchableOpacity>
                })}
            </ScrollView>
        )
    }

    _onPlaybackStatusUpdate = playbackStatus => {
        if (playbackStatus.didJustFinish) this.setState(prev => ({ index: prev.index + 1 }))
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Icon icon={faTimes} style={{color:'white', position: 'absolute', margin: 20}} size={30}/>
                {this.state.index < this.state.messages.length ?
                    <Video
                        resizeMode='cover'
                        shouldPlay={this.state.play}
                        isLooping
                        rate={1.0}
                        volume={3.0}
                        source={{ uri: this.state.messages[this.state.index] }}
                        style={{ width: winWidth, height: winHeight, position: 'absolute' }}
                        ref={this._handleVideoRef}
                        onPlaybackStatusUpdate={ps => this._onPlaybackStatusUpdate(ps)}
                    />
                    :
                    <ChatCam postMessage={this.postMessage}/>
                }
                {this.reel()}
            </View>
        )
    }
}