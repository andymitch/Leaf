import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'cadetblue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    login: {
      flex: 1,
      flexDirection: 'column',
      marginHorizontal: 50,
      marginVertical: 100,
      backgroundColor: 'rgba(255, 255, 255, .9)',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    btn: {
      position: 'absolute',
      alignSelf: 'flex-end'
    },
    input: {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      height: 40,
      width: 200,
      marginBottom: 10,
      padding: 10,
      color: 'black'
    },
    passwordInput: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    eyeconBtn: {
      position: 'absolute',
      right: 0,
      bottom: 7,
      margin: 10,
    },
    check_username: {
      position: 'absolute',
      right: 0,
      margin: 12,
      bottom: 158
    },
    check_emailPhone: {
      position: 'absolute',
      right: 0,
      margin: 12,
      bottom: 107
    }
});

export {styles}