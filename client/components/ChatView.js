import React, { Component } from 'react'
import { View, Text, Dimensions, FlatList, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Video } from 'expo-av'
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN
import ChatCam from './ChatCam'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faVideo } from '@fortawesome/free-solid-svg-icons'
const { height: winHeight, width: winWidth } = Dimensions.get('window')


export default class ChatView extends Component {
    state = {
        messages: this.props.navigation.getParam('messages', []),
        index: this.props.navigation.getParam('myIndex', 0),
        play: true
    }

    postMessage = async uri => {
        // FOR TESTING PURPOSES
        console.log(`posting: ${uri} to group chat: ${this.props.navigation.getParam('id')}`)
        let temp = this.state.messages
        temp.push({
            username: 'andymitch559',
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            content: uri
        })
        this.setState({messages: temp})
        /*
        await Axios.post('/chat', {uri: uri, id: this.props.navigation.getParam('id')})
        .then(res => {
            let temp = this.state.messages
            temp.push(res.data)
            this.setState({messages: temp})
        })
        .catch(err => console.log(err))
        */
    }

    reel = () => {
        let datReel = [...this.state.messages, null]
        return (
            <View style={{ bottom: 0, position: 'absolute' }}>
                <ScrollView horizontal style={{ width: winWidth }}>
                    {datReel.map((video, index) => {
                        if (video === null) {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.setState({ index: index })} style={{ height: 100, width: 100, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon icon={faVideo} style={{ color: 'gainsboro' }} size={30} />
                                </TouchableOpacity>
                            )
                        }
                        return (
                            <TouchableOpacity key={index} onPress={() => this.setState({ index: index })} style={{ width: 100, height: 100, backgroundColor: 'black' }}>
                                <Video resizeMode='cover' shouldPlay={false} source={{ uri: video.content }} style={{ width: 100, height: 100, position: 'absolute' }} />
                                <View style={{ position: 'absolute' }}>
                                    <Image source={{ uri: video.profile }} style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'white' }} />
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>{video.username}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    _onPlaybackStatusUpdate = ps => {
        if (ps.didJustFinish) this.setState(prev => ({ index: prev.index + 1 }))
    }

    render() {
        if (this.state.index < this.state.messages.length) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ position: 'absolute', margin: 20, marginTop: 40, zIndex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon icon={faTimes} style={{ color: 'white' }} size={30} />
                        </TouchableOpacity>
                    </View>
                    <Video
                        resizeMode='cover'
                        shouldPlay
                        rate={1.0}
                        volume={3.0}
                        source={{ uri: this.state.messages[this.state.index].content }}
                        style={{ width: winWidth, height: winHeight, position: 'absolute', top: 0 }}
                        ref={this._handleVideoRef}
                        onPlaybackStatusUpdate={ps => this._onPlaybackStatusUpdate(ps)}
                    />
                    {this.reel()}
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ position: 'absolute', margin: 20, zIndex: 1 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon icon={faTimes} style={{ color: 'white' }} size={30} />
                    </TouchableOpacity>
                </View>
                <ChatCam postMessage={this.postMessage} />
                {this.reel()}
            </View>
        )
    }
}