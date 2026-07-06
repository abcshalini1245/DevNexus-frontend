import React, { useEffect } from "react";
import NavBar from "./navBar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  const navigate = useNavigate();
  const location = useLocation();
  

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        // Redirect to login only if not already there
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      } else {
        console.error(err);
      }
    }
  };

  // useEffect(() => {
  //   // Don't call the API if the user is already in Redux
  //   if (!userData && location.pathname !== "/login") {
  //     fetchUser();
  //   }
  // }, [userData, location.pathname]);


  


useEffect(() => {
  const publicRoutes = [
    "/login",
    "/forgot-password",
    "/reset-password",
  ];

  if (publicRoutes.includes(location.pathname)) {
    return;
  }

  fetchUser();
}, [location.pathname]);


//   useEffect(() => {
//   if (!userData) {
//     fetchUser();
//   }
// }, []);

  // return (
  //   <div>
  //     <NavBar />
  //     <Outlet />
  //     <Footer />
  //   </div>
  // );
  return (
  <div className="min-h-screen flex flex-col bg-base-200">
    <NavBar />

    <div className="flex-1">
      <main className="flex-1 px-4 py-8">
    <Outlet />
</main>
    </div>

    <Footer />
  </div>
);
};

export default Body;