import React, {Component} from 'react'
import {View, FlatList, Text, TextInput, Dimensions, ActivityIndicator} from 'react-native'
import {styles} from '../styles/style'
import Axios from 'axios'

const {width: winWidth} = Dimensions.get('window')


export default class Search extends Component{
    state = {
        results: [],
        searching: false,
        keyphrase: ''
    }

    searchFor = async keyphrase => {
        this.setState({keyphrase})
        if(!this.state.searching){
            this.setState({searching: true})
            setTimeout(() => {
                // for testing
                this.setState({searching: false})
                /*
                await Axios.get('', {params: {keyphrase: keyphrase}})
                .then(res => this.setState({results: res.data, searching: false}))
                .catch(err => console.log(err))
                */
            }, 2000)
        }
    }

    separator = () => {
        return(
            <View style={{height: 1, width: '100%', backgroundColor: 'black'}}></View>
        )
    }

    renderResults = () => {
        // get rid of else statement when done testing
        if(this.state.searching){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size='large' color='blue' animated/>
                </View>
            )
        }else{
            return(
                <View style={{flex: 1}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <Text>{this.state.keyphrase}</Text>
                    </View>
                </View>
            )
        }
        /*
        return(
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.results}
                    renderItem={({item}) => <FeedCard profile={item.profile} name={item.name} location={item.location} content={item.content} caption={item.caption}/>}
                    keyExtractor={(item,index) => index}
                    ItemSeparatorComponent={this.separator()}
                />
            </View>
        )
        */
    }

    render(){
        return(
            <View>
                <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'center', borderWidth: 0, shadowColor: "gainsboro", shadowOffset: {width: 0,height: 2}, shadowOpacity: 0.25, shadowRadius: 5, elevation: 2}}>
                    <TextInput placeholder='Search' autoCapitalize='none' style={{width: winWidth-50, borderWidth: 0, height: 40, marginBottom: 10, padding: 10,}} onChangeText={keyphrase => this.searchFor(keyphrase)}/>
                </View>
                <View>
                    {this.renderResults()}
                </View>
            </View>
        )
    }
}