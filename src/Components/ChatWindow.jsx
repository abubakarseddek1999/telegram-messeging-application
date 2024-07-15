import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSend, IoMic  } from "react-icons/io5";
import { SlPhone } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Components/style.css';
import bgImage from '../assets/Image/bg-4.jpg'

const ChatWindow = ({ selectedChatId }) => {
    console.log(selectedChatId);
    const {id, name, lasttime}=selectedChatId
    console.log(id);
    // const chatId = id || selectedChatId;
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null); // Ref for scrolling to bottom

    useEffect(() => {
        if (id) {
            axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`)
                .then(response => {
                    setMessages(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                    setError(error);
                });
        }
    }, [id]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Scroll to bottom when messages update
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = () => {
        const newMessageObj = {
            id: messages.length + 1,
            message: newMessage,
            sender_name: "Your Name",
            sender_id: "123",
            created_at: new Date().toISOString(),
        };
        setMessages([...messages, newMessageObj]);
        setNewMessage('');
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    if (error) {
        return <div className="p-4">Error fetching messages: {error.message}</div>;
    }

    return (
        <div className="flex flex-col h-screen"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div className='flex justify-between items-center py-3 shadow-md bg-white w-full'>

                <div className="ml-2 flex gap-1 justify-center items-center">
                    <img className="w-12 h-12 rounded-full mr-4" src="https://i.postimg.cc/VvC4rS7v/images-8.jpg" alt="" />
                    <div>
                        <p className="text-xl font-bold ">{name}</p>
                        <p>Last seen Yesterday at 12:00</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5 mr-5">
                    <SlPhone className="cursor-pointer text-xl" />
                    <CiSearch className="cursor-pointer text-xl" />
                    <HiOutlineDotsVertical className="cursor-pointer text-xl" />
                </div>
            </div>

            <div className="overflow-y-auto thin-scrollbar px-4 pt-5 "
            >
                {messages.map(item => (
                    <div
                        key={item.id}
                        className={`mb-2 flex ${item.sender_id === "123" ? 'justify-end' : 'justify-start'} w-full custom-clip-path `}
                    >
                        <div className={`p-2 min-w-28 flex gap-5 rounded-lg shadow-sm max-w-xs break-words ${item.sender_id === "123" ? 'bg-blue-100 text-black' : 'bg-green-100 text-black'}`}>
                            <p>{item.message}</p>
                            <div className='flex flex-col justify-end'>
                                <p className="text-xs text-gray-600 text-right">{formatTime(item.created_at)}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Dummy element for scrolling to bottom */}
                <div ref={messageEndRef}></div>
            </div>

            <div className="pt-2 flex justify-center items-center">
      <textarea
        className="w-full border rounded-l p-2"
        rows="1"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      ></textarea>

      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white py-3 border-0 px-4 rounded-r `}
        onClick={handleSendMessage}
      >
        {newMessage.trim() ? <IoSend className='text-xl'/> : <IoMic className='text-xl' />}
      </button>
    </div>
        </div>
    );
};

export default ChatWindow;