import React, { useState } from "react";

export default function SettingsSidebar({
  onClose,
  onSave,
  initialUsername,
  initialProfilePicture,
}) {
  const [username, setUsername] = useState(initialUsername || "Cacing Pintar");
  const [profilePicture, setProfilePicture] = useState(
    initialProfilePicture || "/profile.jpg"
  );
  const [educationLevel, setEducationLevel] = useState("SMA");
  const [classLevel, setClassLevel] = useState("11");

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

  const handleSave = () => {
    onSave(username, profilePicture, educationLevel, classLevel);
    onClose(); // Tutup sidebar setelah menyimpan
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

            {/* Username */}
            <div className="flex justify-between w-full items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Edit Username"
                className="w-full text-black p-2 rounded"
              />
            </div>

            {/* Email */}
            <p className="text-sm underline break-all text-center">
              CacingPintar97@gmail.com
            </p>

            {/* Dropdown - Jenjang Pendidikan */}
            <div className="w-full">
              <label className="block text-sm mb-1">Jenjang Pendidikan</label>
              <select
                className="w-full text-black p-2 rounded"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option>SD</option>
                <option>SMP</option>
                <option>SMA</option>
              </select>
            </div>

            {/* Dropdown - Kelas */}
            <div className="w-full">
              <label className="block text-sm mb-1">Kelas</label>
              <select
                className="w-full text-black p-2 rounded"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
              >
                {[7, 8, 9, 10, 11, 12].map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
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
              <button className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-gray-100">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}