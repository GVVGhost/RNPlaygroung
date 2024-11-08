import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '@navigation/stacks/AuthStack.tsx';
import {useAuth} from '@contexts/AuthContext.tsx';
import BottomNavBar from '@navigation/BottomNavBar.tsx';
import {useColorScheme} from 'react-native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {DarkTheme, LightTheme, nDark, nLight} from '@theme/Colors.ts';

export type RootStackParamList = {
  BottomNavBar: undefined;
  AuthStack: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
const screenOptions = {headerShown: false};

export const RootNavigator = () => {
  const {isLogged} = useAuth();
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      {/*<AlertNotificationRoot theme={scheme ?? 'light'} colors={[nLight, nDark]}>*/}
        <Navigator screenOptions={screenOptions}>
          {isLogged ? (
            <Screen name="BottomNavBar" component={BottomNavBar} />
          ) : (
            <Screen name="AuthStack" component={AuthStack} />
          )}
        </Navigator>
      {/*</AlertNotificationRoot>*/}
    </NavigationContainer>
  );
};
