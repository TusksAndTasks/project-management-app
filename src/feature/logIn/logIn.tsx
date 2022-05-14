import { useEffect } from 'react';
import { notification } from 'antd';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useLogInData } from '../../helpers/hooks/useLogInData';
import { AuthForm } from '../../components/authForm/authForm';
import { ISignRules } from '../signUp/signUpFormTypes';
import './logIn.scss';

export default function LogIn() {
  const [language] = useLocales();
  const [logInState, logIn] = useLogInData();

  useEffect(() => {
    if (logInState.error && !logInState.loading) {
      notification.open({
        message: 'Error!',
        description: logInState.error,
      });
    }
  }, [logInState.error, logInState.loading]);

  const nameList = {
    login: 'login',
    password: 'password',
  };

  const ruleList = {
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

  return (
    <div className="logIn">
      <div>{locales[language].title}</div>
      <AuthForm nameList={nameList} ruleList={ruleList as ISignRules} hook={logIn} />
    </div>
  );
}
