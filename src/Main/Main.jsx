import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navber from "../Components/Navber";

const Main = () => {
  return (
    <div className="bg-[#0a1316]">
      <Navber></Navber>
      <div className="min-h-[calc(100vh-125px)] ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
