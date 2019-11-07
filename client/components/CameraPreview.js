import React, {Component} from 'react'
import {View, Image, TouchableOpacity, Dimensions, Text, TextInput} from 'react-native'
import {Video} from 'expo-av'

//AUTH TOKEN AND AXIOS
import Axios from 'axios'
import {AUTH_TOKEN} from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN

//STYLES AND ICONS
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft, faPaperPlane, faMicrophone, faMicrophoneSlash, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/styles'
const {width: winWidth, height: winHeight} = Dimensions.get('window')

export default class Preview extends Component{
    state = {
        media: this.props.navigation.getParam('media','not found'),
        mute: false,
        caption: ''
    }

    getMedia = isVideo => {
        if(isVideo){
            return(
                <Video
                    source={{uri: this.state.media.uri}}
                    rate={1.0}
                    volume={3.0}
                    isMuted={this.state.mute}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{width: winWidth, height: winWidth}}
                />
            )
        }else{
            return(
                <Image style={[styles.preview,{backgroundColor: 'black', top: 70}]} source={{uri: this.state.media.uri}} height={winWidth} width={winWidth}/>
            )
        }
    }

    render(){
        const muteIcon = this.state.mute ? faMicrophone : faMicrophoneSlash
        return(
            <React.Fragment>
                <View style={{backgroundColor: 'black', height: winHeight}}>
                    <View style={[styles.inline,{zIndex: 1}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon icon={faArrowLeft} style={{color: 'white'}} size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState(prev => ({mute: !prev.mute}))}>
                            <Icon icon={muteIcon} style={{color: 'white'}} size={30}/>
                        </TouchableOpacity>
                    </View>
                    {this.getMedia(this.props.navigation.getParam('isVideo', false))}
                    <View style={{bottom: 0, position: 'absolute', height: winWidth-119, width: winWidth}}>
                        <View style={[styles.inline,{justifyContent: 'flex-start', padding: 0}]}>
                            <Text style={{color: 'white', fontSize: 25}}>Location</Text>
                            <TouchableOpacity onPress={() => console.log('GET LOCATION')} style={{margin: 10}}>
                                <Icon icon={faMapMarkerAlt} style={{color: 'white'}} size={30}/>
                            </TouchableOpacity>
                            <TextInput
                                onChangeText={location => this.setState({location: location})}
                                style={{borderColor: 'white', borderWidth: 2, borderRadius: 20, padding: 5, paddingLeft: 10, color: 'white', fontSize: 20, width: winWidth/2}}
                                autoCapitalize='words'
                                placeholder='optional...'
                                placeholderTextColor='#999'
                            />
                        </View>
                        <Text style={{color: 'white', fontSize: 25}}>Caption</Text>
                        <TextInput
                            multiline
                            maxHeight={140}
                            maxLength={280}
                            onChangeText={caption => this.setState({caption: caption})}
                            style={{borderColor: 'white', borderWidth: 2, borderRadius: 20, padding: 5, paddingLeft: 10, color: 'white', fontSize: 20}}
                            autoCapitalize='sentences'
                            placeholder='type something...'
                            placeholderTextColor='#999'
                        />
                        <TouchableOpacity onPress={() => console.log('IMAGE POSTED')} style={{alignSelf: 'flex-end', margin: 10, position: 'absolute', bottom: 0}}>
                            <Icon icon={faPaperPlane} style={{color: 'white'}} size={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </React.Fragment>
        )
    }
}