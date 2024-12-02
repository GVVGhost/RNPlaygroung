import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/stacks/HomeStack.tsx';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {FlatList, RefreshControl, View} from 'react-native';
import {Indent} from '@theme/DimensionValues.ts';
import TaskFacadeComponent from '@components/listItems/TaskFacadeComponent.tsx';
import {TaskContainerObj} from '@utils/data/TaskTypes.ts';
import {readOne, SK} from '@utils/storage/mmkvStorage.ts';
import RoundedIconButton from '@components/buttons/RoundedIconButton.tsx';
import uuid from 'react-native-uuid';
import moment from 'moment';
import {useTaskContainerStore} from '@utils/zustand/TaskContainerStore.ts';
import {getManyTasks} from '@api/requests/taskHelper.ts';
import {useTheme} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {toastErrorOptions} from '@utils/notifications/Toast.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {colors} = useTheme();
  const {taskContainers, setTaskContainers} = useTaskContainerStore();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadTaskContainers();
  }, []);

  const navigateToTaskScreen = (task?: TaskContainerObj) => {
    const name = readOne(SK.name);
    const id = readOne(SK.id);
    if (!name || !id) {
      Toast.show(
        'Some user data is missing. Try to re-login',
        toastErrorOptions,
      );
      return;
    }

    const data: TaskContainerObj = task || {
      uuid: uuid.v4().toString(),
      tasks: [],
      title: '',
      description: '',
      createdAt: moment.now(),
      updatedAt: moment.now(),
      owner: {name, id},
    };
    navigation.navigate('TaskScreen', {data, isNewTask: !task});
  };

  const loadTaskContainers = () => {
    const userId = readOne(SK.id);
    if (!userId) {
      Toast.show('Local data is missed. Try re-login', toastErrorOptions);
      return;
    }
    setRefresh(true);
    getManyTasks(userId)
      .then(r => {
        if (r) setTaskContainers(r);
      })
      .finally((): void => setRefresh(false));
  };

  const handleSwipe = async () => {
    loadTaskContainers();
  };

  return (
    <RootScreenWrapper style={{flex: 1, gap: Indent.S}}>
      <View
        style={{
          flexDirection: 'row-reverse',
          marginHorizontal: Indent.M,
          gap: Indent.XL,
        }}>
        <RoundedIconButton
          iconName={'plus'}
          onPress={() => navigateToTaskScreen()}
        />
      </View>
      <FlatList
        data={taskContainers}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={20}
        renderItem={({item, index}) => (
          <TaskFacadeComponent
            key={index.toString()}
            taskContainer={item}
            onPress={() => navigateToTaskScreen(item)}
          />
        )}
        contentContainerStyle={{gap: Indent.M, paddingHorizontal: Indent.L}}
        refreshControl={
          <RefreshControl
            colors={[colors.background]}
            progressBackgroundColor={colors.primary}
            refreshing={refresh}
            onRefresh={handleSwipe}
          />
        }
      />
    </RootScreenWrapper>
  );
};

export default HomeScreen;
