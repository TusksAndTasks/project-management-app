import { IDeleteState } from '../../redux/slices/boards/boardsTypes';
import { IDeleteColumnData } from '../../redux/slices/columns/columnsTypes';
import { IDeleteTaskData } from '../../redux/slices/tasks/tasksTypes';

export interface IItemToDel {
  id?: string;
  boardId?: string;
  columnId?: string;
  taskId?: string;
  newColumn?: string;
}
export interface IConformModalProps {
  deleteItem: DeleteDefault | DeleteColumn | DeleteTask;
  authToken: string;
  handleOk: () => void;
  itemToDel: IItemToDel;
  name: string;
}

export type DeleteDefault = (data: IDeleteState) => void;
export type DeleteColumn = (data: IDeleteColumnData) => void;
export type DeleteTask = (data: IDeleteTaskData) => void;
export type ComplexDeleteData = IDeleteState & IDeleteColumnData & IDeleteTaskData;
