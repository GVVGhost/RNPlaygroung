import React, {memo} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FontSize, IconSize, Indent,} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import CardWrapper from "@components/wrappers/CardWrapper.tsx";
import {TaskContainerObj} from "@utils/data/TaskTypes.ts";
import RoundedIconButton from "@components/buttons/RoundedIconButton.tsx";
import moment from "moment";

export interface TaskFacadeComponentProps {
    taskContainer: TaskContainerObj;
    onPress?: () => void;
}

const TaskFacadeComponent: React.FC<TaskFacadeComponentProps> = memo((
        {
            taskContainer,
            onPress = () => {
            }
        }
    ) => {
        const {colors} = useTheme();

        return <CardWrapper style={{flexDirection: 'column'}}>
            <View style={{gap: Indent.L}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}>
                    <Text style={{fontSize: FontSize.M, color: colors.primary, fontWeight: 'bold', flexShrink: 50}}>
                        {taskContainer.title}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: Indent.M}}>
                        <Icon name={'account'} size={IconSize.S} color={colors.primary}/>
                        <Text style={{fontSize: FontSize.M, color: colors.primary, fontWeight: 'bold'}}>
                            {taskContainer.owner.name}
                        </Text>
                    </View>
                </View>
                <Text style={{fontSize: FontSize.S, color: colors.text, fontWeight: '400'}}>
                    {taskContainer.description.length > 200 ? taskContainer.description.substring(0, 200)+" ..." : taskContainer.description}
                </Text>
                <View style={{gap: Indent.M, marginVertical: Indent.L}}>
                    {
                        (taskContainer.tasks.length < 3 ? taskContainer.tasks : taskContainer.tasks.slice(0, 3))
                            .map((task, index) =>
                                <View key={index}>
                                    <Text style={{
                                        fontSize: FontSize.S,
                                        color: colors.text,
                                        fontWeight: task.isComplete ? '300' : '600',
                                        textDecorationStyle: task.isComplete ? "dashed" : 'solid'
                                    }}>
                                        {task.place}. {task.title} {task.isComplete && "(completed)"}
                                    </Text>
                                    <Text style={{
                                        paddingStart: Indent.XL,
                                        fontSize: FontSize.S,
                                        color: colors.text,
                                        fontWeight: task.isComplete ? '300' : '400'
                                    }}>
                                        {task.description}
                                    </Text>
                                </View>
                            )
                    }
                    {
                        taskContainer.tasks.length >= 3 &&
                        <Text style={{paddingStart: Indent.XL, color: colors.text}}>...</Text>
                    }
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: FontSize.S, color: colors.text, fontWeight: '300', textAlign: 'right'}}>
                        Last edit {moment(taskContainer.updatedAt).format('DD/MM/YYYY hh:mm')}
                    </Text>
                    <RoundedIconButton onPress={onPress} iconName={'chevron-right'}/>
                </View>

            </View>
        </CardWrapper>;
    },
);

export default TaskFacadeComponent;
