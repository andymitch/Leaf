import React, { Component } from 'react'
import { View, Text, Dimensions, FlatList, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Video } from 'expo-av'
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN
import ChatCam from './ChatCam'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
const { height: winHeight, width: winWidth } = Dimensions.get('window')


const MessageItems = ({ messages = [] }) => (
    <ScrollView horizontal={true}>
        {messages.map(({ msg }) => (
            <TouchableOpacity onPress={() => this.setState({ index: i })} key={msg.content}>
                <Video resizeMode='cover' shouldPlay={false} source={{ uri: msg.content }} style={{ width: 100, height: 100, position: 'absolute' }} />
                <View style={{ position: 'absolute' }}>
                    <Image source={{ uri: msg.profile }} style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'white' }} />
                    <Text style={{ fontWeight: 'bold' }}>{msg.name}</Text>
                </View>
            </TouchableOpacity>
        ))}
    </ScrollView>
);

export default class ChatView extends Component {
    state = {
        messages: this.props.navigation.getParam('messages', []).messages,
        index: 0,
        play: true
    }

    postMessage = async message => {
        await Axios.post('/chat', { uri: message })
    }

    reel = messages => {
        let contents = [], names = [], profiles = []
        for (msg of messages) {
            contents.push(msg.content)
            names.push(msg.name)
            profiles.push(msg.profile)
        }
        console.log('index: ' + this.state.index)
        return (
            <View style={{bottom: 0, position: 'absolute'}}>
                <FlatList
                    horizontal
                    initialScrollIndex={this.state.index}
                    data={contents}
                    renderItem={({ uri, i }) => (
                        <TouchableOpacity onPress={() => this.setState({ index: 4 })} style={{ width: 100, height: 100, backgroundColor: 'black' }}>
                            <Video resizeMode='cover' shouldPlay={false} source={{ uri: contents[0] }} style={{ width: 100, height: 100, position: 'absolute' }} />
                            <View style={{ position: 'absolute' }}>
                                <Image source={{ uri: profiles[0] }} style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'white' }} />
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>{names[0]}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    _onPlaybackStatusUpdate = playbackStatus => {
        console.log('next')
        if (playbackStatus.didJustFinish) this.setState(prev => ({ index: prev.index + 1 }))
    }

    renderContent = () => {

        if (this.state.index < this.state.messages.length) {
            console.log(this.state.messages[this.state.index].content)
            return (
                <Video
                    resizeMode='cover'
                    shouldPlay={this.state.play}
                    rate={1.0}
                    volume={3.0}
                    source={{ uri: this.state.messages[this.state.index].content }}
                    style={{ width: winWidth, height: winHeight, position: 'absolute', top: 0 }}
                    ref={this._handleVideoRef}
                    onPlaybackStatusUpdate={ps => this._onPlaybackStatusUpdate(ps)}
                />
            )
        }
        return <ChatCam postMessage={this.postMessage} />
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Icon icon={faTimes} style={{ color: 'white', position: 'absolute', margin: 20 }} size={30} />
                {this.renderContent()}
                {this.reel(this.state.messages)}
                {/*<MessageItems messages={this.state.messages}/>*/}
            </View>
        )
    }
}