import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Components/Login";
import Register from "../Components/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element:<Register></Register>
  }
]);
