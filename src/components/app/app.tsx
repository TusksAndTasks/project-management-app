import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavHeader from '../navHeader/navHeader';
import Profile from '../../feature/profile/profile';
import LogIn from '../../feature/logIn/logIn';
import SignUp from '../../feature/signUp/signUp';
import DesignComponents from '../designComponents/designComponents';
import PageNotFound from '../pageNotFound/pageNotFound';
import './app.scss';
import { useLogInData } from '../../helpers/hooks/useLogInData';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import Welcome from '../../feature/welcome/welcome';
import { Board } from '../../feature/board/board';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import Boards from '../../feature/boards/boards';

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
        <DndProvider backend={HTML5Backend}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={authToken ? <Main /> : <Welcome />} />
              <Route path="/Profile" element={authToken && <Profile />} />
              <Route path="/Boards" element={authToken && <Boards />} />
              <Route path="/Tasks" element={authToken && <Navigate to="/" />} />
              <Route path="/People" element={authToken && <Navigate to="/" />} />
              <Route path="/LogIn" element={authToken ? <Navigate to="/" /> : <LogIn />} />
              <Route path="/SignUp" element={authToken ? <Navigate to="/" /> : <SignUp />} />
              <Route path="/demo" element={<DesignComponents />} />
              <Route path="/Board" element={authToken && <Board />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ErrorBoundary>
        </DndProvider>
      </Content>
      <Footer>@Team44</Footer>
    </Layout>
  );
}

export default App;
