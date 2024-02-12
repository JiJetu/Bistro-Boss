import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home/Home";
import Menu from "../Page/Menu/Menu/Menu";
import Shop from "../Page/Shop/Shop/Shop";

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
          element: <Menu></Menu>
        },
        {
          path: 'shop',
          element:<Shop></Shop>
        }
      ]
    },
  ]);