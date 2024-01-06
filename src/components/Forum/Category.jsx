import Navbar from "../Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { GrFormPrevious } from "react-icons/gr";
import NotFound from '../404';
// Pagination
import Pagination from 'rc-pagination';
import '../../style/rc-pagination.css'
//

function Category() {
  axios.defaults.withCredentials = true;
  const { catParam } = useParams();
  const [topics, setTopics] = useState(Array);
  const [isSession, setIsSession] = useState(false);
  const [noCat, setNoCat] = useState(false);

  const fetchCat = () => {
    try {
      axios.get('http://3.79.244.125:3001/cat/' + catParam)
        .then(res => {
          // Prevent an unknown cat param with this value
          setNoCat(() => res.data.noCat);

          // Sort the db by the created_at values
          var sortedDb = res.data.db.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setTopics(() => sortedDb);
        });

      // Getting session info
      axios.get('http://3.79.244.125:3001/users').then(res => {
        setIsSession(() => res.data.Session);
      });
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    localStorage.setItem("cat", catParam);
    fetchCat();
  }, []);

  // Pagination
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const total = topics.length;

  const onChange = (page) => {
    setCurrent(page);
  };
  //

  return (
    <>
      {!noCat ?
        <div>
          <Navbar />
          <div className='flex justify-center'>
            <div className='w-[50rem] pt-[1.25rem]'>
              <a href="/" className='h-min text-[2rem]'><GrFormPrevious /></a>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center m-[2rem]">
            <div className="w-[50rem] flex justify-between  ">
              <Pagination
                onChange={onChange}
                current={current}
                total={total}
                pageSize={pageSize}
              />
              {isSession &&
                <div className="flex items-center">
                  <a href='/topic/new' className="hover:opacity-80 p-2 rounded-md text-white duration-200 bg-black bg-opacity-90">Create Topic</a>
                </div>
              }
            </div>
            {
              topics.slice((current - 1) * pageSize, current * pageSize).map((topic, index) => {
                var date = moment(topic.created_at, "MMM DD, YYYY h:mm A").fromNow();

                return (
                  <div className="flex p-5 rounded-md w-[50rem] bg-black bg-opacity-90 text-white" key={index}>
                    <div className="flex flex-col w-[50rem]">
                      <a className="text-[1.4rem] items-center" href={`/topic/${topic._id}`}>{topic.title}</a>
                      <div className="flex gap-[0.5rem] items-bas">
                        <div className="flex flex-col">
                          <a className="text-red-500" href={`/profile/${topic.author}`}>{topic.author}</a>
                          <a className="text-[0.7rem] italic">{date}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div className="flex w-[50rem]">
              <Pagination
                onChange={onChange}
                current={current}
                total={total}
                pageSize={pageSize}
              />
            </div>
          </div>
        </div>
        :
        <NotFound />
      }
    </>
  );
};

export default Category;