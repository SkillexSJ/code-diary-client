import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Topics from "../Pages/Topics/Topics";
import TopicList from "../Pages/Topics/TopicList";
import DashBoardLayout from "../Layouts/DashBoardLayout/DashBoardLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Code from "../Pages/Topics/Code";
import PrivateRoute from "../Provider/PrivateRoute";
import Profile from "../Pages/Profile/Profile";
import ForbiddenPage from "../Layouts/ForbiddenPage";
import About from "../Pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,

    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/topics",
        element: <Topics></Topics>,
      },
      {
        // find by topic name
        path: "/topics/:topicName",
        element: (
          <PrivateRoute>
            <TopicList></TopicList>
          </PrivateRoute>
        ),
      },
      {
        path: "/topics/:topicName/:codeId",
        element: <Code></Code>,
      },
      {
        path: "/about",
        element: <About></About>,
      },

    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
  },

  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>
    ),
  },

  {
    path: "*",
    element: <ForbiddenPage></ForbiddenPage>,
  },
]);
