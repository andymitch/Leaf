import { AsyncStorage } from 'react-native';

export default deviceStorage = {
    async set(key, value) {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message)
        }
    },
    async getToken() {
        console.log('getting token...')
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) this.setState({ token: value, loading: false })
            else this.setState({ loading: false })
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message)
        }
    },
    async deleteToken() {
        try {
            await AsyncStorage.removeItem('token').then(() => {
                this.setState({ token: '' })
            })
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message)
        }
    },
    async getTheme() {
        console.log('getting theme...')
        try {
            const value = await AsyncStorage.getItem('theme')
            if (value === null) {
                await AsyncStorage.setItem('theme', 'light')
                this.setState({ theme: 'light' })
            } else this.setState({ theme: value })
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message)
        }
    }
}