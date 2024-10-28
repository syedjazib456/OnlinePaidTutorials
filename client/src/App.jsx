import React from 'react';
import './App.css'
import Register from './components/UI/Register';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './components/UI/Home';
import SignIn from './components/UI/SignIn';
import { RouterProvider } from "react-router-dom";
import Logout from './components/UI/Logout';
import Contact from './components/UI/Contact';
import About from './components/UI/About';
import Course from './components/UI/Course';
import AdminLogin from './components/Admin/AdminLogin';
import Dashboard from './components/Admin/Dashboard';
import AdminRegister from './components/Admin/AdminRegister';
import AdminLayout from './components/Admin/AdminLayout';
import AdminList from './components/Admin/AdminList';
function App() {
  const router = createBrowserRouter([
    {
        path:'/',
        element:<AppLayout/>,

        children:[ //child route's
          {
            path:'/',
            element:<Home/>
          },
          {
            path:'/home',
            element:<Home/>
          },
          {
            path:'/register',
            element:<Register/>
          },
          {
            path:'/signin',
            element:<SignIn/>
          },
          {
            path:'/contact',
            element:<Contact/>
          },
          {
            path:'/about',
            element:<About/>
          },
          {
            path:'/logout',
            element:<Logout/>
          },
          {
            path:'/courses',
            element:<Course/>
          },
          
        ],
  
    },
  {
    path:'/admin',
    element:<AdminLayout/>,
    children:[
      {
        path:'adminlogin',
        element:<AdminLogin/>
      },
      {
        path:'adminregister',
        element:<AdminRegister/>
      },
      {
        path:'admindashboard',
        element:<Dashboard/>
      },
      {
        path:'adminlist',
        element:<AdminList/>
      }
    ]
  }
   
 ]);
return <RouterProvider router={router}/>
}

export default App
