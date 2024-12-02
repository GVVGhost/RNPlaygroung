import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  CornerRadius,
  FontSize,
  IconSize,
  Indent,
} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import {TaskObj} from '@utils/data/TaskTypes.ts';
import RoundedIconButton from '@components/buttons/RoundedIconButton.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonStyles} from '@theme/CommonStyles.ts';

export interface TaskListComponentProps {
  item: TaskObj;
  onPress: () => void;
  onToggle?: () => void;
}

const TaskListComponent: React.FC<TaskListComponentProps> = memo(
  ({item, onPress, onToggle}) => {
    const {colors} = useTheme();

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: Indent.L,
          padding: Indent.M,
          borderRadius: CornerRadius.XL,
          marginHorizontal: Indent.XS,
          backgroundColor: colors.card,
        }}>
        <TouchableOpacity
          onPress={onToggle}
          style={[
            {
              backgroundColor: colors.card,
              padding: Indent.M,
              borderRadius: CornerRadius.L,
              minWidth: 34,
            },
            CommonStyles.shadow,
          ]}>
          {item.isComplete && (
            <View
              style={{
                position: 'absolute',
                top: -Indent.S,
                end: -Indent.XS,
                backgroundColor: 'green',
                padding: Indent.XS,
                borderRadius: CornerRadius.L,
              }}>
              <Icon name={'check'} size={IconSize.XS} color={colors.card} />
            </View>
          )}
          <Text
            style={{
              fontSize: FontSize.M,
              fontWeight: 'bold',
              color: colors.text,
              textAlign: 'center',
            }}>
            {item.place}
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold', color: colors.text}}>
            {item.title}
          </Text>
          <Text style={{color: colors.text}}>{item.description}</Text>
        </View>
        <RoundedIconButton iconName={'pencil'} onPress={onPress} />
      </View>
    );
  },
);

export default TaskListComponent;
