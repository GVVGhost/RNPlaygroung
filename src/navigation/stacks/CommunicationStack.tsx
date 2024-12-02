import {createStackNavigator} from '@react-navigation/stack';
import CommunicationScreen from '@scenes/communications/CommunicationScreen.tsx';
import ChatScreen from '@scenes/communications/ChatScreen.tsx';

export type CommunicationStackParamList = {
  CommunicationScreen: undefined;
  ChatScreen: {recipient: {id: string; name: string}; sender: {id: string, name: string}};
};

const {Navigator, Screen} = createStackNavigator<CommunicationStackParamList>();

const CommunicationStack = () => {
  return (
    <Navigator>
      <Screen
        name="CommunicationScreen"
        component={CommunicationScreen}
        options={{headerShown: false}}
      />
      <Screen
        name={'ChatScreen'}
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default CommunicationStack;
