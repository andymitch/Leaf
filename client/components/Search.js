import React, { Component } from 'react'
import { View, Text, TextInput, Dimensions, ActivityIndicator, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Axios from 'axios'
import Profile from './Profile'
import { LIGHT, DARK } from '../colorTheme'
const { width: winWidth } = Dimensions.get('window')


export default class Search extends Component {
    state = {
        results: [],
        searching: false,
        keyphrase: '',
        goto: null,
        theme: this.props.screenProps.theme == 'dark' ? DARK : LIGHT
    }

    searchFor = async keyphrase => {
        this.setState({ keyphrase })
        if (!this.state.searching) {
            this.setState({ searching: true })
            setTimeout(async () => {
                await Axios.get(`https://if6chclj8h.execute-api.us-east-1.amazonaws.com/live/search?keyphrase=${keyphrase}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({results: res.data, searching: false})
                }).catch(err => console.log(err.response))
            }, 2000)
        }
    }

    goBack = () => { this.setState({ goto: null }) }

    renderItem = (item, index) => {
        return (
            <View key={index} style={[this.state.theme.container, { height: 60, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 2, marginVertical: 5, padding: 5, borderRadius: 10 }]}>
                <TouchableOpacity onPress={() => this.setState({ goto: item.username })} style={{flexDirection: 'row', width: '100%'}}>
                    <Image source={{ uri: item.profilepicture }} style={[{ height: 50, width: 50, borderRadius: 25, borderWidth: 1, marginRight: 5 }, this.state.theme.image]} />
                    <View>
                        <Text style={[{ fontSize: 20, fontWeight: 'bold' }, this.state.theme.text]}>{item.username}</Text>
                        <Text style={{ fontSize: 15, fontStyle: 'italic', color: 'grey' }}>{item.name}</Text>
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
        if (this.state.goto) return <Profile screenProps={{theme: this.props.screenProps.theme, token: this.props.screenProps.token}} goBack={this.goBack} username={this.state.goto} />
        return (
            <View style={[{ flex: 1, padding: 20, paddingTop: 40 }, this.state.theme.container]}>
                <View style={[this.state.theme.container, { flexDirection: 'row', justifyContent: 'center', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 2, marginBottom: 20, borderRadius: 10 }]}>
                    <TextInput placeholder='Search' autoCapitalize='none' style={[{ width: winWidth - 50, borderWidth: 0, height: 40, marginBottom: 10, padding: 10, }, this.state.theme.text]} onChangeText={keyphrase => this.searchFor(keyphrase)} />
                </View>
                <View>
                    {this.renderResults()}
                </View>
            </View>
        )
    }
}
