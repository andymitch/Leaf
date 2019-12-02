import React, { Component } from 'react'
import { View, TouchableOpacity, Dimensions, Text, TextInput, ToastAndroid, StatusBar } from 'react-native'
import { Video } from 'expo-av'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { LinearGradient } from 'expo-linear-gradient'
import MovToMp4 from "react-native-mov-to-mp4"

//AUTH TOKEN, AXIOS
import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN

//STYLES AND ICONS
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faPaperPlane, faVolumeUp, faVolumeMute, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/styles'
import { locBtn } from '../styles/style'

const { width: winWidth, height: winHeight } = Dimensions.get('window')

export default class Preview extends Component {
    state = {
        uri: this.props.navigation.getParam('uri', 'not found'),
        mute: false,
        caption: null,
        location: null,
        hasPermission: null,
        uploadUrl: null
    }

    muteBtn = () => {
        const muteIcon = this.state.mute ? faVolumeUp : faVolumeMute
        return (
            <TouchableOpacity onPress={() => this.setState(prev => ({ mute: !prev.mute }))}>
                <Icon icon={muteIcon} style={{ color: 'white' }} size={30} />
            </TouchableOpacity>
        )
    }

    getMedia = () => {

        if (!this.state.uri) {
            return null
        }
        console.log(this.state.uri)
        return (
            <Video
                source={{ uri: this.state.uri }}
                rate={1.0}
                volume={3.0}
                isMuted={this.state.mute}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: winWidth, height: winWidth }}
            />
        )
    }

    getLocation = async () => {
        this.setState({ location: '...' })
        const permission = await Permissions.askAsync(Permissions.LOCATION)
        console.log(permission.status)
        const hasPermission = (permission.status === 'granted')
        this.setState({ hasPermission })
        if (hasPermission) {
            const geolocation = (await Location.getCurrentPositionAsync({}))
            const placelocation = (await Location.reverseGeocodeAsync(geolocation.coords))[0]
            const location = placelocation.isoCountryCode === 'US' ? `${placelocation.city}, ${placelocation.region}` : `${placelocation.city}, ${placelocation.isoCountryCode}`
            this.setState({ location })
            console.log(location)
        } else alert('Leaf needs permission to use location services.')
    }

    upload = async () => {

        // Create entry for video in Database
        let temp = null;
        await Axios.post('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/upload', {
            caption: this.state.caption,
            token: AUTH_TOKEN,
            location: this.state.location,
            system: Platform.OS
        })
            // Need some values that are returned so assign to object...
            .then(res => (
                temp = res
            ))
            .catch(err => console.log("failure" + err));

        // If our previous request suceeded, actually upload the video
        if (temp.data.uploadUrl != null) {

            // Create codec naming scheme
            let type = null;
            let extension = '.mp4';
            if (Platform.OS === 'ios') {
                type = `video/mov`;
                extension = '.mov'
            }
            else {
                type = `video/mp4`
            }

            // Create actual file
            const file = {
                uri: this.state.uri,
                name: temp.data.name + extension,
                type: type
            };

            // Options for S3 bucket
            const options = {
                keyPrefix: "video/",
                bucket: "leaf-video",
                region: "us-east-1",
                accessKey: "AKIA5WQQ4TUUKGMTDZ7W",
                secretKey: "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",
                successActionStatus: 201
            };

            // Put into S3 Bucket
            RNS3.put(file, options).then(response => {
                if (response.status !== 201)
                    throw new Error("Failed to upload video");
                console.log(response.body);
            })
            ToastAndroid.show('Video posted!', ToastAndroid.SHORT)
        }
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignContent: 'space-between' }}>
                <StatusBar hidden />
                <View style={[styles.inline, { zIndex: 1 }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon icon={faArrowLeft} style={{ color: 'white' }} size={30} />
                    </TouchableOpacity>
                    {this.muteBtn()}
                </View>
                <Video
                    source={{ uri: this.state.uri }}
                    rate={1.0}
                    volume={3.0}
                    isMuted={this.state.mute}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ width: winWidth, height: winHeight, position: 'absolute' }}
                />
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.8)', 'rgba(0,0,0,1)']}
                    style={{ bottom: 0, position: 'absolute', width: winWidth }}>
                    <View style={{ width: winWidth, padding: 0 }}>
                        <Text style={{ color: 'white', fontSize: 25 }}>Location</Text>
                        <View style={{ flexDirection: 'row', height: 45 }}>
                            <TextInput
                                onChangeText={location => this.setState({ location })}
                                style={{ borderColor: 'white', borderWidth: 2, borderRadius: 20, padding: 5, paddingLeft: 40, color: 'white', fontSize: 20, width: winWidth - 80, position: 'absolute' }}
                                autoCapitalize='words'
                                placeholder='location...'
                                placeholderTextColor='#999'
                                textContentType='addressCityAndState'
                                value={this.state.location}
                            />
                            <TouchableOpacity onPress={() => this.getLocation()} style={locBtn}>
                                <Icon icon={faMapMarkerAlt} style={{ color: 'white', bottom: -9, left: 10 }} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ color: 'white', fontSize: 25 }}>Caption</Text>
                    <TextInput
                        multiline
                        maxHeight={100}
                        maxLength={280}
                        onChangeText={caption => this.setState({ caption })}
                        style={{ borderColor: 'white', borderWidth: 2, borderRadius: 20, padding: 5, paddingLeft: 15, color: 'white', fontSize: 20, width: winWidth - 80 }}
                        autoCapitalize='sentences'
                        placeholder='type something...'
                        placeholderTextColor='#999'
                        spellCheck={true}
                    />
                    <View style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.upload()}>
                            <Icon icon={faPaperPlane} style={{ color: 'white', marginRight: 20 }} size={40} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}