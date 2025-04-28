import React, { useEffect } from 'react';
import Login from './Pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layout from './Components/Layout';
import Products from './Pages/Products/Products';
import Category from './Pages/Category/Category';
import Discount from './Pages/Discount/Discount';
import Sizes from './Pages/Sizes/Sizes';
import Colors from './Pages/Colors/Colors';
import Faq from './Pages/Faq/Faq';
import Contact from './Pages/Contact/Contact';
import Team from './Pages/Team/Team';
import News from './Pages/News/News';
import Error from './Components/Error';


const App = () => {
  const token = localStorage.getItem("accesstoken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />   
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="category" element={<Category />} />
          <Route path="discount" element={<Discount />} />
          <Route path="sizes" element={<Sizes />} />
          <Route path="colors" element={<Colors />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="team" element={<Team />} />
          <Route path="news" element={<News />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;