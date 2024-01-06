import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";

function Login() {
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('https://express-server-hara.onrender.com/user/login', {
      username,
      password
    }).then(res => {
      setLogin(() => res.data.Login);
      if (res.data.Login) {
        navigate("/");
        window.location.reload(true);
      };
    });
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="flex text-white justify-center m-[3rem]">
          <div className="bg-black bg-opacity-90 flex rounded-md items-center">
            <form onSubmit={handleSubmit} className="flex flex-col p-10 gap-4">
              <div className="flex justify-center">
                <a className="select-none flex justify-center text-[3rem]">Login</a>
              </div>
              <div className="flex flex-col w-[15rem]">
                <label>Username</label>
                <input className={`${login === false && 'border-[0.1rem] border-red-500'} text-black pl-2`} onChange={(e) => setUsername(e.target.value)} value={username} type='text' />
              </div>
              <div className="flex flex-col w-[15rem]">
                <label>Password</label>
                <input className={`${login === false && 'border-[0.1rem] border-red-500'} text-black pl-2`} onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
                {login === false && <a className="text-[0.8rem] text-red-400">Incorrect username or password</a>}
              </div>
              <div className="flex flex-col w-[15rem] items-center text-center gap-3">
                <button type="submit" className="hover:bg-white hover:bg-opacity-90 hover:text-black duration-200 border w-[5rem]">Login</button>
                <div className="text-[0.7rem]">Create <a href="/register" className="hover:text-blue-500 duration-200 underline text-blue-400 font-bold hover:cursor-pointer">new account</a></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;