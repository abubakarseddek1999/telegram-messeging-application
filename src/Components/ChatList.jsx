import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    return (
        <div className="p-4 flex flex-col h-screen overflow-hidden">
            {/* search bar */}
            <div className='  bg-white flex justify-between items-center gap-2 py-2'>
                <IoIosMenu className='text-4xl m-2' />
                <input className='bg-slate-100 p-2 rounded w-full' placeholder='Search' type="search" name="Search" id="" />
            </div>

            <div className="flex-1 overflow-y-auto mt-2 pr-2">
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
                        <div key={chat.id} className="mb-8 flex justify-between items-center ">
                            <div className='flex justify-start items-center'>
                                <div className="relative">
                                    <img src="https://i.postimg.cc/FKdP5Lhz/young-bearded-man-with-striped-shirt-273609-5677-1.avif" alt={`${chat.creator.name}'s avatar`} className="w-12 h-12 rounded-full mr-4" />
                                    {/* status */}
                                    {chat.status === 'ongoing' && (
                                        <span className="absolute top-0 right-4 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                    )}
                                </div>
                                <div>
                                    <Link to={`/chat/${chat.id}`} className="text-blue-500 font-bold">{chat.creator.name}</Link>
                                    <p>i am good learner</p>
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
