import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {SectionList, Text} from 'react-native';
import {SettingsStackParamList} from '@navigation/stacks/SettingsStack.tsx';
import {deleteMultiple, readOne, SK} from '@utils/storage/mmkvStorage.ts';
import {useAuth} from '@contexts/AuthContext.tsx';
import PressableListComponent, {
  PressableListComponentProps,
} from '@components/listItems/PressableListComponent.tsx';
import {logOutDialog} from '@utils/notifications/Dialog.ts';
import VersionInfo from 'react-native-version-info';
import {Indent} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import {labelTextStyle} from '@theme/TextStyles.ts';
import Toast from 'react-native-root-toast';
import {
  toastErrorOptions,
  toastInfoOptions,
  toastSuccessOptions,
  toastWarningOptions,
} from '@utils/notifications/Toast.ts';

type Props = NativeStackScreenProps<SettingsStackParamList, 'SettingsScreen'>;

type SectionListProps = {
  title: string;
  data: PressableListComponentProps[];
};

const SettingsScreen: React.FC<Props> = ({}) => {
  const textLabelStyle = labelTextStyle(useTheme());
  const {setIsLogged} = useAuth();
  const [list, setList] = useState<SectionListProps[]>([]);

  useEffect(() => {
    setList([
      {
        title: 'Info',
        data: [
          {
            label: `User: ${readOne(SK.name) || '...'}`,
            leftIconName: 'account',
          },
          {
            label: `User email: ${readOne(SK.email) || '...'}`,
            leftIconName: 'account',
          },
          {
            label: `User id: ${readOne(SK.id) || '...'}`,
            leftIconName: 'account',
          },
          {
            label: 'Package name: ' + VersionInfo.bundleIdentifier,
            leftIconName: 'widgets-outline',
          },
          {
            label: 'Version name: ' + VersionInfo.appVersion,
            leftIconName: 'information-outline',
          },
          {
            label: 'Version code: ' + VersionInfo.buildVersion,
            leftIconName: 'information-outline',
          },
        ],
      },
      {
        title: 'Actions',
        data: [
          {
            label: 'Show WARNING Toast',
            leftIconName: 'information-outline',
            handler: {
              iconName: 'chevron-right',
              onPress: () => Toast.show('WARNING Toast', toastWarningOptions),
            },
          },
          {
            label: 'Show SUCCESS Toast',
            leftIconName: 'information-outline',
            handler: {
              iconName: 'chevron-right',
              onPress: () => Toast.show('SUCCESS Toast', toastSuccessOptions),
            },
          },
          {
            label: 'Show INFO Toast',
            leftIconName: 'information-outline',
            handler: {
              iconName: 'chevron-right',
              onPress: () => Toast.show('INFO Toast', toastInfoOptions),
            },
          },
          {
            label: 'Show DANGER Toast',
            leftIconName: 'information-outline',
            handler: {
              iconName: 'chevron-right',
              onPress: () => Toast.show('DANGER Toast', toastErrorOptions),
            },
          },
          {
            label: 'Log out',
            leftIconName: 'account-arrow-right',
            handler: {onPress: handleLogout, iconName: 'logout'},
          },
        ],
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logOutDialog(() => {
      deleteMultiple([SK.name]);
      setIsLogged(false);
    });
  };

  return (
    <RootScreenWrapper>
      <SectionList
        sections={list}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={20}
        renderItem={({item}) => (
          <PressableListComponent
            label={item.label}
            handler={item.handler}
            leftIconName={item.leftIconName}
          />
        )}
        contentContainerStyle={{gap: Indent.M, padding: Indent.M}}
        renderSectionHeader={({section: {title}}) => (
          <Text style={[textLabelStyle, {marginHorizontal: Indent.L}]}>
            {title}
          </Text>
        )}
      />
    </RootScreenWrapper>
  );
};

export default SettingsScreen;
