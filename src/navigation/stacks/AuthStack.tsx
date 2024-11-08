import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@scenes/auth/LoginScreen.tsx';
import SplashScreen from '@scenes/auth/SplashScreen.tsx';

export type AuthStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
};

const {Navigator, Screen} = createStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="SplashScreen" component={SplashScreen} />
    <Screen name="LoginScreen" component={LoginScreen} />
  </Navigator>
);

export default AuthStack;
