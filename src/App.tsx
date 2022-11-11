import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LayoutMenu from './Layout/LayoutMenu';
import Home from './Home/Home';
import Login from './Login/Login';
import { RecoilRoot } from 'recoil';
import Singup from './SignUp/Singup';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutMenu />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Singup' element={<Singup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );

}
export default App;