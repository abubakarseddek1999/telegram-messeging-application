import ChatList from "../Components/ChatList";
import ChatWindow from "../Components/ChatWindow";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Home = () => {
    return (
        <div className="">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row bg-white">
                <div className="w-full md:w-1/3 border-e-4">
                    <ChatList />
                </div>
                <div className="w-full md:w-2/3">
                    <Routes>
                        <Route path="/chat/:id" element={<ChatWindow />} />
                    </Routes>
                </div>
            </div>


        </div>
    );
};

export default Home;