import { useEffect } from 'react';
import { notification } from 'antd';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useLogInData } from '../../helpers/hooks/useLogInData';
import { AuthForm } from '../../components/authForm/authForm';
import './logIn.scss';
import { logInHelp } from '../../helpers/helperFunctions/logInHelper';

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

  const getLists = logInHelp();
  const { nameList, ruleList } = getLists(language);

  return (
    <div className="logIn">
      <div>{locales[language].title}</div>
      <AuthForm nameList={nameList} ruleList={ruleList} hook={logIn} />
    </div>
  );
}
