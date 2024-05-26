import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Secret from "../Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute/AdminRoute";
import AddItems from "../pages/AddItems/AddItems";
import ManagItems from "../pages/ManageItems/ManagItems";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
           path:"/" ,
           element:<Home></Home>
        },
        {
          path:'/menu',
          element:<Menu></Menu>
        },
        {
          path:'/order/:category',
          element:<Order></Order>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"signup",
          element:<SignUp></SignUp>

        },
        {
          path:"/secret",
          element:<PrivateRoute><Secret></Secret></PrivateRoute>

        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        // normal user routes
        {
          path:'cart',
          element:<Cart></Cart>,
          
        },
        // admin routes
        {
          path:'addItems',
          element:<AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path:'manageItems',
          element:<AdminRoute><ManagItems></ManagItems></AdminRoute>

        },
        {
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        }

        


      ]
    }
  ]);