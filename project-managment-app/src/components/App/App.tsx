import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../../feature/Main/Main';
import Profile from '../../feature/Profile/Profile';
import LogIn from '../../feature/Log-In/Log-In';
import SignUp from '../../feature/Sign-Up/Sign-Up';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
