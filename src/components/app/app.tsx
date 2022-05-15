import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import NavHeader from '../navHeader/navHeader';
import Main from '../../feature/main/main';
import Profile from '../../feature/profile/profile';
import LogIn from '../../feature/logIn/logIn';
import SignUp from '../../feature/signUp/signUp';
import DesignComponents from '../designComponents/designComponents';
import PageNotFound from '../pageNotFound/pageNotFound';
import './app.scss';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="app-wrapper">
      <Header>
        <NavHeader />
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/demo" element={<DesignComponents />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Content>
      <Footer>@Team44</Footer>
    </Layout>
  );
}

export default App;
