import React, { useEffect } from 'react';
import Login from './Pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home/Home';


const App = () => {
  const tokenbek = localStorage.getItem("accesstokenchik");
  const navigate = useNavigate()

  useEffect(() => {
    if (tokenbek){
      navigate("/home")
    }else{
      navigate("/")
    }
  },[]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;