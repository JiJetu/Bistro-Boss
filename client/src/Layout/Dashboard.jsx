import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { GoCodeReview, GoListUnordered } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../hooks/UseAdmin";

const Dashboard = () => {
    const [isAdmin] = UseAdmin();

    return (
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto">
            <div className="md:w-64 min-h-screen bg-orange-500">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/adminHome'>
                                        <FaHome></FaHome> Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addItems'>
                                        <FaUtensils></FaUtensils> Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageItems'>
                                        <FaList></FaList> Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageBookings'>
                                        <FaBook></FaBook> Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/users'>
                                        <FaUsers></FaUsers> All Users
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/userHome'>
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
                                    <NavLink to='/dashboard/paymentHistory'>
                                        <GoListUnordered></GoListUnordered> Payment History
                                    </NavLink>
                                </li>
                            </>
                    }


                    <div className="divider"></div>

                    {/* shared navLinks */}

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
                    <li>
                        <NavLink to='/shop/contact'>
                            <FaEnvelope></FaEnvelope> Contact
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