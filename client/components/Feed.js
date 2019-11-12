import React, {Component} from 'react'
import {Container, Content, Tab, Tabs} from 'native-base'
import MyFeed from './MyFeed'
import LocalFeed from './LocalFeed'

export default class Feed extends Component{
    render(){
        return(
            <Container>
                <Content>
                    <Tabs tabBarPosition='top'>
                        <Tab heading='My Feed'>
                            <MyFeed/>
                        </Tab>
                        <Tab heading='Local Feed'>
                            <LocalFeed/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}