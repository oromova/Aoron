import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const loginSubmit = (e) => {
    e.preventDefault()
    fetch("https://back.ifly.com.uz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        login: login,
        password: password
      })
    })
    .then((response)=> response.json())
    .then((item) => {
      console.log(item)
      if(item?.success){
        toast.success(item?.data?.message);
        localStorage.setItem("accesstoken", item?.data?.access_token)
        localStorage.setItem("refreshtoken", item?.data?.refresh_token)
        navigate('/products')
      }
      else{
        toast.error(item?.message?.message)
      }
    })
  }
 
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={loginSubmit}
          className="p-8 bg-white rounded-xl shadow-md w-full max-w-sm ">
          <h2 className="text-2xl font-bold mb-6 text-center mt">Login Page</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Login:</label>
            <input
              onChange={(e) => setLogin(e.target.value)}
              required
              minLength={3}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Login"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Parol:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={3}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Parol"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Kirish
          </button>
        </form>
      </div>

    </div>
  );
};

export default Login;
