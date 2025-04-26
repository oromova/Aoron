import React, { useEffect } from 'react';
import Login from './Pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layout from './Components/Layout';


const App = () => {
  const tokenbek = localStorage.getItem("accesstokenchik");
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenbek) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>
        {/* 404 sahifa */}
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;