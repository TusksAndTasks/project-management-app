import { useDispatch, useSelector } from 'react-redux';
import { IUseUsersReturn } from './hooksTypes';
import { AppDispatch, IState } from '../../redux/store';
import { deleteUser, getUsers } from '../../redux/slices/users/usersSlice';
import { IUserDeleteState } from '../../redux/slices/users/usersTypes';

export function useUsersData(): IUseUsersReturn {
  const dispatch = useDispatch() as AppDispatch;

  const usersData = useSelector((state: IState) => state.users);

  const getUsersList = (token: string) => {
    dispatch(getUsers(token));
  };

  const deleteCurrentUser = (data: IUserDeleteState) => {
    dispatch(deleteUser(data));
  };

  /*  const getCurrentUser = (data: IUserShowState) => {
    dispatch(getUser(data));
  }; */

  return [usersData, getUsersList, deleteCurrentUser];
}
