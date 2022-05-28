import { IDeleteState } from '../../redux/slices/boards/boardsTypes';

export interface IItemToDel {
  id: string;
  name: string;
}
export interface IConformModalProps {
  deleteItem: (data: IDeleteState) => void;
  authToken: string;
  handleOk: () => void;
  itemToDel: IItemToDel;
}
