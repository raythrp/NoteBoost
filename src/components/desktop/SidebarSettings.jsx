import React, { useState, useEffect } from "react";

export default function SidebarSettings({
  onClose,
  onSave,
  initialUsername, // Tambahkan prop untuk username awal
  initialProfilePicture, // Tambahkan prop untuk gambar profil awal
}) {
  const [educationLevel, setEducationLevel] = useState("SMP");
  const [classLevel, setClassLevel] = useState("11");
  const [username, setUsername] = useState(initialUsername);
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [isEditing, setIsEditing] = useState(false);

  // Perbarui state lokal ketika props berubah
  useEffect(() => {
    setUsername(initialUsername);
    setProfilePicture(initialProfilePicture);
  }, [initialUsername, initialProfilePicture]);

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
    onSave(username, profilePicture); // Panggil fungsi onSave untuk menyimpan data
    setIsEditing(false); // Keluar dari mode edit
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
      <div className="w-[300px] h-full bg-blue-900 shadow-lg">
        {/* Close Button */}
        <button
          className="p-2 text-white font-bold"
          onClick={onClose} // Close sidebar
        >
          ✕
        </button>

        <div className="p-4">
          <div className="w-[280px] bg-blue-900 text-white p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4">
            {/* Profile Picture */}
            {isEditing ? (
              <div className="flex flex-col items-center space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="text-white"
                />
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="Preview"
                    className="w-20 h-20 rounded-full border-2 border-white"
                  />
                )}
              </div>
            ) : (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-white"
              />
            )}

            {/* Username */}
            <div className="flex justify-between w-full items-center">
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Edit Username"
                  className="w-full text-black p-2 rounded"
                />
              ) : (
                <span className="text-lg font-semibold">{username}</span>
              )}
              <button
                className={`text-xs bg-white text-blue-900 px-2 py-1 rounded border border-blue-900`}
                onClick={() => setIsEditing(true)} // Hanya untuk masuk ke mode edit
              >
                Edit
              </button>
            </div>

            {/* Email */}
            <p className="text-sm underline break-all text-center">
              CacingPintar97@gmail.com
            </p>

            {/* Dropdown - Jenjang */}
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
              onClick={handleSave} // Fungsi untuk menyimpan data
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