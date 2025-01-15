import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut, setUser } = useAuth();
  const links = (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/allItems"}>Lost & Found Items</Link>
      <Link to={"/"}>Contact</Link>
    </>
  );

  const onImgLink = (
    <>
      <Link
        to={"/addItems"}
        className="btn bg-base-100 text-start justify-start"
      >
        Add Lost & Found Item
      </Link>
      <Link
        className="btn bg-base-100 text-start justify-start"
        to={"/recoveredItems"}
      >
        All Recovered Items
      </Link>
      <Link
        className="btn bg-base-100 text-start justify-start"
        to={"/myItems"}
      >
        Manage My Items
      </Link>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log(res);
        setUser("");
        Swal.fire({
          icon: "success",
          title: "Successfully Logged Out!",
          text: "You have successfully logged in.",
          confirmButtonColor: "#6330F6",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="shadow-lg bg-base-100 sticky top-0 z-50">
      <div className="navbar py-4  md:w-10/12 mx-auto">
        <div className="navbar-start">
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
              className="menu menu-sm text-[#210066] font-bold gap-4 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-6 shadow"
            >
              {links}
            </ul>
          </div>
          <Link>
            <img className="w-14" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-4 text-[#210066] font-bold px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-4">
          {user?.email ? (
            <div className="flex gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={user?.photoURL}
                    alt=""
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={user?.displayName}
                  />
                  <Tooltip id="my-tooltip" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-sm z-[1] w-52 p-2 shadow"
                >
                  {onImgLink}
                </ul>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 bg-[#ffdd1e] hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-black"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/register">
                <button className="p-2 bg-black hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-base-100">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="p-2 bg-[#210066] hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-base-100">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
