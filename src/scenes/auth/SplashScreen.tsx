import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {AuthStackParamList} from '@navigation/stacks/AuthStack.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {useAuth} from '@contexts/AuthContext.tsx';
import {readMultiple, SK} from '@utils/storage/mmkvStorage.ts';
import {LargeViewSize} from '@theme/DimensionValues.ts';

type Props = NativeStackScreenProps<AuthStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const {colors} = useTheme();
  const {setIsLogged} = useAuth();

  useEffect(() => {
    setTimeout(() => {
      autoLogin();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoLogin = () => {
    const keys = [SK.name];
    const session = readMultiple(keys);
    if (keys.length === session.length) {
      setIsLogged(true);
    } else {
      navigation.replace('LoginScreen');
    }
  };

  return (
    <RootScreenWrapper
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <Icon name="react" color={colors.primary} size={LargeViewSize.L} />
    </RootScreenWrapper>
  );
};

export default SplashScreen;
