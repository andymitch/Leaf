import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions, StatusBar } from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { NavigationEvents } from 'react-navigation'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'

import { Ionicons } from '@expo/vector-icons'
import styles from '../styles/styles'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient'
const { width: winWidth, height: winHeight } = Dimensions.get('window')
const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants

export default class ChatCam extends Component {
    camera = null
    state = {
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.front,
        flashMode: Camera.Constants.FlashMode.off,
        blurred: false
    }

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA)
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted')
        this.setState({ hasCameraPermission })
    }

    setFlashMode = flashMode => this.setState({ flashMode })
    setCameraType = cameraType => this.setState({ cameraType })

    handleCapture = async () => {
        // REQ GOES HERE
        this.props.goBack()
    }

    renderCamera = (cameraType, flashMode) => {
        if (this.state.blurred) return null
        return (
            <Camera
                type={cameraType}
                flashMode={flashMode}
                style={{ backgroundColor: 'black', height: winWidth*2, width: winWidth, position: 'absolute' }}
                ref={camera => this.camera = camera}
                ratio={'18:9'}
            />
        )
    }

    render() {
        const { hasCameraPermission, flashMode, capturing } = this.state

        if (hasCameraPermission === null) return <View />
        if (hasCameraPermission === false) return <Text>Access to camera has been denied.</Text>
        return(
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true })}
                />
                <View style={{width: 340, height: 340, top: (winHeight/2)-170, position: 'absolute', borderRadius: 170, borderWidth: 3, borderColor: 'white', zIndex: 1, left: (winWidth/2)-170}}/>
                {this.renderCamera(this.state.cameraType, this.state.flashMode)}
                <LinearGradient
                    colors={['rgba(0,0,0,0)','rgba(0,0,0,.8)', 'rgba(0,0,0,1)']}
                    style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', bottom: 0, width: winWidth, height: 70, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.goBack()}>
                        <Icon icon={faTimes} size={30} style={{color: 'white'}}/>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={() => this.handleCapture}>
                        <View style={styles.captureBtn}>
                            {capturing && <View style={styles.captureBtnInternal} />}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={() => this.setFlashMode(flashMode === CameraFlashModes.torch ? CameraFlashModes.off : CameraFlashModes.torch)}>
                        <Ionicons name={flashMode == CameraFlashModes.torch ? "md-flash" : 'md-flash-off'} color="white" size={30} />
                    </TouchableOpacity>
                </LinearGradient>
                <StatusBar hidden />
            </View>
        )
    }
}