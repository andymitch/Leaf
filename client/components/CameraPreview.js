import React, {Component} from 'react'
import { View, Image, TouchableOpacity, Dimensions} from 'react-native'
import { Video } from 'expo-av'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/styles'
const { width: winWidth, height: winHeight } = Dimensions.get('window')

export default class Preview extends Component{
    state = {
        media: ''
    }

    componentDidMount(){
        this.setState({media: this.props.navigation.getParam('media','not found')})
        console.log(this.props.navigation.getParam('media','not found'))
    }

    getMedia = isVideo => {
        if(isVideo){
            return(
                <Video
                    source={{uri: this.state.media.uri}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ width: winWidth, height: winWidth }}
                />
            )
        }else{
            return(
                <Image style={[styles.preview,{backgroundColor: 'black', top: 70}]} source={{uri: this.state.media.uri}} height={winWidth} width={winWidth}/>
            )
        }
    }

    render(){
        return(
            <React.Fragment>
                <View style={{backgroundColor: 'black', height: winHeight}}>
                    <View style={[styles.inline,{zIndex: 1}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Icon icon={faArrowLeft} style={{color: 'white'}} size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('IMAGE POSTED')}>
                            <Icon icon={faPaperPlane} style={{color: 'white'}} size={30}/>
                        </TouchableOpacity>
                    </View>
                    {this.getMedia(this.props.navigation.getParam('isVideo', false))}
                </View>
            </React.Fragment>
        )
    }
}