import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Camera} from 'expo-camera'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import Toolbar from './CameraToolbar'

//ICONS, STYLES
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {Ionicons} from '@expo/vector-icons'
import styles from '../styles/styles'

const {FlashMode: CameraFlashModes} = Camera.Constants

export default class CameraView extends React.Component {
    camera = null;
    state = {
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    };

    setFlashMode = (flashMode) => this.setState({flashMode});
    setCameraType = (cameraType) => this.setState({cameraType});
    handleCaptureIn = () => this.setState({capturing: true});
    handleCaptureOut = () => {if(this.state.capturing) this.camera.stopRecording()};
    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync()
        this.setState({ capturing: false})
        this.props.navigation.push('CameraPreview', {media: photoData, isVideo: false})
    };
    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync()
        this.setState({ capturing: false})
        this.props.navigation.push('CameraPreview', {media: videoData, isVideo: true})
    };

    fromCameraRoll = async () => {
        const roll = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(roll.status === 'granted'){
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [1, 1],
              });
              console.log(result)
              if(!result.cancelled)
                  this.props.navigation.push('CameraPreview', {media: result, isVideo: result.type === 'video'})
        }
    };

    async componentDidMount(){
        //if(!AUTH_TOKEN) this.props.navigation.navigate('LoginRegister')
        const camera = await Permissions.askAsync(Permissions.CAMERA)
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted')
        this.setState({hasCameraPermission})
    };

    render(){
        const {hasCameraPermission, flashMode, cameraType, capturing} = this.state

        if(hasCameraPermission === null) return <View/>
        if(hasCameraPermission === false) return <Text>Access to camera has been denied.</Text>
        return(
            <React.Fragment>
                <View style={{backgroundColor: 'black'}}>

                    <View style={[styles.inline,{zIndex: 1, backgroundColor:  'rgba(0, 0, 0, .5)'}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Icon icon={faTimes} style={{color: 'white'}} size={30}/>
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

                <Toolbar
                    fromCameraRoll={this.fromCameraRoll}
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