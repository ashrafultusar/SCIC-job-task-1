import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AllProducts from "../Components/AllProducts";
import ProductDetails from "../Card/ProductDetails";

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
  },
  {
    path: "/allproducts",
    element: <AllProducts></AllProducts>,
  },
  {
    path: '/product/:id',
    element: <ProductDetails></ProductDetails>,
    loader: ({params})=> fetch(`http://localhost:5000/product/${params.id}`)
  }
]);
