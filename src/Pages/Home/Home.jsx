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
        className='bg-red-700 p-2 text-white'
        onClick={logoutFunc}>Log Out</button>
    </div>
  )
}

export default Home