import { useState, useEffect } from "react";
import { socket } from "../socket";
import axios from "axios";
import Navbar from "./Navbar";
import { useParams } from 'react-router-dom';

function Test() {
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [receiver, setReceiver] = useState(null);

  const params = useParams();

  useEffect(() => {
    try {
      axios.get('http://localhost:3001/users')
        .then((res) => {
          setUsername(res.data.Username);
        })
        .catch((error) => {
          console.log(error);
        });

      setReceiver(params.receiverParam)
    } catch (error) {
      console.log(error);
    }
  }, [])

  // Send currentChatInfo to the server
  const currentChatInfo = () => {
    const chatInfo = { username, receiver }
    socket.emit('currentChatInfo', chatInfo);
  };

  // Get chatInfo from the server
  const chatInfo = () => {
    socket.on('chatInfo', (data) => {
      setMessages(data);
    });
  };

  useEffect(() => {
    currentChatInfo();
    chatInfo();
  }, [username]);

  const sendMessage = () => {
    socket.emit('sendMessage', { username, message, receiver });
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-[50rem] h-[50rem] text-gray-800 p-10">
          <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {/** receiver div */}
              <div
                className="flex w-full mt-2 space-x-3 max-w-xs"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                  <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">receiver content</p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">receiver created_at</span>
                </div>
              </div>
              {messages?.map(message => (
                <div
                  className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                  key={message._id}
                >
                  <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">{message.created_at}</span>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
              ))}
            </div>
            <div className="bg-gray-300 p-4">
              <input className="flex items-center h-10 w-full rounded px-3 text-sm"
                placeholder="Message to Send..."
                onChange={({ target: { value } }) => setMessage(value)}
              />
            </div>
          </div>
          <button
            className="bg-green-700 text-white p-[1.25rem] w-[10rem] rounded-md hover:bg-green-500 duration-300"
            onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Test;