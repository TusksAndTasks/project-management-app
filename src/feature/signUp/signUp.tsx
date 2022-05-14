import { useEffect } from 'react';
import { notification } from 'antd';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { AuthForm } from '../../components/authForm/authForm';
import { ISignRules } from './signUpFormTypes';
import { useSignUpData } from '../../helpers/hooks/useSignUpData';
import './signUp.scss';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import Main from '../main/main';

export default function SignUp() {
  const [language] = useLocales();
  const [signUpState, signUp] = useSignUpData();
  const [authToken] = useAuthToken();

  useEffect(() => {
    if (signUpState.error && !signUpState.loading) {
      notification.open({
        message: 'Error!',
        description: signUpState.error,
      });
    }
  }, [signUpState.error, signUpState.loading]);

  const nameList = {
    name: 'name',
    login: 'login',
    password: 'password',
  };

  const ruleList = {
    name: [
      {
        required: true,
        message: locales[language].nameRequired,
      },
      {
        type: 'string',
        min: 3,
        message: locales[language].nameRequired,
      },
      {
        type: 'string',
        pattern: /^[a-z-\s]+$/i,
        message: locales[language].namePattern,
      },
    ],
    login: [
      {
        required: true,
        message: locales[language].loginRequired,
      },
      {
        type: 'string',
        min: 8,
        message: locales[language].loginMin,
      },
      {
        type: 'string',
        pattern: /^[\w/S@]+$/i,
        message: locales[language].loginPattern,
      },
    ],
    password: [
      {
        required: true,
        message: locales[language].passwordRequired,
      },
      {
        type: 'string',
        min: 8,
        message: locales[language].passwordMin,
      },
      {
        type: 'string',
        pattern: /^[a-z0-9!@"#^&*§$%&_()=?/+-]+$/i,
        message: locales[language].passwordPattern,
      },
    ],
  };

  return authToken ? (
    <Main />
  ) : (
    <div className="signUp">
      <div>{locales[language].title}</div>
      {signUpState.userData.id ? (
        <div>{locales[language].greeting + signUpState.userData.name}</div>
      ) : (
        <AuthForm nameList={nameList} ruleList={ruleList as ISignRules} hook={signUp} />
      )}
    </div>
  );
}
