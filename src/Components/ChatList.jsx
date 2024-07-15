import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import '../Components/style.css';

const ChatList = ({ onChatSelect,selectedChatId
 }) => {
    const [chats, setChats] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const { id, name, lasttime } = selectedChatId
    console.log(id);

    useEffect(() => {
        axios.get(`https://devapi.beyondchats.com/api/get_all_chats?page=${page}`)
            .then(response => {
                console.log(response.data.data);
                setChats(prevChats => [...prevChats, ...response.data.data.data]);
                setTotalPages(response.data.data.last_page);
            })
            .catch(error => console.error('Error fetching chats:', error));
    }, [page]);

    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleChatClick = (id, name, lasttime) => {
        onChatSelect({ id, name, lasttime });
    };

    const getInitials = (name) => {
        const names = name.split(" ");
        return names.map((n) => n[0]).join("").toUpperCase();
    };

    const getColorForName = (name) => {
        // Example: Assign color based on a hash of the name
        const hashCode = (s) => {
            return s.split('').reduce((a, b) => {
                a = ((a << 3) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
        };
        
        const gradients = [
            "bg-gradient-to-tr from-red-500 to-red-700",
            "bg-gradient-to-tr from-green-500 to-green-700",
            "bg-gradient-to-tr from-blue-700 to-blue-500",
            "bg-gradient-to-tr from-yellow-500 to-yellow-700",
            "bg-gradient-to-tr from-purple-500 to-purple-700"
        ];
        const index = Math.abs(hashCode(name)) % gradients.length;
        return gradients[index];
    };

    return (
        <div className="p-2 flex flex-col h-screen overflow-hidden">
            {/* search bar */}
            <div className="bg-white flex justify-between items-center gap-2 py-2 relative">
                <IoIosMenu className='text-4xl m-1' />
                <div className="relative w-full">
                    <input className='bg-slate-100 p-2 pl-10 rounded w-full' placeholder='Search' type="search" name="Search" id="" />
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto thin-scrollbar p-2">
                {/* telegram msg */}
                <div className="mb-5 flex justify-between items-center ">
                    <div className='flex justify-start items-center'>
                        <div className="relative">
                            <img className="w-12 h-12 rounded-full mr-4" src="https://i.postimg.cc/VvC4rS7v/images-8.jpg" alt="" />
                            {/* status */}
                            <span className="absolute top-0 right-4 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        </div>
                        <div>
                            <Link className="text-Black font-bold">Telegram</Link>
                            <p className=''>we are help to you</p>
                        </div>
                    </div>

                    <div className='item-end'>
                        <p className=' text-end'>12:00</p>
                    </div>
                </div>

                {chats.map(chat => (
                    chat.creator?.name && (
                        <div key={chat.id}  className={`mb-8 hover:bg-blue-400 hover:shadow-md hover:rounded-md hover:text-white hover:transition transition-0.3 hover:cursor-pointer p-2 flex justify-between items-center ${id === chat?.id ? 'bg-blue-400 rounded-md shadow-md' : ''}`}>
                            <div  onClick={() => handleChatClick(chat.id, chat.creator?.name, chat?.lasttime)} className='flex justify-start  items-center'>
                                <div className="relative">

                                    <div>
                                        <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center text-white ${getColorForName(chat.creator.name)}`}>
                                            <span className="text-xl font-bold">{getInitials(chat?.creator?.name)}</span>
                                        </div>
                                    </div>
                                    {/* status */}
                                    {chat.status === 'ongoing' && (
                                        <span className="absolute top-0 right-4 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                    )}
                                </div>
                                <div className={`text-blue-500 font-bold cursor-pointer ${id === chat?.id ? 'text-white ' : ''}` }>
                                    <span className={`text-black hover:text-white  cursor-pointer ${id === chat?.id ? 'text-white' : ''}` }>{chat?.creator?.name}</span>
                                    <p className='text-gray-600'>i am good learner</p>
                                </div>
                            </div>

                            <div className='item-end'>
                                <p className='pb- text-end'>{formatDate(chat.created_at)}</p>
                                <div className='flex justify-end'>
                                    <p className='text-xs bg-blue-500 rounded-full text-white p-1 w-6 text-center'>{chat?.msg_count}</p>
                                </div>
                            </div>
                        </div>
                    )
                ))}
                {page < totalPages && (
                    <div className='flex justify-center'>
                        <button
                            onClick={() => setPage(page + 1)}
                            className="mt-4 mb-5 btn-block bg-blue-500 text-white p-2 rounded">
                            More..
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;
