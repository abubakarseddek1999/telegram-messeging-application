import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="bg-[#EEEEEE]">
        
            <Outlet></Outlet>
            
        </div>
    );
};

export default Main;