import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {CornerRadius, Elevation, Indent} from "@theme/DimensionValues.ts";

type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

const CardWrapper: React.FC<Props> = ({children, style}) => {
    const {colors} = useTheme();
    return <View style={[{
        backgroundColor: colors.card,
        padding: Indent.XL,
        borderRadius: CornerRadius.L,
        elevation: Elevation.S,
    }, style]}>{children}</View>;
};

export default CardWrapper;
