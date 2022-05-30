import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, deleteAuthToken } from '../../redux/slices/authentication/authSlice';
import { AppDispatch, IState } from '../../redux/store';

export function useAuthToken(): [
  string,
  () => {
    payload: undefined;
    type: string;
  },
  () => {
    payload: undefined;
    type: string;
  }
] {
  const dispatch = useDispatch() as AppDispatch;

  const authToken = useSelector((state: IState) => state.auth.token);

  const getUserToken = () => dispatch(setAuthToken());
  const deleteUserToken = () => dispatch(deleteAuthToken());

  return [authToken, getUserToken, deleteUserToken];
}
