import { Routes, Route, Navigate } from 'react-router-dom';
import { CSSProperties, useEffect, useState } from 'react';
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
import FooterBottom from '../footer/footerBottom';

const { Header, Content, Footer } = Layout;

function App() {
  const [logInState] = useLogInData();
  const [authToken, getUserToken] = useAuthToken();
  const [isStickyHeader, setIsStickyHeader] = useState<boolean>(false);

  const setStickyHeader = () => {
    if (window.scrollY > 90) {
      setIsStickyHeader(true);
    } else {
      setIsStickyHeader(false);
    }
  };

  const styleSticky: CSSProperties = {
    position: 'sticky',
    background: '#E2D5C6',
    top: 0,
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)',
  };

  useEffect(() => {
    window.document.addEventListener('scroll', setStickyHeader);
    return () => {
      window.document.removeEventListener('scroll', setStickyHeader);
    };
  }, []);

  useEffect(() => {
    getUserToken();
  }, [getUserToken, logInState.loading]);

  return (
    <Layout className="app-wrapper">
      <Header style={isStickyHeader ? styleSticky : { position: 'static', background: '#fff' }}>
        <NavHeader />
      </Header>
      <Content>
        <DndProvider backend={HTML5Backend}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={authToken ? <Boards /> : <Welcome />} />
              <Route path="/Profile" element={authToken && <Profile />} />
              <Route path="/Boards" element={authToken && <Boards />} />
              <Route path="/LogIn" element={authToken ? <Navigate to="/" /> : <LogIn />} />
              <Route path="/SignUp" element={authToken ? <Navigate to="/" /> : <SignUp />} />
              <Route path="/demo" element={<DesignComponents />} />
              <Route path="/Board/:BoardId" element={authToken && <Board />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ErrorBoundary>
        </DndProvider>
      </Content>
      <Footer>
        <FooterBottom />
      </Footer>
    </Layout>
  );
}

export default App;
