import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from 'antd';
import NavHeader from '../navHeader/navHeader';
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
import ErrorBoundary from '../errorBoundary/errorBoundary';

const { Header, Content, Footer } = Layout;

function App() {
  const [logInState] = useLogInData();
  const [authToken, getUserToken] = useAuthToken();

  useEffect(() => {
    getUserToken();
  }, [getUserToken, logInState.loading]);

  return (
    <Layout className="app-wrapper">
      <Header>
        <NavHeader />
      </Header>
      <Content>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={authToken ? <Main /> : <Welcome />} />
            <Route path="/Profile" element={authToken && <Profile />} />
            <Route path="/Tasks" element={authToken && <Navigate to="/" />} />
            <Route path="/People" element={authToken && <Navigate to="/" />} />
            <Route path="/LogIn" element={authToken ? <Navigate to="/" /> : <LogIn />} />
            <Route path="/SignUp" element={authToken ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/demo" element={<DesignComponents />} />
            <Route path="/Board" element={authToken && <Board />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </Content>
      <Footer>@Team44</Footer>
    </Layout>
  );
}

export default App;
