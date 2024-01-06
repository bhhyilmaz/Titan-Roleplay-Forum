import Navbar from '../../Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotFound from '../../404';
import { GrFormPrevious } from "react-icons/gr";

function NewTopic() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  var cat = localStorage.getItem("cat");

  const [title, setTitle] = useState(String);
  const [content, setContent] = useState(String);
  const [wgTitle, setWgTitle] = useState(Boolean);
  const [wgContent, setWgContent] = useState(Boolean);
  const [isCat, setIsCat] = useState(true);
  const [noCat, setNoCat] = useState(false);

  const checkCat = () => {
    try {
      axios.get("https://express-server-hara.onrender.com/cat/" + cat).then(res => {
        setNoCat(() => res.data.noCat);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkCat();
  });

  const Submit = async (e) => {
    e.preventDefault();

    try {
      // Post for create new topic
      await axios.post('https://express-server-hara.onrender.com/topic/new', {
        cat,
        title,
        content
      }).then(res => {
        setWgTitle(() => res.data.wgTitle);
        setWgContent(() => res.data.wgContent);

        if (res.data.wgTitle === false && res.data.wgContent === false) {
          navigate("/cat/" + cat);
        };
      });
    } catch (error) {
      console.log('The Error:', error);
    };
  };

  useEffect(() => {
    if (cat === null) setIsCat(() => false);
  }, []);

  return (
    <>
      {!noCat ?
        <>
          {isCat ?
            <div>
              <Navbar />
              <div className='flex justify-center'>
                <div className='w-[50rem] pt-[1.25rem]'>
                  <a href={'/cat/' + localStorage.getItem("cat")} className='h-min text-[2rem]'><GrFormPrevious /></a>
                </div>
              </div>
              <form onSubmit={Submit}>
                <div className='flex flex-col items-center m-[2rem] gap-2'>
                  <div>
                  </div>
                  {(wgTitle === true || wgContent === true) && (
                    <div className='flex flex-col bg-red-600 bg-opacity-90 text-white p-5 rounded-md w-[50rem]'>
                      {wgTitle === true && <li>Title must be between 3 and 72</li>}
                      {wgContent === true && <li>Content too short</li>}
                    </div>
                  )}
                  <input onChange={(e) => setTitle(e.target.value)} value={title} className='bg-black bg-opacity-90 text-white p-5 rounded-md w-[50rem] h-1rem] text-[1.2rem]' />
                  <textarea onChange={(e) => setContent(e.target.value)} value={content} className='bg-black bg-opacity-90 text-white rounded-md p-5 text-[1.2rem] w-[50rem] h-[25rem]' />
                  <button type="submit" className="text-white bg-gradient-to-l from-black hover:bg-white hover:opacity-90 hover:text-black duration-200 border w-[10rem] h-[2rem]">Create Topic</button>
                </div>
              </form>
            </div>
            :
            <div>
              <NotFound />
            </div>
          }
        </>
        :
        <NotFound />
      }
    </>
  );
};

export default NewTopic;