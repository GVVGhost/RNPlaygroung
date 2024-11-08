import React from 'react';
import {AuthProvider} from '@contexts/AuthContext.tsx';
import {RootNavigator} from '@navigation/RootNavigator.tsx';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

export default App;
