import React, {useEffect, useState} from 'react';
import {Switch, Text, TextInput, View} from 'react-native';
import {TaskObj} from '@utils/data/TaskTypes.ts';
import {Indent} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import {taskFormTIStyle} from '@theme/TextInputStyles.ts';
import {labelTextStyle} from '@theme/TextStyles.ts';
import {useTaskStore} from '@utils/zustand/TaskStates.ts';
import SlideModal from '@components/modals/SlideModal.tsx';
import SecondaryButton from '@components/buttons/SecondaryButton.tsx';
import Toast from 'react-native-root-toast';
import {toastWarningOptions} from '@utils/notifications/Toast.ts';

interface TaskModalProps {
  visible: boolean;
  existedTask?: TaskObj | null;
  onDismiss: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onDismiss,
  existedTask,
}) => {
  const {tasks, setTasks, removeTask, addTask, updateTask} = useTaskStore();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const theme = useTheme();
  const textInputStyle = taskFormTIStyle(theme);
  const textLabelStyle = labelTextStyle(theme);

  const onAcceptPressed = () => {
    if (title.trim().length === 0) {
      Toast.show('Please enter a title to the task', toastWarningOptions);
      return;
    }
    if (existedTask) {
      updateTask({...existedTask, title, description, isComplete: isComplete});
      onDismiss();
    } else {
      addTask({
        color: 'white',
        description,
        isComplete: isComplete,
        place: tasks.length + 1,
        title,
      });
      setTitle('');
      setDescription('');
      setIsComplete(false);
    }
    Toast.show(
      existedTask ? 'Task updated' : 'Added new task',
      toastWarningOptions,
    );
  };

  const onDeletePressed = () => {
    if (existedTask) {
      removeTask(existedTask.place);
      Toast.show('Task removed successfully', toastWarningOptions);
    }
    onDismiss();
  };

  useEffect(() => {
    setTitle(existedTask?.title || '');
    setDescription(existedTask?.description || '');
    setIsComplete(existedTask?.isComplete || false);
  }, [existedTask]);

  return (
    <SlideModal
      visible={visible}
      onDismiss={{label: 'Close', action: onDismiss}}
      onAccept={{
        label: existedTask ? 'Update' : 'Add',
        action: onAcceptPressed,
      }}>
      <View style={{padding: Indent.L, gap: Indent.XL}}>
        <TextInput
          placeholderTextColor={theme.colors.text}
          placeholder={'Enter the title'}
          value={title}
          onChangeText={setTitle}
          style={textInputStyle}
        />
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
            justifyContent: 'space-between',
            paddingVertical: Indent.M,
          }}>
          <Text style={[textLabelStyle, {paddingStart: Indent.L}]}>
            Completed
          </Text>
          <Switch value={isComplete} onValueChange={setIsComplete} />
        </View>
        {existedTask && (
          <SecondaryButton
            text={'Delete this task'}
            onPress={onDeletePressed}
          />
        )}
      </View>
    </SlideModal>
  );
};

export default TaskModal;
