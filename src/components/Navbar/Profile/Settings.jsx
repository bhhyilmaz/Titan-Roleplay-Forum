import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../../Navbar";
import NotFound from "../../404";

function Settings() {
  axios.defaults.withCredentials = true;

  // useState area
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pfp, setPfp] = useState('');
  const [resPfp, setResPfp] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [session, setSession] = useState(false);
  const [existEmail, setExistEmail] = useState(false);
  const [wgEmail, setWgEmail] = useState(false);
  const [wgPfp, setWgPfp] = useState(false);
  const [wgPassword, setWgPassword] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyPfp, setEmptyPfp] = useState(false);

  // Get user info
  useEffect(() => {
    try {
      axios.get('https://express-server-hara.onrender.com/users')
        .then(res => {
          setResPfp(() => res.data.Pfp);
          setResEmail(() => res.data.Email);
          setSession(() => res.data.Session);
        });
    } catch (error) {
      console.log(error);
    };
  }, []);
  //

  const Submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://express-server-hara.onrender.com/user/edit', {
        email,
        password,
        pfp
      }).then(res => {
        setExistEmail(() => res.data.existEmail);
        setWgEmail(() => res.data.wgEmail);
        setWgPassword(() => res.data.wgPassword);
        setWgPfp(() => res.data.wgPfp);
        setEmptyEmail(() => res.data.emptyEmail);
        setEmptyPassword(() => res.data.emptyPassword);
        setEmptyPfp(() => res.data.emptyPfp);
      });
    } catch (error) {
      console.log('The Error:', error);
    };
  };

  return (
    <>
      {session ?
        <div>
          <Navbar />
          <div className="flex justify-center">
            <div className="rounded-md justify-center w-[40rem] m-[3rem] flex bg-black bg-opacity-90">
              <div className="flex items-center">
                <div className="gap-3 items-center p-5 flex flex-col">
                  <img className="rounded-sm w-[128px] h-[128px]" src={resPfp} />
                  <div className="select-none text-white gap-4 flex flex-col">
                    <div className="p-2 rounded-md bg-opacity-80 flex items-center gap-2"><a className="italic text-[0.8rem]">Email:</a><a>{resEmail}</a></div>
                  </div>
                </div>
              </div>
              <form onSubmit={Submit} className="flex flex-col p-10 gap-4">
                {
                  (
                    emptyEmail ||
                    emptyPfp ||
                    emptyPassword
                  ) ?
                    <div>
                      {
                        !wgPfp ?
                          <li className="bg-green-600 text-white p-2 text-[0.8rem]">
                            <a className="text-[1rem]">
                              Profile Picture changed successfully
                            </a>
                          </li> : null
                      }
                      {
                        (!wgEmail && !existEmail) ?
                          <li className="bg-green-600 text-white p-2 text-[0.8rem]">
                            <a className="text-[1rem]">
                              Email changed successfully
                            </a>
                          </li> : null
                      }
                      {
                        !wgPassword ?
                          <li className="bg-green-600 text-white p-2 text-[0.8rem]">
                            <a className="text-[1rem]">
                              Password changed successfully
                            </a>
                          </li> : null
                      }
                    </div>
                    :
                    <a />
                }
                <div className="flex flex-col w-[15rem]">
                  <label className="text-white">Profile Picture URL</label>
                  {emptyPfp ?
                    <input className="flex text-black" onChange={(e) => setPfp(e.target.value)} value={pfp} type='text' />
                    :
                    <input className={wgPfp ? "text-black border-[0.1rem] border-red-600" : ""} onChange={(e) => setPfp(e.target.value)} value={pfp} type='text' />
                  }
                </div>
                <div className="flex flex-col w-[15rem]">
                  <label className="text-white">Email</label>
                  {emptyEmail ?
                    <input className={`text-black`} onChange={(e) => setEmail(e.target.value)} value={email} type='text' />
                    :
                    <input className={existEmail || wgEmail ? "text-black border-[0.1rem] border-red-600" : ""} onChange={(e) => setEmail(e.target.value)} value={email} type='text' />
                  }
                </div>
                <div className="flex flex-col w-[15rem]">
                  <label className="text-white">Password</label>
                  {emptyPassword ?
                    <input className={`text-black`} onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
                    :
                    <input className={wgPassword ? "text-black border-[0.1rem] border-red-600" : ""} onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
                  }
                </div>
                <button className="text-white hover:bg-white hover:bg-opacity-90 hover:text-black duration-200 border">
                  Update My Profile
                </button>
              </form>
            </div>
          </div>
        </div>
        :
        <div>
          <NotFound />
        </div>
      }
    </>
  );
}

export default Settings;