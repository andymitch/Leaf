import React, { Component } from 'react'
import { View, FlatList, Text, TextInput, Dimensions, ActivityIndicator, Image } from 'react-native'

import Axios from 'axios'
import { AUTH_TOKEN } from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN

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
        keyphrase: ''
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

    separator = () => {
        return (
            <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}></View>
        )
    }

    renderItem = item => {
        return (
            <View style={{ height: 50, width: '100%', backgroundColor: 'white', flexDirection: 'row', shadowColor: "gainsboro", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 2, marginVertical: 5 }}>
                <Image />
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.username}</Text>
                    <Text style={{ fontSize: 15, fontStyle: 'italic', color: 'grey' }}>{item.fullname}</Text>
                </View>
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
                <FlatList
                    data={this.state.results}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.separator()}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 20, paddingTop: 40 }}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', shadowColor: "gainsboro", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 2, marginBottom: 20 }}>
                    <TextInput placeholder='Search' autoCapitalize='none' style={{ width: winWidth - 50, borderWidth: 0, height: 40, marginBottom: 10, padding: 10, }} onChangeText={keyphrase => this.searchFor(keyphrase)} />
                </View>
                <View>
                    {this.renderResults()}
                </View>
            </View>
        )
    }
}