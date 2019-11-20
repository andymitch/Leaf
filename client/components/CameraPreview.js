import React, {Component} from 'react'
import {View, Image, TouchableOpacity, Dimensions, Text, TextInput, Switch, ToastAndroid} from 'react-native'
import {Video} from 'expo-av'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

//AUTH TOKEN, AXIOS
import Axios from 'axios'
import {AUTH_TOKEN} from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN

//STYLES AND ICONS
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft, faPaperPlane, faVolumeUp, faVolumeMute, faMapMarkerAlt, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/styles'
import {locBtn} from '../styles/style'

const {width: winWidth, height: winHeight} = Dimensions.get('window')

export default class Preview extends Component{
    state = {
        media: this.props.navigation.getParam('media','not found'),
        mute: false,
        caption: '',
        location: null,
        hasPermission: null,
        private: false
    }

    muteBtn = isVideo => {
        const muteIcon = this.state.mute ? faVolumeUp : faVolumeMute
        if(isVideo){
            return(
                <TouchableOpacity onPress={() => this.setState(prev => ({mute: !prev.mute}))}>
                    <Icon icon={muteIcon} style={{color: 'white'}} size={30}/>
                </TouchableOpacity>
            )
        }else return null
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

    getLocation = async () => {
        this.setState({location: '...'})
        const permission = await Permissions.askAsync(Permissions.LOCATION)
        console.log(permission.status)
        const hasPermission = (permission.status === 'granted')
        this.setState({hasPermission})
        if(hasPermission){
            const geolocation = (await Location.getCurrentPositionAsync({}))
            const placelocation = (await Location.reverseGeocodeAsync(geolocation.coords))[0]
            const location = placelocation.isoCountryCode === 'US' ? `${placelocation.city}, ${placelocation.region}` : `${placelocation.city}, ${placelocation.isoCountryCode}`
            this.setState({location})
            console.log(location)
        }else alert('Leaf needs permission to use location services.')
    }

    upload = async isVideo => {
        let uploadData = new FormData()
        if(isVideo) uploadData.append('media', {type: 'image/jpg', uri: this.state.media.uri})
        else uploadData.append('media', {type: 'video/mp4', uri: this.state.media.uri})

        await fetch('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/upload', {method: 'post', body: uploadData})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        if(isVideo) ToastAndroid.show('Video posted!', ToastAndroid.SHORT)
        else ToastAndroid.show('Image posted!', ToastAndroid.SHORT)
        this.props.navigation.goBack()
    }

    render(){
        const isVideo = this.props.navigation.getParam('isVideo', false)
        return(
            <React.Fragment>
                <View style={{backgroundColor: 'black', height: winHeight}}>
                    <View style={[styles.inline,{zIndex: 1}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon icon={faArrowLeft} style={{color: 'white'}} size={30}/>
                        </TouchableOpacity>
                        {this.muteBtn(isVideo)}
                    </View>
                    {this.getMedia(isVideo)}
                    <View style={{bottom: 0, position: 'absolute', height: winWidth-119, width: winWidth}}>
                        <View style={{width: winWidth, padding: 0}}>
                            <Text style={{color: 'white', fontSize: 25}}>Location</Text>
                            <View style={{flexDirection: 'row', height: 45}}>
                                <TextInput
                                    onChangeText={location => this.setState({location})}
                                    style={{borderColor: 'white', borderWidth: 2, borderRadius: 20, padding: 5, paddingLeft: 40, color: 'white', fontSize: 20, width: winWidth, position: 'absolute'}}
                                    autoCapitalize='words'
                                    placeholder='location...'
                                    placeholderTextColor='#999'
                                    textContentType='addressCityAndState'
                                    value={this.state.location}
                                />
                                <TouchableOpacity onPress={() => this.getLocation()} style={locBtn}>
                                    <Icon icon={faMapMarkerAlt} style={{color: 'white', bottom: -9, left:10}} size={25}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{color: 'white', fontSize: 25}}>Caption</Text>
                        <TextInput
                            multiline
                            maxHeight={100}
                            maxLength={280}
                            onChangeText={caption => this.setState({caption})}
                            style={{borderColor: 'white', borderWidth: 2, borderRadius: 20, padding: 5, paddingLeft: 15, color: 'white', fontSize: 20}}
                            autoCapitalize='sentences'
                            placeholder='type something...'
                            placeholderTextColor='#999'
                            spellCheck={true}
                        />
                        <View style={{alignSelf: 'flex-end', position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: 'white'}}>Private</Text>
                            <TouchableOpacity onPress={() => alert('Private posts can only be seen by followers and yourself.')}>
                                <Icon icon={faInfoCircle} style={{color: '#999', marginLeft: 5}} size={15}/>
                            </TouchableOpacity>
                            <Switch
                                value={this.state.private}
                                style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}], marginHorizontal: 20}}
                                trackColor={{true: 'gainsboro', false: 'dimgrey'}}
                                onValueChange={isPrivate => {
                                    isPrivate ? console.log('private post') : console.log('public post')
                                    this.setState({private: isPrivate})
                                }}
                            />
                            <TouchableOpacity onPress={() => this.upload(isVideo)}>
                                <Icon icon={faPaperPlane} style={{color: 'white', marginRight: 20}} size={40}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </React.Fragment>
        )
    }
}