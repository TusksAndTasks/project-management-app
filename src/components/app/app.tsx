import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../header/header';
import Main from '../../feature/main/main';
import Profile from '../../feature/profile/profile';
import LogIn from '../../feature/logIn/logIn';
import SignUp from '../../feature/signUp/signUp';
import DesignComponents from '../designComponents/designComponents';
import PageNotFound from '../pageNotFound/pageNotFound';
import './app.scss';
import { useLogInData } from '../../helpers/hooks/useLogInData';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import Welcome from '../../feature/welcome/welcome';
import Board from '../../feature/board/board';

function App() {
  const [logInState] = useLogInData();
  const [authToken, getUserToken] = useAuthToken();

  useEffect(() => {
    getUserToken();
  }, [getUserToken, logInState.loading]);

  return (
    <div className="app-wrapper">
      <Header />
      <Routes>
        <Route path="/" element={authToken ? <Main /> : <Welcome />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/LogIn" element={authToken ? <Main /> : <LogIn />} />
        <Route path="/SignUp" element={authToken ? <Main /> : <SignUp />} />
        <Route path="/demo" element={<DesignComponents />} />
        <Route path="/Board" element={<Board />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
