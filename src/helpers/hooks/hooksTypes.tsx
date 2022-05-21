import { IBoardState, ICreateState, IDeleteState } from '../../redux/slices/boards/boardsTypes';

export type IUseBoardsReturn = [
  IBoardState,
  (token: string) => void,
  (data: ICreateState) => void,
  (data: IDeleteState) => void
];
