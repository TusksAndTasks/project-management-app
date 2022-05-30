import { useDispatch, useSelector } from 'react-redux';
import { IUseUsersReturn } from './hooksTypes';
import { AppDispatch, IState } from '../../redux/store';
import { getUsers } from '../../redux/slices/users/usersSlice';

export function useUsersData(): IUseUsersReturn {
  const dispatch = useDispatch() as AppDispatch;

  const usersData = useSelector((state: IState) => state.users);

  const getUsersList = (token: string) => {
    dispatch(getUsers(token));
  };

  /*  const getCurrentUser = (data: IUserShowState) => {
    dispatch(getUser(data));
  }; */

  return [usersData, getUsersList];
}
