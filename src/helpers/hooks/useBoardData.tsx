import { useDispatch, useSelector } from 'react-redux';
import { showBoard } from '../../redux/slices/board/boardSlice';
import { IShowState } from '../../redux/slices/board/boardTypes';
import { AppDispatch, IState } from '../../redux/store';
import { IUseBoardReturn } from './hooksTypes';

export function useBoardData(): IUseBoardReturn {
  const dispatch = useDispatch() as AppDispatch;

  const boardData = useSelector((state: IState) => state.board);

  const getBoard = (data: IShowState) => {
    dispatch(showBoard(data));
  };

  return [boardData, getBoard];
}
