import React, { Component } from 'react'
import { View, Text, TextInput, Dimensions, ActivityIndicator, Image } from 'react-native'
import Profile from './Profile'

import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
import { TouchableOpacity } from 'react-native-gesture-handler'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN

import { getItemAsync } from 'expo-secure-store'
import { LIGHT, DARK } from '../colorTheme'
let theme
const getTheme = async () => {
    await getItemAsync('theme')
    .then(res => {
        if(res === 'dark') theme = DARK
        else theme = LIGHT
    })
}
getTheme()

const { width: winWidth } = Dimensions.get('window')
const _results = [
    {
        profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        username: 'andymitch559',
        fullname: 'Andrew Mitchell'
    }, {
        profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        username: 'andymitch559',
        fullname: 'Andrew Mitchell'
    }, {
        profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
        username: 'andymitch559',
        fullname: 'Andrew Mitchell'
    }
]

export default class Search extends Component {
    state = {
        results: [],
        searching: false,
        keyphrase: '',
        goto: null
    }

    searchFor = async keyphrase => {
        this.setState({ keyphrase })
        if (!this.state.searching) {
            this.setState({ searching: true })
            setTimeout(() => {
                // for testing
                this.setState({ results: _results, searching: false })

                /*
                await Axios.get('https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/search', {params: {keyphrase: keyphrase}})
                .then(res => this.setState({results: res.data, searching: false}))
                .catch(err => console.log(err))
                */
            }, 2000)
        }
    }

    goBack = () => { this.setState({ goto: null }) }

    renderItem = (item, index) => {
        return (
            <View key={index} style={[theme.container, { height: 60, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 2, marginVertical: 5, padding: 5, borderRadius: 10 }]}>
                <TouchableOpacity onPress={() => this.setState({ goto: item.username })} style={{flexDirection: 'row', width: '100%'}}>
                    <Image source={{ uri: item.profile }} style={[{ height: 50, width: 50, borderRadius: 25, borderWidth: 1, marginRight: 5 }, theme.image]} />
                    <View>
                        <Text style={[{ fontSize: 20, fontWeight: 'bold' }, theme.text]}>{item.username}</Text>
                        <Text style={[{ fontSize: 15, fontStyle: 'italic', color: 'grey' }]}>{item.fullname}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderResults = () => {
        if (this.state.searching) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size='large' color='blue' animated />
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                {this.state.results.map((result, index) => this.renderItem(result, index))}
            </View>
        )
    }

    render() {
        if (this.state.goto) return <Profile goBack={this.goBack} username={this.state.goto} />
        return (
            <View style={[{ flex: 1, padding: 20, paddingTop: 40 }, theme.container]}>
                <View style={[theme.container, { flexDirection: 'row', justifyContent: 'center', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 2, marginBottom: 20, borderRadius: 10 }]}>
                    <TextInput placeholder='Search' autoCapitalize='none' style={[{ width: winWidth - 50, borderWidth: 0, height: 40, marginBottom: 10, padding: 10, }, theme.text]} onChangeText={keyphrase => this.searchFor(keyphrase)} />
                </View>
                <View>
                    {this.renderResults()}
                </View>
            </View>
        )
    }
}