import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@scenes/home/HomeScreen.tsx';
import TaskScreen from '@scenes/home/TaskScreen.tsx';
import {TaskContainerObj} from "@utils/data/TaskTypes.ts";
import TestAnimationScreen from "@scenes/testAnimations/TestAnimationScreen.tsx";

export type TestStackParamList = {
    TestAnimationScreen: undefined;
};

const {Navigator, Screen} = createStackNavigator<TestStackParamList>();

const TestStack = () => {
    return (
        <Navigator>
            <Screen name="TestAnimationScreen" component={TestAnimationScreen} options={{headerShown: false}}/>
        </Navigator>
    );
};

export default TestStack;
