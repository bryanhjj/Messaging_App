import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import ErrorPage from "../components/ErrorPage/error-page";
import Dashboard from "../components/Dashboard/Dashboard";
import Chatroom from "../components/Chatroom/Chatroom";
import Profile from "../components/Profile/Profile";
import SignUpForm from "../components/SignUp/SignUpForm";
import LoginForm from "../components/Login/LoginForm";
import UserUpdateForm from "../components/Users/UserUpdateForm";
import UserDeleteForm from "../components/Users/UserDeleteForm";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "chatroom/:chatroomId",
              element: <Chatroom />,
            },
            {
              path: "profile/:profileId",
              element: <Profile />,
            },
            {
              path: "user/edit",
              element: <UserUpdateForm />,
            },
            {
              path: "user/delete",
              element: <UserDeleteForm />,
            },
            {
              path: "signup",
              element: <SignUpForm />,
            },
            {
              path: "login",
              element: <LoginForm />,
            },
          ], 
        },
      ],
    },
]);
  
export default router;