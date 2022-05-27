import { useDispatch, useSelector } from 'react-redux';
import { IUseUsersReturn } from './hooksTypes';
import { AppDispatch, IState } from '../../redux/store';
import { deleteUser, getUsers, updateUser } from '../../redux/slices/users/usersSlice';
import { IUserDeleteState, IUserUpdateState } from '../../redux/slices/users/usersTypes';

export function useUserData(): IUseUsersReturn {
  const dispatch = useDispatch() as AppDispatch;

  const usersData = useSelector((state: IState) => state.users);

  const getUsersList = (token: string) => {
    dispatch(getUsers(token));
  };

  const updateCurrentUser = (data: IUserUpdateState) => {
    dispatch(updateUser(data));
  };

  const deleteCurrentUser = (data: IUserDeleteState) => {
    dispatch(deleteUser(data));
  };

  return [usersData, getUsersList, updateCurrentUser, deleteCurrentUser];
}
