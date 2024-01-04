import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import { useParams } from 'react-router-dom';
import NotFound from '../../404';

function Profile() {
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState('');
  const [pfp, setPfp] = useState('');
  const [date, setDate] = useState('');
  const [profile, setProfile] = useState(false);
  //

  // Params
  const { usernameParam } = useParams();
  useEffect(() => {
    if (usernameParam === username) setProfile(true);
  });
  //

  // Axios
  try {
    axios.get('http://localhost:3001/user/' + usernameParam)
      .then(res => {
        setUsername(res.data.Username);
        setDate(res.data.date);
        setPfp(res.data.Pfp);
      });
  } catch (error) {
    console.log(error);
  };
  //

  return (
    <>
      {profile ?
        <div>
          <div className='text-[#ededed]'>
            <Navbar />
            <div className='flex justify-center m-[3rem]'>
              <div className="h-[20rem] bg-black rounded-lg bg-opacity-90 bg-cover flex items-center p-[10rem]">
                <div className=' h-[20rem] mt-[5rem]'>
                  <div className='gap-[0.5rem] flex flex-col items-center'>
                    <img src={pfp} className='rounded-sm w-[128px] h-[128px]' />
                    <a href={`/profile/${username}`} className='text-red-500 text-4xl'>{username}</a>
                    <p>Joined {date}</p>
                    <a
                      className='m-2 cursor-pointer p-2 bg-[#202020] hover:bg-opacity-50 rounded-lg'
                      href={`/profile/${username}/pm`}
                    >
                      Send PM
                    </a>
                  </div>
                </div>
              </div>
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
};

export default Profile;