import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const logoutFunc = () => {
    localStorage.removeItem("accesstoken")
    localStorage.removeItem("refreshtoken")
    navigate("/")
  }

  return (
    <div>Home
      <button 
        className='bg-red-700 px-3 py-2 text-white rounded'
        onClick={logoutFunc}>Log Out</button>
    </div>
  )
}

export default Home