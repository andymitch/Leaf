import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
const profileImageSize = 36;
const padding = 12;
const {width: winWidth} = Dimensions.get('window')

export default class Post extends React.Component {
  state = {
  };

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  render() {
    const { profile, location, content, caption, imageWidth, imageHeight, name, text} = this.props;

    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View>
        <Header image={{ uri: 'http://placehold.it/120x120&text=image1' }} name={'Neil Borde'} location={'Colorado'} />
        <Image
          resizeMode="contain"
          style={{
            backgroundColor: '#D8D8D8',
            width: '100%',
            aspectRatio: aspect,
          }}
          source={{ uri: 'http://placehold.it/120x120&text=image2' }}
        />
        <Metadata name={name} description={text} />
      </View>
    );
  }
}

const Metadata = ({ name, description }) => (
  <View style={styles.padding}>
    <IconBar />
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.subtitle}>{description}</Text>
  </View>
);

const Header = ({ name, image, location}) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
    <View style = {[styles.row, styles.padding]}>
      <Text style = {styles.text}>{location}</Text>
    </View>
    <Icon name="ios-more" />
  </View>

);

const Icon = ({ name }) => (
  <Ionicons style={{ marginRight: 24 }} name={name} size={26} color="black" />
);

const IconBar = () => (
  <View style={styles.row}>
    <View style={styles.row}>
      <Icon name="ios-heart" />
      <Icon name="ios-chatbubbles" />
      <Icon name="ios-send" />
    </View>
    <Icon name="ios-bookmark" />
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
