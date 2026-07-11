

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const navigate = useNavigate();

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
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
        BASE_URL + "/profile/edit/password",
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      setSuccess(res.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/profile");
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
    <div className="min-h-screen flex justify-center items-center bg-base-200">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center">
            Change Password
          </h2>

          <p className="text-center text-base-content/70">
            Update your account password securely.
          </p>

          {/* Current Password */}

          <label className="form-control mt-5">

            <div className="label">
              <span className="label-text">
                Current Password
              </span>
            </div>

            <div className="relative">

              <input
                type={showCurrentPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                onClick={() =>
                  setShowCurrentPassword(!showCurrentPassword)
                }
              >
                {showCurrentPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </label>

          {/* New Password */}

          <label className="form-control mt-4">

            <div className="label">
              <span className="label-text">
                New Password
              </span>
            </div>

            <div className="relative">

              <input
                type={showNewPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
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

          </label>

          {/* Confirm Password */}

          <label className="form-control mt-4">

            <div className="label">
              <span className="label-text">
                Confirm Password
              </span>
            </div>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
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

          </label>

          {/* Error */}

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="alert alert-success mt-4">
              <span>{success}</span>
            </div>
          )}

          <button
            className="btn btn-primary w-full mt-6"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChangePassword;