import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import { useParams } from 'react-router-dom';
import NotFound from '../../404';
import { GrFormPrevious } from "react-icons/gr";
// Pagination
import Pagination from 'rc-pagination';
import '../../../style/rc-pagination.css'
//

function Topic() {
  axios.defaults.withCredentials = true;

  const [author, setAuthor] = useState(String);
  const [title, setTitle] = useState(String);
  const [content, setContent] = useState(String);
  const [date, setdate] = useState(String);
  const [pfp, setPfp] = useState(String);
  const [id, setId] = useState(String);
  const [isParam, setIsParam] = useState(false);
  const [comment, setComment] = useState(String);
  const [comments, setComments] = useState(Array);
  const [wgComment, setWgComment] = useState(false);

  // Params
  const { topicIdParam } = useParams();
  // Send topicIdParam to the comment endpoint
  const [topicParam, setTopicParam] = useState(topicIdParam);

  const fetchTopic = () => {

    try {
      // Post topicIdParam to the endpoint
      axios.post("http://3.79.244.125:3001/comments/", { topicIdParam }).then(res => {
        setComments(() => res.data.comments);
      });

      // Get Topics
      axios.get('http://3.79.244.125:3001/topic/' + topicIdParam)
        .then(res => {
          setAuthor(res.data.Author);
          setTitle(res.data.Title);
          setContent(res.data.Content);
          setdate(res.data.date);
          setPfp(res.data.pfp);
          setId(res.data.id);

          // Check if the server has topicIdParam
          if (res.data.id === topicIdParam) setIsParam(() => true);
        });
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    fetchTopic();
  }, []);

  // Submit the comment
  const Submit = async (e) => {
    e.preventDefault();

    try {
      // Post for create new topic
      await axios.post('http://3.79.244.125:3001/topic/comment/new', {
        comment,
        topicParam
      }).then(res => {
        setWgComment(() => res.data.wgComment);
        if (!res.data.wgComment) window.location.reload(true)
      });
    } catch (error) {
      console.log('The Error:', error);
    };
  };

  // Pagination
  const [current, setCurrent] = useState(1);
  const pageSize = 5;
  const total = comments.length;

  const onChange = (page) => {
    setCurrent(page);
  };
  //

  return (
    <>
      {isParam ?
        <div>
          <Navbar />
          <div className='flex justify-center'>
            <div className='w-[50rem] pt-[1.25rem]'>
              <a href={'/cat/' + localStorage.getItem("cat")} className='h-min text-[2rem]'><GrFormPrevious /></a>
            </div>
          </div>
          <div>
            <div className='flex flex-col items-center justify-center'>
              <div className='mt-[3rem] flex rounded-md mb-[0.5rem] w-[50rem] bg-black text-white bg-opacity-90'>
                <div className='flex flex-col p-5'>
                  <img src={pfp} className='min-h-[128px] min-w-[128px] w-[128px] h-[128px]' />
                  <a href={"/profile/" + author} className='flex justify-center text-red-500 text-[1.2rem]'>{author}</a>
                </div>
                <div className='flex flex-col p-[1.25rem] w-[40rem]'>
                  <a className='p-[1.25rem] italic text-[0.7rem]'>{date}</a>
                  <div className='p-[1.25rem] pt-0 font-bold text-[#8F8F8F] text-[2rem]'><a href={"/topic/" + topicIdParam}>{title}</a></div>
                  {content.split('\n\n').map((cont) =>
                    <p className='p-[1.25rem] text-[1.1rem] pt-0'>
                      {cont.split('\n').reduce((total, line) => [total, <br />, line])}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='w-[50rem] flex justify-end'>
              <Pagination
                onChange={onChange}
                current={current}
                total={total}
                pageSize={pageSize}
              />
            </div>
          </div>
          {comments.slice((current - 1) * pageSize, current * pageSize).map((comment, index) => (
            <div key={index} className='flex justify-center'>
              <div className='flex rounded-md mb-[0.5rem] w-[50rem] bg-black text-white bg-opacity-90'>
                <div className='flex flex-col p-5'>
                  <img src={comment.pfp} className='min-h-[128px] min-w-[128px] w-[128px] h-[128px]' />
                  <a href={"/profile/" + comment.author} className='flex justify-center text-red-500 text-[1.2rem]'>{comment.author}</a>
                </div>
                <div className='flex flex-col p-[1.25rem] w-[40rem]'>
                  <a className='p-[1.25rem] italic text-[0.7rem]'>{comment.created_at}</a>
                  {comment.comment.split('\n\n').map((cont, index) =>
                    <p className='p-[1.25rem] text-[1.1rem] pt-0' key={index}>
                      {cont.split('\n').reduce((total, line) => [total, <br />, line])}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-center'>
            <div className='w-[50rem] flex justify-end'>
              <Pagination
                onChange={onChange}
                current={current}
                total={total}
                pageSize={pageSize}
              />
            </div>
          </div>
          <form onSubmit={Submit}>
            <div className='flex flex-col items-center m-[2rem] gap-2'>
              {wgComment === true ?
                <div className='flex flex-col bg-red-600 bg-opacity-90 text-white p-5 rounded-md w-[50rem]'>
                  <li>Reply too short</li>
                </div>
                :
                <a />
              }
              <div className='flex flex-col items-center gap-4'>
                <textarea onChange={(e) => setComment(e.target.value)} value={comment} className='w-[50rem] bg-black bg-opacity-90 text-white rounded-md p-5 text-[1.2rem] h-[10rem]' />
                <button type="submit" className="text-white bg-gradient-to-l from-black hover:bg-white hover:opacity-90 hover:text-black duration-200 border w-[10rem] h-[2rem]">
                  Reply
                </button>
              </div>
            </div>
          </form>
        </div>
        :
        <div>
          <NotFound />
        </div>
      }
    </>
  );
};

export default Topic;