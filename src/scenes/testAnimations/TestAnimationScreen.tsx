import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {ScrollView} from 'react-native';
import {Indent} from '@theme/DimensionValues.ts';
import {TestStackParamList} from '@navigation/stacks/TestStack.tsx';
import PulsingButton from '@components/animated/PulsingButton.tsx';
import SpinningButton from '@components/animated/SpinningButton.tsx';

type Props = NativeStackScreenProps<TestStackParamList, 'TestAnimationScreen'>;

const TestAnimationScreen: React.FC<Props> = ({navigation}) => {
  const [waving, setWaving] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);

  return (
    <RootScreenWrapper style={{justifyContent: 'center', padding: Indent.XL}}>
      <ScrollView contentContainerStyle={{gap: Indent.XL}}>
        <PulsingButton
          animated={waving}
          onPress={() => setWaving(prevState => !prevState)}
          iconName={waving ? 'stop' : 'play'}
        />
        <SpinningButton
          animated={spinning}
          onPress={() => setSpinning(prevState => !prevState)}
          iconName={spinning ? 'stop' : 'play'}
        />
      </ScrollView>
    </RootScreenWrapper>
  );
};

export default TestAnimationScreen;
