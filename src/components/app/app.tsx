import { Routes, Route } from 'react-router-dom';
import Header from '../header/header';
import Main from '../../feature/main/main';
import Profile from '../../feature/profile/profile';
import LogIn from '../../feature/logIn/logIn';
import SignUp from '../../feature/signUp/signUp';
import DesignComponents from '../designComponents/designComponents';
import PageNotFound from '../pageNotFound/pageNotFound';
import './app.scss';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/demo" element={<DesignComponents />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
