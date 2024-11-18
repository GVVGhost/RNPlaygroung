import HomeStack, {HomeStackParamList} from '@navigation/stacks/HomeStack.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsStack, {
  SettingsStackParamList,
} from '@navigation/stacks/SettingsStack.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import TestStack, {TestStackParamList} from '@navigation/stacks/TestStack.tsx';
import {SafeAreaView} from 'react-native';

export type BottomNavBarProps = {
  HomeStack: HomeStackParamList;
  SettingsStack: SettingsStackParamList;
  TestStack: TestStackParamList;
};

const {Navigator, Screen} = createBottomTabNavigator<BottomNavBarProps>();

const BottomNavBar = () => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderColor: colors.background,
            elevation: 0,
            height: 40,
          },
        }}>
        <Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="TestStack"
          component={TestStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="application-edit-outline" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="cog" color={color} size={size} />
            ),
          }}
        />
      </Navigator>
    </SafeAreaView>
  );
};

export default BottomNavBar;
