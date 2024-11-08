import {Animated, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import {BorderWidth} from "@theme/DimensionValues.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    iconName?: string;
    onPress?: () => void;
    animated?: boolean;
    size?: number
}

const PulsingButton: React.FC<Props> = (
    {
        iconName = 'play',
        onPress = () => {
        },
        animated = false,
        size = 50,
    }
) => {
    const {colors} = useTheme();
    const duration = 1000
    const maxScale = 0.9
    const minScale = 0.5
    const maxFade = 1.0
    const minFade = 0.0
    const halfSize = size / 2;
    const wavingValue = useRef(new Animated.Value(1)).current;
    const waveFadingValue = useRef(new Animated.Value(1)).current;

    const resetWave = Animated.parallel([
        Animated.timing(wavingValue, {
            toValue: 0.9,
            duration,
            useNativeDriver: true,
        }),
        Animated.timing(waveFadingValue, {
            toValue: 0,
            duration,
            useNativeDriver: true,
        }),
    ]);

    const wave = Animated.loop(
        Animated.parallel([
            Animated.sequence([
                Animated.timing(wavingValue, {
                    toValue: minScale,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(wavingValue, {
                    toValue: maxScale,
                    duration,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(waveFadingValue, {
                    toValue: maxFade,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(waveFadingValue, {
                    toValue: minFade,
                    duration,
                    useNativeDriver: true,
                }),
            ])
        ])
    );

    useEffect(() => {
        if (animated) wave.start();
        else resetWave.start();
    }, [animated]);

    return <View style={{width: size, height: size, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={onPress} style={{backgroundColor: colors.primary, borderRadius: size, zIndex: 2}}>
            <Icon name={iconName} size={halfSize} color={colors.background}/>
        </TouchableOpacity>
        <Animated.View style={{
            height: '100%',
            width: '100%',
            borderColor: colors.primary,
            borderWidth: BorderWidth.L,
            borderRadius: size,
            position: 'absolute',
            transform: [{scale: wavingValue}],
            opacity: waveFadingValue,
        }}/>
    </View>
};

export default PulsingButton;
