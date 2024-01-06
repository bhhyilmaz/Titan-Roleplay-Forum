import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import { FaCircleUser } from "react-icons/fa6";

function Register() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [existEmail, setexistEmail] = useState(Boolean);
  const [existUsername, setexistUsername] = useState(Boolean);
  const [wgEmail, setWgEmail] = useState(Boolean);
  const [wgUsername, setWgUsername] = useState(Boolean);
  const [wgPassword, setWgPassword] = useState(Boolean);

  const Submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://express-server-hara.onrender.com/user/register', {
        username,
        password,
        email
      }).then(res => {
        setexistEmail(() => res.data.existEmail);
        setexistUsername(() => res.data.existUsername);
        setWgEmail(() => res.data.wgEmail);
        setWgUsername(() => res.data.wgUsername);
        setWgPassword(() => res.data.wgPassword);

        if (
          !res.data.existEmail &&
          !res.data.existUsername &&
          !res.data.wgEmail &&
          !res.data.wgUsername &&
          !res.data.wgPassword
        ) navigate('/login');
      });


    } catch (error) {
      console.log('The Error:', error);
    };
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="flex text-white justify-center m-[3rem]">
          <div className="bg-black bg-opacity-90 flex rounded-md items-center">
            <form onSubmit={Submit} className="flex flex-col p-10 pr-0 gap-4">
              <div className="flex flex-col w-[15rem]">
                <label>Email</label>
                <input className={`${existEmail || wgEmail === true ? 'border-[0.1rem] border-red-500' : ''} text-black pl-2`} onChange={(e) => setEmail(e.target.value)} value={email} type='text' />
                {existEmail && <li className="text-red-400 text-[0.7rem]"><a className="text-[0.8rem] text-red-400">Email aldready exist</a></li>}
                {wgEmail && <li className="text-red-400 text-[0.7rem]"><a className="text-[0.8rem] text-red-400">Email must be typed properly formatted</a></li>}
              </div>
              <div className="flex flex-col w-[15rem]">
                <label>Username</label>
                <input className={`${existUsername || wgUsername === true ? 'border-[0.1rem] border-red-500' : ''} text-black pl-2`} onChange={(e) => setUsername(e.target.value)} value={username} type='text' />
                {existUsername && <li className="text-red-400 text-[0.7rem]"><a className="text-[0.8rem] text-red-400">Username aldready exist</a></li>}
                {wgUsername && <li className="text-red-400 text-[0.7rem]"><a className="text-[0.8rem] text-red-400">Username must be between 3 and 20 characters</a></li>}
              </div>
              <div className="flex flex-col w-[15rem]">
                <label>Password</label>
                <input className={`${wgPassword && 'border-[0.1rem] border-red-500'} text-black pl-2`} onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
                {wgPassword && <li className="text-red-400 text-[0.7rem]"><a className="text-[0.8rem] text-red-400">Password must be at least 6 characters</a></li>}
              </div>
              <div className="flex flex-col w-[15rem] items-center text-center gap-3">
                <div className="text-[0.7rem]">By clicking Register, you agree to our <a href="#" className="font-semibold underline">Privacy Policy</a> and <a href="#" className="underline font-semibold">Cookies Policy.</a></div>
                <button className="hover:bg-white hover:bg-opacity-90 hover:text-black duration-200 border w-[5rem]">Register</button>
                <div className="text-[0.7rem]">Already have an account? <a href="/login" className="hover:text-blue-500 duration-200 underline text-blue-400 font-bold hover:cursor-pointer">Login</a></div>
              </div>
            </form>
            <div className="flex flex-col mb-[5rem] p-5 w-min h-min">
              <a className="flex justify-center text-[6rem]"><FaCircleUser /></a>
              <a className="select-none text-[3rem]">Register</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
