import {TaskObj} from '@utils/data/TaskTypes.ts';
import {create} from 'zustand';

export type TaskStore = {
  tasks: TaskObj[];
  setTasks: (tasks: TaskObj[]) => void;
  addTask: (task: TaskObj) => void;
  removeTask: (place: number) => void;
  updateTask: (task: TaskObj) => void;
};

export const useTaskStore = create<TaskStore>()(set => ({
  tasks: [],
  setTasks: taskContainers => set(() => ({tasks: taskContainers})),
  addTask: taskContainer =>
    set(state => ({tasks: [...state.tasks, taskContainer]})),
  removeTask: place =>
    set(state => ({
      tasks: state.tasks
        .filter(t => t.place !== place)
        .map((t, i) => ({...t, place: i + 1})),
    })),
  updateTask: task =>
    set(state => ({
      tasks: state.tasks.map(t => (t.place === task.place ? task : t)),
    })),
}));
