import * as React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
import Animated, { Easing } from "react-native-reanimated"
import { timing } from "react-native-redash"
const { Clock } = Animated
const { interpolate, multiply } = Animated
const size = 70
const strokeWidth = 10
const AnimatedPath = Animated.createAnimatedComponent(Path)
const { PI, cos, sin } = Math
const r = (size - strokeWidth) / 2
const cx = size / 2
const cy = size / 2
const A = PI + PI * 0.4
const startAngle = PI + PI * 0.2
const endAngle = 2 * PI - PI * 0.2
const x1 = cx - r * cos(startAngle)
const y1 = -r * sin(startAngle) + cy
const x2 = cx - r * cos(endAngle)
const y2 = -r * sin(endAngle) + cy
const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`


CircularProgress = ({ progress }) => {
    const circumference = r * A;
    const α = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, A],
    });
    const strokeDashoffset = multiply(α, r);
    return (
        <Svg width={size} height={size}>
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
                    <Stop offset="0" stopColor="#f7cd46" />
                    <Stop offset="1" stopColor="#ef9837" />
                </LinearGradient>
            </Defs>
            <Path
                stroke='red'
                fill="none"
                strokeDasharray={`${circumference}, ${circumference}`}
                {...{ d, strokeWidth }}
            />
            <AnimatedPath
                stroke="url(#grad)"
                fill="none"
                strokeDasharray={`${circumference}, ${circumference}`}
                {...{ d, strokeDashoffset, strokeWidth }}
            />
        </Svg>
    );
};


export default CameraTimer = ({seconds}) => {
    const clock = new Clock()
    console.log(seconds*1000)
    const config = {
        duration: seconds * 1000,
        toValue: 1,
        easing: Easing.linear,
    };
    return (
        <View style={styles.container}>
            <CircularProgress progress={timing(clock, 0, config)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
});