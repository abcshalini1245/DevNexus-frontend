


import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login
   const handleLogin = async () => {
  console.log("Login button clicked");

  try {
    console.log("Sending request...");

    const res = await axios.post(
      BASE_URL + "/login",
      {
        emailId,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Response:", res);

    dispatch(addUser(res.data));

    console.log("Navigating...");
    navigate("/feed");
  } catch (err) {
    console.log("Login Error:", err);
    console.log("Response:", err.response);

    setError(err?.response?.data || "Something went wrong");
  }
};

  // Signup
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));

      // Navigate to profile after signup
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">

          <h2 className="card-title justify-center text-2xl mb-2">
            {isLoginForm ? "Login" : "Signup"}
          </h2>

          {/* First Name */}
          {!isLoginForm && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                First Name
              </legend>

              <input
                type="text"
                className="input w-full"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
              />
            </fieldset>
          )}

          {/* Last Name */}
          {!isLoginForm && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Last Name
              </legend>

              <input
                type="text"
                className="input w-full"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
              />
            </fieldset>
          )}

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Email ID
            </legend>

            <input
              type="email"
              className="input w-full"
              placeholder="Enter Email"
              value={emailId}
              onChange={(e) =>
                setEmailId(e.target.value)
              }
            />
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Password
            </legend>

            <div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    className="input w-full pr-12"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    type="button"
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>
          </fieldset>

          {error && (
  <div className="alert alert-error mt-4">
    <span>{error}</span>
  </div>
)}

{/* Forgot Password */}
{isLoginForm && (
  <div className="text-right mt-2">
    <button
      className="link link-primary text-sm"
      onClick={() => navigate("/forgot-password")}
    >
      Forgot Password?
    </button>
  </div>
)}

<div className="card-actions justify-center mt-6">
  <button
    className="btn btn-primary w-full"
    onClick={
      isLoginForm ? handleLogin : handleSignup
    }
  >
    {isLoginForm ? "Login" : "Signup"}
  </button>
</div>

<p className="text-center mt-5">
  {isLoginForm
    ? "New User? "
    : "Already have an account? "}

  <span
    className="text-primary cursor-pointer font-semibold hover:underline"
    onClick={() => {
      setIsLoginForm(!isLoginForm);
      setError("");
    }}
  >
    {isLoginForm
      ? "Signup Here"
      : "Login Here"}
  </span>
</p>

        </div>
      </div>
    </div>
  );
};

export default Login;