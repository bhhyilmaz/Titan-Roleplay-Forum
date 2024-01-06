import { Menu } from '@headlessui/react';
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Navbar() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [session, setSession] = useState(false);
  const [username, setUsername] = useState(String);

  useEffect(() => {
    axios.get('https://express-server-hara.onrender.com/users').then(res => {
      setSession(res.data.Session);
      setUsername(res.data.Username);
    });
  }, []);

  useEffect(() => {
    if (logout) {
      try {
        axios.post('https://express-server-hara.onrender.com/user/logout', { logout });
        navigate('/');
        window.location.reload(true);
      } catch (error) {
        console.log('Client Error:', error);
      }
    }
  }, [logout]);

  return (
    <div className="bg-black text-white bg-opacity-80 flex items-center justify-between">
      <div className='ml-[10rem] p-5 select-none font-bold text-[2rem] text-white'>
        <a href="/" className="hover:text-[#dedede] duration-500">TITAN ROLEPLAY</a>
      </div>
      <div>
        <div className="p-2 items-center flex gap-4 mr-[10rem]">
          <a href="/" className="hover:bg-[#303030] duration-200 p-2 bg-black rounded-md">FORUM</a>
        </div>
      </div>
      {session ?
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="hover:bg-[#303030] duration-200 flex items-center gap-2 mr-[9rem] bg-opacity-80 bg-black p-2 rounded-md">PROFILE</Menu.Button>
          </div>
          <Menu.Items className="bg-black mr-[5rem] absolute right-0 z-10 w-48 py-2 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div>
              <Menu.Item className="hover:bg-[#303030] duration-200">
                <div>
                  <a href={`/profile/${username}`} className="text-white  block px-4 py-2 text-sm">
                    My Page
                  </a>
                </div>
              </Menu.Item>
              <Menu.Item className="hover:bg-[#303030] duration-200">
                <div>
                  <a href="/profile" className="text-white  block px-4 py-2 text-sm">
                    Settings
                  </a>
                </div>
              </Menu.Item>
              <Menu.Item className="hover:bg-[#303030] duration-200">
                <div>
                  <a className="cursor-pointer text-white  block px-4 py-2 text-sm"
                    onClick={() => setLogout(true)}>Logout
                  </a>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
        :
        <div className="p-2 items-center flex gap-4 mr-[10rem]">
          <a href="/login" className="hover:bg-[#303030] duration-200 p-2 bg-black rounded-md">LOGIN</a>
        </div>
      }
    </div>
  );
}

export default Navbar;