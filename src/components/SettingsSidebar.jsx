import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; 
import axios from "axios";
export default function SettingsSidebar({
  onClose,
  onSave,
  initialUsername,
  initialProfilePicture,
}) {
  const { user, setUser } = useAuth(); 
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  const [username, setUsername] = useState(user?.name || "Cacing Pintar");
  const [profilePicture, setProfilePicture] = useState(
    initialProfilePicture || "/profile.jpg"
  );
  const [educationLevel, setEducationLevel] = useState(user?.jenjang || "Tidak Tersedia");

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result); // Set gambar yang diunggah sebagai URL base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "/api/auth/update-jenjang",
        { email: user.email, jenjang: educationLevel },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
          },
        }
      );

      if (res.data.message === "Jenjang berhasil diperbarui") {
        const updatedUser = { ...user, jenjang: educationLevel };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        setIsEditingName(false);
        onClose();
      }
    } catch (err) {
      setError("Terjadi kesalahan, silakan coba lagi.");
      console.error("Error updating jenjang:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
      <div className="w-[300px] h-full bg-blue-900 shadow-lg">
        {/* Close Button */}
        <button className="p-2 text-white font-bold" onClick={onClose}>
          ✕
        </button>

        <div className="p-4">
          <div className="w-[280px] bg-blue-900 text-white p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4">
            {/* Logo */}
            <div className="text-white text-3xl mb-1">📄</div>
            <h1 className="text-white text-lg font-bold tracking-wide">
              NOTEBOOST
            </h1>

            {/* Profile Picture */}
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

            {/* Username - Read Only */}
            <div className="flex justify-between w-all text-center">
              <p className="text-white text-center text-lg font-bold">{user?.name || "Cacing Pintar"}</p>
            </div>

            {/* Email */}
            <p className="text-sm underline break-all text-center">
              {user?.email || "Email Tidak Tersedia"}
            </p>

            {/* Jenjang Pendidikan */}
            <div className="w-full">
              <label className="block text-lg font-bold mb-2 text-center">Jenjang Pendidikan</label>
              {isEditing ? (
                // Display dropdown when editing
                <select
                  className="w-full text-black p-2 rounded"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                >
                  <option>SMP</option>
                  <option>SMA</option>
                </select>
              ) : (
                // Display text when not editing
                <p className="text-white text-center">{educationLevel}</p>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-300 mt-2"
              >
                {isEditing ? "Cancel Edit" : "Edit"}
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="bg-white text-blue-900 w-full py-2 rounded font-semibold hover:bg-gray-100"
            >
              SAVE
            </button>

            {/* Reset Password & Log Out */}
            <div className="flex justify-between items-center w-full pt-4">
              <a href="#" className="text-sm underline">
                Reset Password
              </a>
              <button 
              onClick={handleLogout}
              className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-gray-100">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}