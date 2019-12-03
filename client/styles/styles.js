import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const padding = 12;
const profileImageSize = 36;

export default StyleSheet.create({
    inline: {
        flexDirection: 'row',
        padding: 20,
        width: winWidth,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        height: winWidth*2,
        width: winWidth,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 70-(winWidth/2),
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: winWidth-120,
        bottom: 0,
        backgroundColor: 'black'
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "white",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 56,
        height: 56,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    galleryContainer: {
        bottom: 100
    },
    galleryImageContainer: {
        width: 75,
        height: 75,
        marginRight: 5
    },
    galleryImage: {
        width: 75,
        height: 75
    },
});
