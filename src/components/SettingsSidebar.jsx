import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; 
import axios from "axios";

export default function SettingsSidebar({ onClose }) {
  const { user, setUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [educationLevel, setEducationLevel] = useState(user?.jenjang || "Tidak Tersedia");
  const [profilePicture, setProfilePicture] = useState(user?.photoUrl || "/profile.jpg");
  const [loadingState, setLoadingState] = useState(""); // "avatar", "jenjang", "reset-password"
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const BASE_URL = "https://noteboost-serve-772262781875.asia-southeast2.run.app";

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) setProfilePicture(savedProfilePicture);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setLoadingState("avatar");
      const res = await axios.post(
        `${BASE_URL}/api/profilepic/update-profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.photoUrl) {
        const updatedUser = { ...user, photoUrl: res.data.photoUrl };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setProfilePicture(res.data.photoUrl);
        setSuccessMessage("Profile picture updated successfully!");
        onClose();
      } else {
        setErrorMessage("Failed to update profile picture.");
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      setErrorMessage("Upload failed. Please try again.");
    } finally {
      setLoadingState("");
    }
  };

  const handleSave = async () => {
    try {
      setLoadingState("jenjang");
      setError("");
      const res = await axios.post(
        `${BASE_URL}/api/auth/update-jenjang`,
        { jenjang: educationLevel },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.message === "Jenjang berhasil diperbarui") {
        const updatedUser = { ...user, jenjang: educationLevel };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        onClose();
      }
    } catch (err) {
      setError("Terjadi kesalahan, silakan coba lagi.");
      console.error("Error updating jenjang:", err);
    } finally {
      setLoadingState("");
    }
  };

  const handleResetPasswordEmail = async () => {
    try {
      setLoadingState("reset-password");
      const res = await axios.post(
        `${BASE_URL}/api/auth/forgot-password`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Password reset link has been sent to your email!");
    } catch (err) {
      console.error("Error sending reset password email:", err);
      alert("Failed to send password reset email.");
    } finally {
      setLoadingState("");
    }
  };

  const getHeaderTitle = () => {
    switch (loadingState) {
      case "avatar": return "Changing Avatar...";
      case "jenjang": return "Updating Education...";
      case "reset-password": return "Sending Reset Email...";
      default: return "NOTEBOOST";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
      <div className="w-[300px] h-full bg-blue-900 shadow-lg">
        <button className="p-2 text-white font-bold" onClick={onClose}>✕</button>

        <div className="p-4">
          <div className="w-[280px] bg-blue-900 text-white p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4">
            <div className="text-white text-3xl mb-1">📄</div>
            <h1 className="text-white text-lg font-bold tracking-wide">
              {getHeaderTitle()}
            </h1>

            <div className="relative">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-white"
              />
              <label
                htmlFor="upload-profile-picture"
                className="absolute bottom-0 right-0 bg-white text-blue-900 p-1 rounded-full cursor-pointer"
              >
                📷
              </label>
              <input
                id="upload-profile-picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </div>

            <p className="text-white text-center text-lg font-bold">{user?.name || "Cacing Pintar"}</p>
            <p className="text-sm underline break-all text-center">{user?.email || "Email Tidak Tersedia"}</p>

            <div className="w-full">
              <label className="block text-lg font-bold mb-2 text-center">Jenjang Pendidikan</label>
              {isEditing ? (
                <select
                  className="w-full text-black p-2 rounded"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                >
                  <option>SMP</option>
                  <option>SMA</option>
                </select>
              ) : (
                <p className="text-white text-center">{educationLevel}</p>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-300 mt-2"
              >
                {isEditing ? "Cancel Edit" : "Edit"}
              </button>
            </div>

            <button
              onClick={handleSave}
              className="bg-white text-blue-900 w-full py-2 rounded font-semibold hover:bg-gray-100"
              disabled={loadingState === "jenjang"}
            >
              {loadingState === "jenjang" ? "Saving..." : "SAVE"}
            </button>

            <div className="flex justify-between items-center w-full pt-4">
              <button
                onClick={handleResetPasswordEmail}
                className="text-sm underline"
                disabled={loadingState === "reset-password"}
              >
                {loadingState === "reset-password" ? "Sending..." : "Reset Password"}
              </button>

              <button
                onClick={handleLogout}
                className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>

            <div className="flex justify-center items-center w-full pt-4">
              <a
                href="https://www.youtube.com/watch?v=1BX-XSUEs28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-center"
              >
                Need Help? Click This
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
