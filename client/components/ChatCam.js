import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions, StatusBar } from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationEvents } from 'react-navigation'

import { Ionicons } from '@expo/vector-icons'
import styles from '../styles/styles'
const { width: winWidth, height: winHeight } = Dimensions.get('window')
const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants

export default class ChatCam extends Component {
    camera = null
    state = {
        capturing: false,
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
        if (this.state.capturing) {
            this.setState({ capturing: false })
            this.camera.stopRecording()
        } else {
            this.setState({ capturing: true })
            await this.camera.recordAsync({ maxDuration: 10 })
                .then(file => this.props.postMessage(file.uri))
                .catch(err => console.log('OH NO: ' + err))
        }
    }

    renderCamera = (cameraType, flashMode) => {
        if (this.state.blurred) return null
        return (
            <Camera
                type={cameraType}
                flashMode={flashMode}
                style={{ backgroundColor: 'transparent', height: winHeight, width: winWidth, left: 0, right: 0, top: 0, position: 'absolute' }}
                ref={camera => this.camera = camera}
                ratio={'18:9'}
            />
        )
    }

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing } = this.state

        if (hasCameraPermission === null) return <View />
        if (hasCameraPermission === false) return <Text>Access to camera has been denied.</Text>
        return (
            <View style={{height: winHeight-100}}>
                <NavigationEvents
                    onWillFocus={() => this.setState({ blurred: false })}
                    onDidBlur={() => this.setState({ blurred: true })}
                />
                <StatusBar hidden />

                {this.renderCamera(cameraType, flashMode)}

                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.3)', 'rgba(0,0,0,.8)']}
                    style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', bottom: 0, width: winWidth, height: 70, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.setFlashMode(flashMode === CameraFlashModes.torch ? CameraFlashModes.off : CameraFlashModes.torch)}>
                        <Ionicons name={flashMode == CameraFlashModes.torch ? "md-flash" : 'md-flash-off'} color="white" size={30} />
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={this.handleCapture}>
                        <View style={styles.captureBtn}>
                            {capturing && <View style={styles.captureBtnInternal} />}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={() => this.setCameraType(cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back)}>
                        <Ionicons name="md-reverse-camera" color="white" size={30} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }
}