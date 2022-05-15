import { ICreateState } from '../../redux/slices/boards/boardsTypes';

export interface IBoardCreatorProps {
  createBoard: (data: ICreateState) => void;
  authToken: string;
  handleOk: () => void;
}
