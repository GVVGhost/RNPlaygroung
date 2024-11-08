import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from "@react-navigation/native";
import DetailScreen from "@scenes/sandbox/DetailScreen.tsx";
import SandboxScreen from "@scenes/sandbox/SandboxScreen.tsx";

export type SandboxStackParamList = {
    SandboxScreen: undefined;
    DetailScreen: undefined;
};

const {Navigator, Screen} = createStackNavigator<SandboxStackParamList>();

const SandboxStack = () => {
    const {colors} = useTheme();
    return (
        <Navigator>
            <Screen name="SandboxScreen" component={SandboxScreen} options={{headerShown: false}}/>
            <Screen name="DetailScreen" component={DetailScreen}
                    options={{headerShown: true, headerStyle: {backgroundColor: colors.background, elevation: 0}}}/>
        </Navigator>
    );
};

export default SandboxStack;
