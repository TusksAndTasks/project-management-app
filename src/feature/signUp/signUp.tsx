import { useEffect } from 'react';
import { notification } from 'antd';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { AuthForm } from '../../components/authForm/authForm';
import { ISignRules } from './signUpFormTypes';
import { useSignUpData } from '../../helpers/hooks/useSignUpData';
import './signUp.scss';
import { signUpHelp } from '../../helpers/helperFunctions/signUpHelper';

export default function SignUp() {
  const [language] = useLocales();
  const [signUpState, signUp] = useSignUpData();

  useEffect(() => {
    if (signUpState.error && !signUpState.loading) {
      notification.open({
        message: 'Error!',
        description: signUpState.error,
      });
    }
  }, [signUpState.error, signUpState.loading]);
  const getLists = signUpHelp();
  const { nameList, ruleList } = getLists(language);

  return (
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
