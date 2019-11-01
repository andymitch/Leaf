import React, {Component} from 'react'
import { View, Image, ScrollView, Button } from 'react-native'

export default class Preview extends Component{
    state = {
        image: ''
    }

    componentDidMount(){
        console.log('IMAGE:\n' + this.props.navigation.getParam('image','').uri)
        this.state.image = this.props.navigation.getParam('image','')
    }

    render(){
        return(
            <View style={{backgroundColor: 'green'}}>
                <Image source={this.state.image.uri} height={this.state.image.height} width={this.state.image.width}/>
                {/*<Button title={'go back'} onPress={() => this.props.navigation.pop()}/>*/}
            </View>
        )
    }
}