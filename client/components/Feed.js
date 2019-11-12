import React, {Component} from 'react'
import {Text} from 'react-native'
import {Container, Content, Tab, Tabs, TabHeading} from 'native-base'
import MyFeed from './MyFeed'
import Popular from './Popular'

// ICONS
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome'
import {faStream, faFire} from '@fortawesome/free-solid-svg-icons'


export default class Feed extends Component{
    render(){
        return(
            <Container>
                <Content>
                    <Tabs tabBarPosition='top'>
                        <Tab heading={
                            <TabHeading style={{backgroundColor: 'gainsboro'}}>
                                <Text style={{marginRight: 5}}>My Feed</Text>
                                <Icon icon={faStream}/>
                            </TabHeading>}
                        >
                            <MyFeed/>
                        </Tab>
                        <Tab heading={
                            <TabHeading style={{backgroundColor: 'gainsboro'}}>
                                <Text style={{marginRight: 5}}>Popular</Text>
                                <Icon icon={faFire}/>
                            </TabHeading>}
                        >
                            <Popular/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}