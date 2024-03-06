import React from 'react';
import Home from './pages/homePage/Home';
import AdminLogin from './pages/adminPage/AdminLogin';
import AdminRegister from './pages/adminPage/AdminRegister';
import User from './pages/userPage/UserLogin';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home/>}></Route> 
        <Route exact path="/adminLogin" element={<AdminLogin/>}></Route>
        <Route exact path="/adminRegister" element={<AdminRegister/>}></Route>  
        <Route exact path="/user" element={<User/>}></Route> 
    </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;