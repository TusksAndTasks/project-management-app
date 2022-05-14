import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '../../redux/slices/boards/boardsSlice';
import { IBoardState } from '../../redux/slices/boards/boardsTypes';
import { AppDispatch, IState } from '../../redux/store';

export function useLogInData(): [IBoardState, (token: string) => void] {
  const dispatch = useDispatch() as AppDispatch;

  const boardsData = useSelector((state: IState) => state.boards);

  const getBoardsList = (token: string) => {
    dispatch(getBoards(token));
  };
  return [boardsData, getBoardsList];
}
