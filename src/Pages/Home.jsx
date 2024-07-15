import { useState } from "react";
import ChatList from "../Components/ChatList";
import ChatWindow from "../Components/ChatWindow";

const Home = () => {
    const [selectedChatId, setSelectedChatId] = useState({id: "3888", name: "Shone Jogi", lasttime: "Default Last Time"});
    const handleChatSelect = ({ id, name, lasttime }) => {
        setSelectedChatId({ id, name, lasttime });
    };
    console.log(selectedChatId);
    return (
        <div className="">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row bg-white">
                <div className="w-full md:w-1/3 border-e-4 overflow-y-auto  max-h-screen">
                    <ChatList onChatSelect={handleChatSelect}></ChatList>
                </div>
                <div className="w-full md:w-2/3">
                    <ChatWindow selectedChatId={selectedChatId} ></ChatWindow>
                </div>
            </div>

        </div>
    );
};

export default Home;