import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (signUpState.error && !signUpState.loading) {
      notification.open({
        message: 'Error!',
        description: signUpState.error,
      });
    }
    if (signUpState.userData.id) {
      setTimeout(() => {
        navigate('/LogIn');
      }, 2000);
    }
  }, [signUpState.error, signUpState.loading, signUpState.userData.id]);
  const getLists = signUpHelp();
  const { nameList, ruleList } = getLists(language);

  return (
    <div className="signUp">
      <div>{locales[language].title}</div>
      {signUpState.userData.id ? (
        <>
          <div>{locales[language].greeting + signUpState.userData.name}</div>
          <div>
            <Link to="/LogIn">{locales[language].successSignUp}</Link>
          </div>
        </>
      ) : (
        <AuthForm nameList={nameList} ruleList={ruleList as ISignRules} hook={signUp} />
      )}
    </div>
  );
}
