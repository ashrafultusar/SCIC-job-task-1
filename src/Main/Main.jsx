import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navber from "../Components/Navber";
import AllProducts from "../Components/AllProducts";

const Main = () => {
  return (
    <div className="bg-[#0a1316]">
      <Navber></Navber>
      <AllProducts></AllProducts>
      <div className="min-h-[calc(100vh-125px)] ">
        <Outlet></Outlet>
      </div> 
      <Footer></Footer>
    </div>
  );
};

export default Main;
