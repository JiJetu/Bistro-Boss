import { Link } from "react-router-dom";

const Navbar = () => {

    const navOption = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Menu</Link></li>
        <li><Link to='/shop/salad'>Shop Now</Link></li>

    </>

    return (
        <div className="navbar text-white fixed z-10 bg-black bg-opacity-30">
            <div className="navbar-start md:ml-[5%]">
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
            <div className="navbar-end md:mr-[5%]">
                <Link className="border-0 hover:border-x-4 hover:border-orange-400 px-3 py-2 rounded-md" to='/login'>LogIn</Link>
            </div>
        </div>
    );
};

export default Navbar;