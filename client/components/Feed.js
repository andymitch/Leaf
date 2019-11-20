import React, {Component} from 'react'
import {View, Text, FlatList, ActivityIndicator, Dimensions} from 'react-native'
import {Container, Content, Tab, Tabs, TabHeading} from 'native-base'

// ICONS
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faStream, faFire} from '@fortawesome/free-solid-svg-icons'

import FeedCard from './FeedCard'
const viewabilityConfig = {minimumViewTime: 2000, viewAreaCoveragePercentThreshold: 50}
const {height: winHeight} = Dimensions.get('window')

import Axios from 'axios'
import {AUTH_TOKEN} from './LoginRegister'
Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN


class FeedContent extends Component{
    state = {
        feed: [],
        isLoading: true
    }

    constructor(props) {
        super(props)
        this.cellRefs = {}
    }

    componentDidMount = async () => {
        await this.loadItems()
    }

    componentWillUnmount(){

    }

    loadItems = async () => {
        // FOR TESTING PURPOSES
        const _feed = new Array(5).fill({
            profile: 'https://leaf-video.s3.amazonaws.com/profile-pictures/testProfile.png',
            name: 'BillyBob',
            location: 'Boulder, Colorado',
            content: 'https://diwoaedb40lx7.cloudfront.net/video/HIWTC.mp4',
            caption: 'My first post!',
            likes: 12,
            index: 0
        })
        const start = this.state.feed.length
        const newFeed = _feed.map((item, i) => ({
            ...item,
            index: start + i,
        }))
        const feed = [...this.state.feed, ...newFeed]
        this.setState({feed: feed, isLoading: false})
        /*
        await Axios.get(`https://if6chclj8h.execute-api.us-east-1.amazonaws.com/Beta/${this.props.feedType}`, {})
        .then(res => {
            this.setState({feed: res.data, isLoading: false})
        })
        .catch(err => console.log(err))
        */
    }

    handleViewableItemsChanged = props => {
        const viewable = props.viewableItems || []
        const changed = props.changed
        console.log(viewable.length, changed.length)
        changed.forEach(item => {
            const cell = this.cellRefs[item.index]
            if(cell){
                console.log(item)
                if(item.isViewable){
                    console.log('play')
                    cell.play()
                }else{
                    console.log('pause')
                    cell.pause()
                }
            }
        })
    }

    renderItem = ({item}) => {
        console.log('rendering item')
        this.handleViewableItemsChanged({changed: this.state.feed})
        return(
            <View style={{flex: 1}}>
                <FeedCard ref={ref => {this.cellRefs[item.index] = ref}}
                    likes={item.likes} profile={item.profile} location={item.location} content={item.content} caption={item.caption} name={item.name}/>
            </View>
        )
    }

    separator = () => { return <View style={{height: 1, width: '100%', backgroundColor: 'gainsboro'}}></View> }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size='large' color='blue' animated/>
                </View>
            )
        }
        return(
            <FlatList style={{height: winHeight}}
                data={this.state.feed}
                renderItem={this.renderItem}
                keyExtractor={item => item.index.toString()}
                onViewableItemsChanged={this.handleViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                ItemSeparatorComponent={this.separator}
                ListEmptyComponent={() =>
                    <Text style={{}}>
                        Make some friends.
                    </Text>
                }
            />
        )
    }
}

export default class Feed extends Component{
    render(){
        return(
            <FeedContent feedType='myFeed'/>
        )
        return(
            <Container>
                <Content>
                    <Tabs tabBarPosition='top' tabBarUnderlineStyle={{backgroundColor: 'blue'}}>
                        <Tab
                            heading={
                                <TabHeading  style={{backgroundColor: 'white'}}>
                                    <Text style={{marginRight: 5}}>My Feed</Text>
                                    <Icon icon={faStream}/>
                                </TabHeading>
                            }
                        >
                            <FeedContent feedType='myFeed'/>
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={{backgroundColor: 'white'}}>
                                    <Text style={{marginRight: 5}}>Popular</Text>
                                    <Icon icon={faFire}/>
                                </TabHeading>
                            }
                        >
                            <FeedContent feedType='popular'/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}