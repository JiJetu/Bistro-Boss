import { NavLink } from "react-router-dom";

const Navbar = () => {

    const navOption = <>
        <li><NavLink to='/'>Home</NavLink></li>
    </>

    return (
        <div className="navbar text-white fixed z-10 bg-black bg-opacity-30">
            <div className="navbar-start md:ml-44">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOption}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOption}
                </ul>
            </div>
            <div className="navbar-end md:mr-44">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;