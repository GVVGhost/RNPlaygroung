export type TaskContainerObj = {
  createdAt: number;
  description: string;
  owner: TaskOwnerObj;
  tasks: TaskObj[];
  title: string;
  updatedAt: number;
  uuid: string;
};

export type TaskObj = {
  place: number;
  title: string;
  description: string;
  isComplete: boolean;
  color:
    | 'red'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'black'
    | 'orange'
    | 'magenta'
    | 'cyan'
    | 'white';
};

export type TaskOwnerObj = {
  name: string;
  id: string;
};
