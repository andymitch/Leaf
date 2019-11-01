import React from 'react'
import {View, Text, Dimensions, TouchableOpacity} from 'react-native'
import {Camera} from 'expo-camera'
import * as Permissions from 'expo-permissions'
import Axios from 'axios'

import Toolbar from './CameraToolbar'
import Gallery from './CameraGallery'
//AUTH TOKEN
import {AUTH_TOKEN} from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN

//ICONS, STYLES
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import {faArrowLeft, faBolt} from '@fortawesome/free-solid-svg-icons'
import {Ionicons} from '@expo/vector-icons'
import styles from '../styles/styles'

const { width: winWidth, height: winHeight } = Dimensions.get('window')
const {FlashMode: CameraFlashModes} = Camera.Constants

export default class CameraPage extends React.Component {
    camera = null;
    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });
    handleCaptureOut = () => {
        if(this.state.capturing){
            this.camera.stopRecording()
        }
    };
    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };
    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    getRatios = async () => {const ratios = await this.camera.getSupportedRatios()}

    async componentDidMount(){
        console.log('token from camera:')
        console.log(AUTH_TOKEN)
        //if(!AUTH_TOKEN) this.props.navigation.navigate('LoginRegister')
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
        this.setState({ hasCameraPermission });
    };

    componentDidUpdate(){
        if(this.state.captures.length > 0) this.props.navigation.push('CameraPreview',{image: this.state.captures[0]})
    }

    render(){
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if(hasCameraPermission === null) return <View/>
        if(hasCameraPermission === false) return <Text>Access to camera has been denied.</Text>
        return(
            <React.Fragment>
                <View>

                    <View style={[styles.inline,{zIndex: 1}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Icon icon={faArrowLeft} style={{color: 'white'}} size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setFlashMode(flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on)}>
                            <Ionicons name={flashMode == CameraFlashModes.on ? "md-flash" : 'md-flash-off'} color="white" size={30}/>
                        </TouchableOpacity>
                    </View>

                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={[styles.preview,{backgroundColor: 'black'}]}
                        ref={camera => this.camera = camera}
                        ratio={'18:9'}
                    />
                </View>

                {captures.length > 0 && <Gallery captures={captures}/>}

                <Toolbar
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};