import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const NotFound = () => {
  // Delay for load the 404 page
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDelay(() => true);
    }, 1000);
  }, []);

  return (
    <>
      {delay &&
        <div>
          <Navbar />
          <div className='flex justify-center'>
            <div className='flex flex-col text-center bg-black bg-opacity-90 p-5 rounded-md m-5'>
              <a className=' select-none text-[#dedede] text-[20rem]'>404</a>
              <a className='text-[#dedede] text-[3rem] font-bold'>Sorry, we can't find this page</a>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default NotFound;
