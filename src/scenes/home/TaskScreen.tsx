import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/stacks/HomeStack.tsx';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {Indent} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import {taskFormTIStyle} from '@theme/TextInputStyles.ts';
import {labelTextStyle} from '@theme/TextStyles.ts';
import {TaskObj} from '@utils/data/TaskTypes.ts';
import RoundedIconButton from '@components/buttons/RoundedIconButton.tsx';
import TaskModal from '@components/modals/TaskModal.tsx';
import {useTaskStore} from '@utils/zustand/TaskStates.ts';
import TaskListComponent from '@components/listItems/TaskListComponent.tsx';
import {useTaskContainerStore} from '@utils/zustand/TaskContainerStates.ts';
import {toastShow} from '@utils/notifications/Toast.ts';
import {ALERT_TYPE} from 'react-native-alert-notification';
import moment from 'moment/moment';
import RoundedAnimatedButton from '@components/buttons/RoundedAnimatedButton.tsx';
import {deleteTask, uploadTask} from '@api/requests/taskHelper.ts';
import {delay} from '@utils/simpleDalay.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'TaskScreen'>;

const TaskScreen: React.FC<Props> = ({route, navigation}) => {
  const theme = useTheme();
  const textInputStyle = taskFormTIStyle(theme);
  const textLabelStyle = labelTextStyle(theme);

  const {addTaskContainer, removeTaskContainer, updateTaskContainer} =
    useTaskContainerStore();
  const {tasks, setTasks, updateTask} = useTaskStore();

  const [title, setTitle] = useState<string>(route.params.data.title);
  const [description, setDescription] = useState<string>(
    route.params.data.description,
  );

  const [modalTask, setModalTask] = useState<TaskObj | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [saveButtonAnimate, setSaveButtonAnimate] = useState<boolean>(false);
  const [deleteButtonAnimate, setDeleteButtonAnimate] =
    useState<boolean>(false);

  useEffect(() => {
    if (!route.params.isNewTask) setTasks(route.params.data.tasks);
    const removeListener = navigation.addListener('beforeRemove', e => {
      setTasks([]);
    });
    return () => {
      removeListener();
    };
  }, []);

  const openTaskInModal = (t: TaskObj) => {
    setModalTask(t);
    setIsModalVisible(true);
  };

  const onModalDismiss = () => {
    setIsModalVisible(false);
    setModalTask(null);
  };

  const onSavePressed = async () => {
    if (title.trim().length === 0) {
      toastShow('Please enter a title to the task', ALERT_TYPE.WARNING);
      return;
    }
    const taskContainer = {
      ...route.params.data,
      title,
      description,
      tasks,
      updatedAt: moment.now(),
    };
    setSaveButtonAnimate(true);
    await delay(2000);
    uploadTask(
      taskContainer,
      route.params.isNewTask
        ? {method: 'POST', url: '/create_task'}
        : {method: 'PUT', url: '/update_task'},
    )
      .then(response => {
        if (response) {
          if (route.params.isNewTask) addTaskContainer(taskContainer);
          else updateTaskContainer(taskContainer);
          toastShow(
            !route.params.isNewTask
              ? 'Task container updated'
              : 'Added new task container',
            ALERT_TYPE.SUCCESS,
          );
        }
      })
      .finally((): void => setSaveButtonAnimate(false));
  };

  const onDeletePressed = () => {
    if (!route.params.isNewTask) {
      setDeleteButtonAnimate(true);
      deleteTask(route.params.data.uuid)
        .then(uuids => {
          if (uuids) {
            removeTaskContainer(route.params.data.uuid);
            navigateBack();
          }
        })
        .finally((): void => setDeleteButtonAnimate(false));
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const onTogglePressed = (item: TaskObj) => {
    updateTask({...item, isComplete: !item.isComplete});
  };

  return (
    <RootScreenWrapper style={{flex: 1, gap: Indent.M}}>
      <View
        style={{
          flexDirection: 'row-reverse',
          marginHorizontal: Indent.L,
          gap: Indent.XL,
        }}>
        <RoundedAnimatedButton
          iconName={'content-save-outline'}
          onPress={onSavePressed}
          isAnimated={saveButtonAnimate}
        />
        {!route.params.isNewTask && (
          <RoundedAnimatedButton
            iconName={'delete'}
            onPress={onDeletePressed}
            isAnimated={deleteButtonAnimate}
          />
        )}
        <View style={{flex: 1}} />
        <RoundedIconButton iconName={'arrow-left'} onPress={navigateBack} />
      </View>
      <ScrollView contentContainerStyle={{gap: Indent.S, padding: Indent.S}}>
        <Text style={[textLabelStyle, {marginHorizontal: Indent.L}]}>
          Title
        </Text>
        <TextInput
          placeholderTextColor={theme.colors.text}
          placeholder={'Enter the title'}
          value={title}
          onChangeText={setTitle}
          style={textInputStyle}
        />
        <Text style={[textLabelStyle, {marginHorizontal: Indent.L}]}>
          Description
        </Text>
        <TextInput
          placeholderTextColor={theme.colors.text}
          placeholder={'Enter the description'}
          multiline={true}
          scrollEnabled={true}
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
          style={[textInputStyle, {maxHeight: 100}]}
        />
        <View
          style={{
            flexDirection: 'row',
            margin: Indent.L,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={textLabelStyle}>Tasks</Text>
          <RoundedIconButton
            iconName={'plus'}
            onPress={(): void => setIsModalVisible(true)}
          />
        </View>
        {tasks.map((item, index) => (
          <TaskListComponent
            key={index}
            item={item}
            onPress={(): void => openTaskInModal(item)}
            onToggle={() => onTogglePressed(item)}
          />
        ))}
      </ScrollView>
      <TaskModal
        visible={isModalVisible}
        onDismiss={onModalDismiss}
        existedTask={modalTask}
      />
    </RootScreenWrapper>
  );
};

export default TaskScreen;
