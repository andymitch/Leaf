import React, {Component} from 'react'
import {View, FlatList, Text, Button, ActivityIndicator} from 'react-native'

import Axios from 'axios'
import {AUTH_TOKEN} from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN


export default class Feed extends Component{
    state = {
        feed: [],
        isLoading: true
    }
    componentDidMount(){this.refresh()}

    refresh = async () => {
        setTimeout(()=>{this.setState({isLoading: false})}, 1000)
        /*
        await Axios.get('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/feed', {}).then(res => {
            this.setState({feed: res.data})
            this.setState({isLoading: false})
        }).catch(err => console.log(err))
        */
    }

    separator = () => {
        return(
            <View style={{height: 1, width: '100%', backgroundColor: 'black'}}></View>
        )
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size='large' color='blue' animated/>
                </View>
            )
        }else{
            return(
                <View style={{flex: 1}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <Text>Local Feed</Text>
                    </View>
                </View>
            )
        }
        /*
        return(
            <View>
                <FlatList
                    data={this.state.feed}
                    renderItem={({item}) => <FeedCard profile={item.profile} name={item.name} location={item.location} content={item.content} caption={item.caption}/>}
                    keyExtractor={(item,index) => index}
                    ItemSeparatorComponent={this.separator()}
                />
            </View>
        )
        */
    }
}