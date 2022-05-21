import { ICurrentBoardState, IShowState } from '../../redux/slices/board/boardTypes';
import { IBoardState, ICreateState, IDeleteState } from '../../redux/slices/boards/boardsTypes';

export type IUseBoardsReturn = [
  IBoardState,
  (token: string) => void,
  (data: ICreateState) => void,
  (data: IDeleteState) => void
];

export type IUseBoardReturn = [ICurrentBoardState, (data: IShowState) => void];
