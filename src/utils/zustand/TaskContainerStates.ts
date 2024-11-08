import {TaskContainerObj} from "@utils/data/TaskTypes.ts";
import {create} from "zustand";

export type TaskContainerStore = {
    taskContainers: TaskContainerObj[];
    setTaskContainers: (taskContainers: TaskContainerObj[]) => void;
    addTaskContainer: (taskContainer: TaskContainerObj) => void;
    removeTaskContainer: (uuid: string) => void;
    updateTaskContainer: (taskContainer: TaskContainerObj) => void;
}

export const useTaskContainerStore = create<TaskContainerStore>()((set) => ({
    taskContainers: [],
    setTaskContainers: (taskContainers) => set(
        (state) => (
            {taskContainers: taskContainers}
        )
    ),
    addTaskContainer: (taskContainer) => set(
        (state) => (
            {taskContainers: [...state.taskContainers, taskContainer]}
        )
    ),
    removeTaskContainer: (uuid) => set(
        (state) => (
            {taskContainers: state.taskContainers.filter(t => t.uuid !== uuid)}
        )
    ),
    updateTaskContainer: (taskContainer) => set(
        (state) => (
            {taskContainers: state.taskContainers.map(t => t.uuid === taskContainer.uuid ? taskContainer : t)}
        )
    )
}))
