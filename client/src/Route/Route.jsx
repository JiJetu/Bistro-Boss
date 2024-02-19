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

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element:<Home></Home>
        },
        {
          path: 'menu',
          element: <PrivateRoute><Menu></Menu></PrivateRoute>
        },
        {
          path: 'shop',
          element:<Shop></Shop>
        },
        {
          path: 'shop/:category',
          element:<Shop></Shop>
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
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: "cart",
          element: <Cart></Cart>
        }
      ]
    }
  ]);