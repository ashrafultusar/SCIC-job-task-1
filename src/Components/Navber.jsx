import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);

  const handelLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mx-auto ">
      <div className="navbar bg-[#0a1316] text-white">
        <div className="navbar-start mt-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link>
                  <a>All Products</a>
                </Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-extralight">echoMart</a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link>
                <a>All Products</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <button
                onClick={handelLogout}
                className=" bg-[#b58753] px-3 py-2 rounded-md mr-2 "
              >
                Logout
              </button>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-14 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className=" bg-[#b58753] px-3 py-2 rounded-md mr-2 ">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
