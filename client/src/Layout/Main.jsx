import { Outlet } from "react-router-dom";
import Footer from "../Page/Share/Footer/Footer";
import Navbar from "../Page/Share/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;