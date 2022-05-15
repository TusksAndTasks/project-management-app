import { useDispatch, useSelector } from 'react-redux';
import { createBoard, deleteBoard, getBoards } from '../../redux/slices/boards/boardsSlice';
import { ICreateState, IDeleteState } from '../../redux/slices/boards/boardsTypes';
import { AppDispatch, IState } from '../../redux/store';
import { IUseBoardsReturn } from './hooksTypes';

export function useBoardsList(): IUseBoardsReturn {
  const dispatch = useDispatch() as AppDispatch;

  const boardsData = useSelector((state: IState) => state.boards);

  const getBoardsList = (token: string) => {
    dispatch(getBoards(token));
  };

  const createNewBoard = (data: ICreateState) => {
    dispatch(createBoard(data));
  };

  const deleteOldBoard = (data: IDeleteState) => {
    dispatch(deleteBoard(data));
  };

  return [boardsData, getBoardsList, createNewBoard, deleteOldBoard];
}
