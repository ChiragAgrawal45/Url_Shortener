import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const closeMenu = () => setNavbarOpen(false);

  const onLogOutHandler = () => {
    setToken(null); // ✅ context handles localStorage
    navigate("/login");
    closeMenu();
  };

  return (
    <div className="h-16 bg-custom-gradient z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="font-bold text-3xl text-white italic">
            Linklytics
          </h1>
        </Link>

        {/* NAV ITEMS */}
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:static absolute left-0 top-[64px]
          ${navbarOpen ? "h-fit pb-5" : "h-0 overflow-hidden"}
          sm:h-fit bg-custom-gradient sm:bg-transparent w-full sm:w-auto flex-col sm:flex-row px-4 sm:px-0 transition-all`}
        >
          {/* HOME */}
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-200"
              }`}
            >
              Home
            </Link>
          </li>

          {/* ABOUT */}
          <li>
            <Link
              to="/about"
              onClick={closeMenu}
              className={`${
                path === "/about" ? "text-white font-semibold" : "text-gray-200"
              }`}
            >
              About
            </Link>
          </li>

          {/* DASHBOARD */}
          {token && (
            <li>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className={`${
                  path === "/dashboard"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                }`}
              >
                Dashboard
              </Link>
            </li>
          )}

          {/* SIGNUP */}
          {!token && (
            <li>
              <Link
                to="/register"
                onClick={closeMenu}
                className="bg-rose-700 text-white w-24 text-center font-semibold px-2 py-2 rounded-md hover:text-slate-300"
              >
                SignUp
              </Link>
            </li>
          )}

          {/* LOGOUT */}
          {token && (
            <li>
              <button
                onClick={onLogOutHandler}
                className="bg-rose-700 text-white w-24 text-center font-semibold px-2 py-2 rounded-md hover:text-slate-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>

      </div>
    </div>
  );
};

export default Navbar;