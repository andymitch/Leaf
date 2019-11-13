import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import {Video} from 'expo-av';
//import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faHeart, faVolumeMute, faVolumeUp} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon as FAIcon} from '@fortawesome/react-native-fontawesome'
const mute = faVolumeMute
const heart = faHeart
const profileImageSize = 36;
const padding = 12;
const {width: winWidth} = Dimensions.get('window')

export default class FeedCard extends React.Component {
  state = {
    mute : false,
    color : false
  };

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.content, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  render() {
    const { likes, profile, location, content, caption, imageWidth, imageHeight, name, text} = this.props;

    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;
    const whichColor = this.state.color ? '#f20a0a' : '#000000'
    const muteIcon = this.state.mute ? faVolumeUp : faVolumeMute

    return (
      <View>
        <Header image={{ uri: 'http://placehold.it/120x120&text=image1' }} name={name} location={location} />
        <Video
          resizeMode="contain"
          style={{
            backgroundColor: '#D8D8D8',
            width: '100%',
            aspectRatio: aspect,
          }}
          rate={1.0}
          volume={3.0}
          isMuted={this.state.mute}
          resizeMode="cover"
          shouldPlay
          isLooping
          source={{ uri: content }}
        />
        <View style={styles.padding}>
          <View style={styles.row}>
            <View style={{left: 0}}>
              <Text style={styles.subtitle}>{caption}</Text>
            </View>
            <View>
              <View style={{right: 0}}>
                <View style={styles.row}>
                  <TouchableOpacity style={{paddingRight: 20}} onPress ={ () => this.setState(prev => ({mute: !prev.mute}))}>
                    <FAIcon size={26} icon={muteIcon}></FAIcon>
                  </TouchableOpacity>
                  <View>
                    <Text style={[styles.text, {justifyContent:'center'}]}>{likes}</Text>
                    <TouchableOpacity onPress={() => this.setState(prev => ({color: !prev.color}))}>
                      <FAIcon icon={heart} color={whichColor} size={26}></FAIcon>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.text}>{name}</Text>
        </View>
      </View>
    );
  }
}

const Header = ({ name, image, location}) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>{name}</Text>
        <Text >{location}</Text>
      </View>
    </View>
  </View>

);


const styles = StyleSheet.create({
  text: { fontWeight: '600' },
  subtitle: {
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  padding: {
    padding,
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: '#D8D8D8',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: 'cover',
    marginRight: padding,
  },
});
