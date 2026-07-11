

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const emailId = location.state?.emailId || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!otp || !newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        BASE_URL + "/reset-password",
        {
          emailId,
          otp,
          newPassword,
        }
      );

      setSuccess(res.data);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);

      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">

      <div className="card bg-base-100 w-96 shadow-xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center">
            Reset Password
          </h2>

          <p className="text-center text-base-content/70">
            Enter the OTP sent to your email.
          </p>

          {/* OTP */}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              OTP
            </legend>

            <input
              type="text"
              className="input input-bordered"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </fieldset>

          {/* New Password */}

          <fieldset className="fieldset">

            <legend className="fieldset-legend">
              New Password
            </legend>

            <div className="relative">

              <input
                type={showNewPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                onClick={() =>
                  setShowNewPassword(!showNewPassword)
                }
              >
                {showNewPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </fieldset>

          {/* Confirm Password */}

          <fieldset className="fieldset">

            <legend className="fieldset-legend">
              Confirm Password
            </legend>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </fieldset>

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success mt-4">
              <span>{success}</span>
            </div>
          )}

          <button
            className="btn btn-primary w-full mt-5"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;