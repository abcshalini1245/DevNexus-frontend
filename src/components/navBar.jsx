
import ThemeToggle from "./ThemeToggle";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await axios.post(
      BASE_URL + "/logout",
      {},
      { withCredentials: true }
    );

    dispatch(removeUser());
    navigate("/login");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="navbar bg-blue-900 shadow-sm px-5 text-neutral-content">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold">DevNexus</Link>
      </div>

      {/* Right Side */}
      {user && (
        <div className="flex items-center gap-4 ">
           {/* Theme Toggle */}
  <ThemeToggle />
          <p className="font-semibold">
            Welcome, {user.firstName}
          </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src={
      user?.photourl
        ? user.photourl
        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              // className="menu menu-sm dropdown-content mt-3 z-1 w-52 rounded-box bg-base-50 p-2 text-black shadow"
              className="menu menu-sm dropdown-content mt-3 z-1 w-52 rounded-box bg-base-100 p-2 text-base-content shadow"
            >
                <li>
                <Link to="/feed"> Feed</Link>
              </li>
             <li>
<Link to="/profile">Profile</Link>
</li>
              <li>
                <Link to="/user/connections"> Connections</Link>
              </li>


                <li>
                <Link to="/user/requests/recieved">Requests</Link>
              </li>

              <li>
  <button onClick={handleLogout}>Logout</button>
</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;