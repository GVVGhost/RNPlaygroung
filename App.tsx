import React from 'react';
import {AuthProvider} from '@contexts/AuthContext.tsx';
import {RootNavigator} from '@navigation/RootNavigator.tsx';
import {RootSiblingParent} from 'react-native-root-siblings';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <RootSiblingParent>
        <RootNavigator />
      </RootSiblingParent>
    </AuthProvider>
  );
}

export default App;
