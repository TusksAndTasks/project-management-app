import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IState } from '../../redux/store';
import { IUserShowState, IUserUpdateState } from '../../redux/slices/user/userTypes';
import { getUser, updateUser } from '../../redux/slices/user/userSlice';
import { IUseUserReturn } from './hooksTypes';

export function useUserData(): IUseUserReturn {
  const dispatch = useDispatch() as AppDispatch;

  const userData = useSelector((state: IState) => state.user);

  const getCurrentUser = (data: IUserShowState) => {
    dispatch(getUser(data));
  };

  const updateCurrentUser = (data: IUserUpdateState) => {
    dispatch(updateUser(data));
  };

  return [userData, getCurrentUser, updateCurrentUser];
}
