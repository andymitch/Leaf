import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, StatusBar } from 'react-native'

// ICONS
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faGem } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
import { TouchableOpacity } from 'react-native-gesture-handler'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN

const _items = [{
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'BillyBob',
    points: 1032
}, {
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'BobbyBoi',
    points: 435
}, {
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'Fineas',
    points: 231
}, {
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'DemBoiz',
    points: 56
}, {
    profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
    name: 'idk',
    points: 18
}]

class Avatar extends Component {
    render() {
        return (
            <View style={{ margin: 10, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.goto(this.props.item.name)}>
                    <Image source={{ uri: this.props.item.profile }} style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black', marginRight: 5 }} />
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.props.item.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon icon={faGem} size={15} style={{ marginRight: 2 }} />
                        <Text>{this.props.item.points}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

class Leaderboard extends Component {
    goto = username => { this.props.goto(username) }

    render() {
        return (
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {this.props.items.map((item, index) => {
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 2 }}>{index + 1}.</Text>
                            <Avatar goto={this.goto} item={item} />
                        </View>
                    )
                })}
            </View>
        )
    }
}

class Following extends Component {
    goto = username => { this.props.goto(username) }

    render() {
        return (
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {this.props.items.map((item, index) => { return <Avatar goto={this.goto} key={index} item={item} /> })}
            </View>
        )
    }
}

export default class List extends Component {
    state = {
        items: [],
        isLoading: true
    }

    async componentDidMount() {
        this.setState({ items: _items, isLoading: false })
        /*
        if (this.props.leaderboard) {
            await Axios.post(`https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/leaderboard`, {})
                .then(res => this.setState({ items: res.data }))
                .catch(err => console.log(err))
        } else {
            await Axios.post(`https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/following`, {})
                .then(res => this.setState({ items: res.data }))
                .catch(err => console.log(err))
        }
        */
    }

    goto = username => { this.props.gotoProfile(username) }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'black' }}>
                    <StatusBar hidden={false} barStyle='dark-content'/>
                    <ActivityIndicator size='large' color='blue' animated />
                </View>
            )
        }
        if (this.props.leaderboard) return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 20, paddingTop: 20 }}>
                <StatusBar hidden={false} barStyle='dark-content'/>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.props.goBack()}>
                        <Icon icon={faArrowLeft} size={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Leaderboard</Text>
                </View>
                <Leaderboard goto={this.goto} items={this.state.items} />
            </View>
        )
        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 20, paddingTop: 20 }}>
                <StatusBar hidden={false} barStyle='dark-content'/>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.props.goBack()}>
                        <Icon icon={faArrowLeft} size={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Following</Text>
                </View>
                <Following goto={this.goto} items={this.state.items} />
            </View>
        )
    }
}