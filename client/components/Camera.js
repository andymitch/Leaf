import React, {Component} from 'react'
import {AppRegistry, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform} from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import {RNCamera, FaceDetector} from 'react-native-camera'
import Video from 'react-native-video'
import Axios from 'axios'

//AUTH TOKEN
import {AUTH_TOKEN} from './LoginRegister'

//ICONS AND STYLES
import Gallery from './Gallery'
import { styles } from '../styles/style'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'


export default class CameraView extends React.Component {
    state = {
        hasCameraPermission: null,
        ratio: null,
        type: Camera.Constants.Type.back,
        captures: [],
        captureing: null
    };
  
    async componentDidMount() {
        console.log('token from camera:')
        console.log(AUTH_TOKEN)
        if(!AUTH_TOKEN) this.props.navigation.navigate('LoginRegister')
        const { camera_status } = await Permissions.askAsync(Permissions.CAMERA)
        const { camera_roll_status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const { audio_status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        this.setState({hasCameraPermission: camera_status === audio_status === camera_roll_status === 'granted'})
    }

    getRatios = async () => {
        const ratios = await this.camera.getSupportedRatios();
        console.log('ratios: ' + ratios);
    }

    startCapture = () => this.setState({ capturing: true })
    endCapture = () => {if(this.state.capturing) this.camera.stopRecording()}

    photoCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    }
    videoCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    }
  
    render() {
        const { hasPermission } = this.state;
        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }}
                        ref={camera => {this.camera = camera}}
                        type={this.state.type}
                        ratio={'2:1'}
                        onCameraReady={() => this.getRatios()}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            {this.state.captures.length > 0 && <Gallery captures={this.state.captures}/>}
                            <View style={[styles.passwordInput,{alignSelf: 'flex-end', justifyContent: 'space-between', flex: 1, height: 50}]}>
                                <Text
                                    style={{margin: 10, padding: 10, backgroundColor: 'yellow', borderRadius: 10}}
                                    onPress={() => {
                                        this.setState({
                                            type:
                                                this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                        });
                                    }}
                                >Flip</Text>
                                <TouchableWithoutFeedback
                                    onPress={() => {console.log('PHOTO'), this.photoCapture()}}
                                    onLongPress={() => {console.log('VIDEO'), this.videoCapture()}}
                                    onPressIn={() => {console.log('START'), this.startCapture()}}
                                    onPressOut={() => {console.log('END'), this.endCapture()}}
                                >
                                    <Text style={{margin: 10, padding: 10, backgroundColor: 'green', borderRadius: 10}}>Snap</Text>
                                </TouchableWithoutFeedback>
                                <Text
                                    style={{margin: 10, padding: 10, backgroundColor: 'red', borderRadius: 10}}
                                    onPress={() => console.log('BACK')}
                                >Back</Text>
                            </View>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}