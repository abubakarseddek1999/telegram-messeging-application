import { useState } from "react";
import ChatList from "../Components/ChatList";
import ChatWindow from "../Components/ChatWindow";

const Home = () => {
    const [selectedChatId, setSelectedChatId] = useState({ id: "3888", name: "Shone Jogi", lasttime: "Default Last Time" });
    const [isMobileView, setIsMobileView] = useState(true);


    const handleChatSelect = ({ id, name, lasttime }) => {
        setSelectedChatId({ id, name, lasttime });
        setIsMobileView(false);
    };
    console.log(selectedChatId);

    const handleBackToChatList = () => {
        setIsMobileView(true); // Switch back to chat list on mobile view
    };

    return (
        <div className="">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row bg-white">
                {/* Chat List */}
                <div className={`w-full md:w-1/3 border-e-4 overflow-y-auto max-h-screen ${isMobileView ? 'block' : 'hidden'} md:block`}>
                    <ChatList onChatSelect={handleChatSelect} />
                </div>

                {/* Chat Window */}
                <div className={`w-full md:w-2/3 ${isMobileView ? 'hidden' : 'block'} md:block`}>
                    {selectedChatId && (
                        <div>
                            <ChatWindow selectedChatId={selectedChatId} onBack={handleBackToChatList}/>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Home;