import { FaCalendar, FaHome, FaShoppingCart } from "react-icons/fa";
import { GoCodeReview, GoListUnordered } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex max-w-screen-xl mx-auto">
            <div className="w-64 min-h-screen bg-orange-500">
                <ul className="menu p-4">
                    <li>
                        <NavLink to='/dashboard/UserHome'>
                            <FaHome></FaHome> User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/reservation'>
                            <FaCalendar></FaCalendar> Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/cart'>
                            <FaShoppingCart></FaShoppingCart> My Cart
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/review'>
                            <GoCodeReview></GoCodeReview> Add a review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/bookings'>
                            <GoListUnordered></GoListUnordered> My Bookings
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome></FaHome> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/shop/salad'>
                            <IoIosMenu></IoIosMenu> Menu
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;