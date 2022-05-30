import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IState } from '../../redux/store';
import { IUserShowState, IUserUpdateState } from '../../redux/slices/user/userTypes';
import { deleteUser, getUser, updateUser } from '../../redux/slices/user/userSlice';
import { IUseUserReturn } from './hooksTypes';
import { IUserDeleteState } from '../../redux/slices/users/usersTypes';

export function useUserData(): IUseUserReturn {
  const dispatch = useDispatch() as AppDispatch;

  const userData = useSelector((state: IState) => state.user);

  const getCurrentUser = (data: IUserShowState) => {
    dispatch(getUser(data));
  };

  const updateCurrentUser = (data: IUserUpdateState) => {
    dispatch(updateUser(data));
  };

  const deleteCurrentUser = (data: IUserDeleteState) => {
    dispatch(deleteUser(data));
  };

  return [userData, getCurrentUser, updateCurrentUser, deleteCurrentUser];
}
