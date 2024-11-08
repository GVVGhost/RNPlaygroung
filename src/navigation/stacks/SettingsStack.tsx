import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '@scenes/settings/SettingsScreen.tsx';

export type SettingsStackParamList = {
  SettingsScreen: undefined;
};

const {Navigator, Screen} = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="SettingsScreen" component={SettingsScreen} />
  </Navigator>
);
export default SettingsStack;
