import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatWindow = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, [id]);

  return (
    <div className="p-4">
      {messages.map(message => (
        <div key={message.id} className="mb-2">
          <div className="font-bold">{message.sender_name}</div>
          <div>{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
