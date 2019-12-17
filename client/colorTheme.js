import { StyleSheet } from 'react-native'


export const LIGHT = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowColor: 'gainsboro'
    },
    text: {
        color: 'black',
    },
    icon: {
        color: 'black',
    },
    image: {
        borderColor: 'black'
    },
    streak: {
        color: 'rgba(255,69,0,.5)'
    }
})

export const DARK = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        shadowColor: 'grey'
    },
    text: {
        color: 'white',
    },
    icon: {
        color: 'white',
    },
    image: {
        borderColor: 'white'
    },
    streak: {
        color: 'rgba(255,69,0,.7)'
    }
})