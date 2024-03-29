import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home/Home";
import Menu from "../Page/Menu/Menu/Menu";
import Shop from "../Page/Shop/Shop/Shop";
import Login from "../Page/Loigin/Login";
import SignUp from "../Page/Register/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Page/DashBoard/Cart/Cart";
import AllUser from "../Page/DashBoard/All User/AllUser";
import AddItems from "../Page/DashBoard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Page/DashBoard/ManageItem/ManageItem";
import UpdateItem from "../Page/DashBoard/UpdateItem/UpdateItem";
import Payment from "../Page/DashBoard/Payment/Payment";
import PaymentHistory from "../Page/DashBoard/PaymentHistory/PaymentHistory";
import AdminHome from "../Page/DashBoard/AdminHome/AdminHome";
import UserHome from "../Page/DashBoard/UserHome/UserHome";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'menu',
        element: <Menu></Menu>
      },
      {
        path: 'shop',
        element: <Shop></Shop>
      },
      {
        path: 'shop/:category',
        element: <Shop></Shop>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signUp',
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // user related route
      {
        path:'userHome',
        element:<UserHome></UserHome>
      },
      {
        path: "cart",
        element: <Cart></Cart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path:'paymentHistory',
        element:<PaymentHistory></PaymentHistory>
      },

      // admin related route
      {
        path:'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: 'manageItems',
        element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
      },
      {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({ params }) => fetch(`https://boss-server-theta.vercel.app/menu/${params.id}`)
      },
      {
        path: 'users',
        element: <AdminRoute><AllUser></AllUser></AdminRoute>
      }
    ]
  }
]);