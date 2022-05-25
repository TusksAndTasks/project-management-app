import { IFullTask } from '../../redux/slices/tasks/tasksTypes';

export interface ITaskProps {
  task: IFullTask;
  ids: {
    boardId: string;
    columnId: string;
  };
}
