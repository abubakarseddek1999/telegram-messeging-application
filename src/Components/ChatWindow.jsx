import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatWindow = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null); // Ref for scrolling to bottom

    useEffect(() => {
        axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=3888`)
            .then(response => {
                setMessages(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                setError(error);
            });
    }, [id]);

    // Scroll to bottom when messages update
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = () => {
        // Implement sending message logic here
        // For demonstration, assume message is added to state directly
        const newMessageObj = {
            id: messages.length + 1,
            message: newMessage,
            sender_name: "Your Name", // Replace with actual sender name
        };
        setMessages([...messages, newMessageObj]);
        setNewMessage('');
    };

    if (error) {
        return <div className="p-4">Error fetching messages: {error.message}</div>;
    }

    return (
        <div className="flex flex-col h-screen">

            <div className='flex justify-between items-center gap-2 py-3 shadow-md bg-white w-full'>

                <div className="ml-2">
                    <p className="text-xl font-bold ">Abu bakar</p>
                    <p>Last seen Yesterday at 12:00</p>
                </div>
                <div className="flex justify-center items-center gap-5 mr-5">
                    <CiSearch className="cursor-pointer text-xl" />
                    <HiOutlineDotsVertical className="cursor-pointer text-xl" />
                </div>
            </div>

            <div className="overflow-y-auto px-4 mt-5 ">
                {messages.map(item => (
                    <div key={item.id} className="mb-2 w-3/5 ml-2">
                        <div className=''>
                            <div className='bg-green-100 text-black rounded-lg p-3 max-w-screen-sm break-words shadow-sm'>{item.message}</div>
                        </div>
                    </div>
                ))}
                {/* Dummy element for scrolling to bottom */}
                <div ref={messageEndRef}></div>
            </div>

            <div className="p-2 flex justify-center items-center">
                <textarea
                    className="w-full border rounded-l p-2"
                    rows="1"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>

                <button
                    className=" bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
