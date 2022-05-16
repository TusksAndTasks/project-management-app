import { useDispatch, useSelector } from 'react-redux';
import { logUser } from '../../redux/slices/logIn/logInSlice';
import { ILogInData, ILogInState } from '../../redux/slices/logIn/logInTypes';
import { AppDispatch, IState } from '../../redux/store';

export function useLogInData(): [ILogInState, (data: ILogInData) => void] {
  const dispatch = useDispatch() as AppDispatch;

  const logInData = useSelector((state: IState) => state.logIn);

  const logIn = (data: ILogInData) => {
    dispatch(logUser(data));
  };
  return [logInData, logIn];
}
