import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router"; // ✅ Correct import
import { AuthContext } from "../../Provider/AuthContext";
import { GlowingEffect } from "../Ui/GlowingEffect";
import { AlignVerticalJustifyStart, User } from "lucide-react";
import toast from "react-hot-toast";

const toastOptions = {
  style: {
    borderRadius: "10px",
    background: "white",

    color: "#6b46c1",

    fontWeight: "bold",
  },
  iconTheme: {
    primary: "#6b46c1",
    secondary: "#121212",
  },
};

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:shadow-lg  ${
              isActive ? "border-b-2  text-xl  border-[#6B46C1] py-1" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/topics"
          className={({ isActive }) =>
            `hover:shadow-lg  ${
              isActive ? "border-b-2 text-xl border-[#6B46C1] py-1 " : ""
            }`
          }
        >
          Topics
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:shadow-lg  ${
                isActive ? "border-b-2 text-xl border-[#6B46C1] py-1" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:shadow-lg  ${
              isActive ? "border-b-2  text-xl  border-[#6B46C1] py-1" : ""
            }`
          }
        >
          About
        </NavLink>
      </li>
    </>
  );

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!", toastOptions);

      navigate("/auth/login");
    } catch (err) {
      toast.error("Failed to log out: " + err.message, toastOptions);
    }
  };

  return (
    <div className="px-4">
      <div className="max-w-5xl mx-auto rounded-2xl bg-white/10 backdrop-blur-md shadow-lg px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        ></GlowingEffect>
        {/* Logo */}
        <NavLink to="/">
          <div className="text-2xl md:text-4xl font-bold text-white">
            CODE.
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              DIARY
            </span>
          </div>
        </NavLink>

        {/* Center Nav Links */}
        <div className="flex gap-6 text-white font-semibold justify-center">
          <ul className="flex items-center justify-center gap-6">{navLinks}</ul>

          {/* <NavLink to="/topics">
            <p className="hover:text-purple-300 transition">Topics</p>
          </NavLink>
          <NavLink to="/dashboard">
            <p className="hover:text-purple-300 transition">Dashboard</p>
          </NavLink>
          <p className="hover:text-purple-300 transition">About</p> */}
        </div>

        {/* Right Side: Search & Avatar */}
        <div className="flex items-center gap-2">
          <div>
            <h1>Welcome, {user?.displayName}</h1>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-purple-300 ring-offset-base-100 ring-offset-2">
                {user?.photoURL ? (
                  <img alt="User Avatar" src={user.photoURL} />
                ) : (
                  <User size={40}></User>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  bg-black backdrop-blur-lg  rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li className="hover:bg-[#6b46c1]">
                <NavLink to="/profile">
                  <p className="justify-between hover:text-xl">Profile</p>
                </NavLink>
              </li>

              <li className="hover:bg-[#6b46c1]">
                <button className="hover:text-xl" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
