import React from 'react';
import { View, Image, ScrollView } from 'react-native';

import {gallery_styles} from '../styles/galleryStyles';

export default ({captures=[]}) => (
    <ScrollView 
        horizontal={true}
        style={gallery_styles.galleryContainer} 
    >
        {captures.map(({ uri }) => (
            <View style={gallery_styles.galleryImageContainer} key={uri}>
                <Image source={{ uri }} style={gallery_styles.galleryImage} />
            </View>
        ))}
    </ScrollView>
);