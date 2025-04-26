import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const logoutFunc = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      navigate("/");
    }
  };

  return (
    <div>
      Home
      <button 
        className='bg-red-700 px-3 py-2 text-white rounded font-bold text-right'
        onClick={logoutFunc}>
          Log Out
      </button>
    </div>
  )
}

export default Home