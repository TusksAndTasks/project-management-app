import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/slices/signUp/signUpSlice';
import { ISignUpData, ISignUpState } from '../../redux/slices/signUp/singUpTypes';
import { AppDispatch, IState } from '../../redux/store';

export function useSignUpData(): [ISignUpState, (data: ISignUpData) => void] {
  const dispatch = useDispatch() as AppDispatch;

  const signUpData = useSelector((state: IState) => state.signUp);

  const signUp = (data: ISignUpData) => {
    dispatch(createUser(data));
  };

  return [signUpData, signUp];
}
