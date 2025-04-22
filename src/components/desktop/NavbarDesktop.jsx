import React, { useState, useEffect } from "react";
import { Settings, FileText } from "react-feather"; // Import ikon tambahan
import SettingsSidebar from "../SettingsSidebar";
import { useAuth } from "../../contexts/AuthContext"; 

const Navbar = () => {
  const { user } = useAuth(); 
  const [username, setUsername] = useState(user?.name || "Cacing Pintar"
  );
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("profilePicture") || "/profile.jpg"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveSettings = (newUsername, newProfilePicture) => {
    // Simpan perubahan ke localStorage
    localStorage.setItem("username", newUsername);
    localStorage.setItem("profilePicture", newProfilePicture);

    // Update state
    setUsername(newUsername);
    setProfilePicture(newProfilePicture);

    // Tutup sidebar
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Ambil data dari localStorage saat komponen dimuat
    const savedUsername = localStorage.getItem("username");
    const savedProfilePicture = localStorage.getItem("profilePicture");

    if (savedUsername) setUsername(savedUsername);
    if (savedProfilePicture) setProfilePicture(savedProfilePicture);
  }, []);

  return (
    <>
      <nav className="w-full h-[87px] bg-gray-100 border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-full px-6 mx-auto">
          {/* Bagian Kiri: Profil */}
          <div className="flex items-center gap-2">
            <div className="w-[45px] h-[45px] bg-[#215273] rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[16px] font-semibold text-[#215273]">
              {username}
            </span>
          </div>

          {/* Bagian Tengah: Home */}
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#215273]" />
            <span className="text-[18px] font-bold text-[#215273]">Home</span>
          </div>

          {/* Bagian Kanan: Settings */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleSidebar}
          >
            <Settings className="w-6 h-6 text-[#215273]" />
            <span className="text-[#215273] font-semibold">Settings</span>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <SettingsSidebar
          onClose={toggleSidebar}
          onSave={handleSaveSettings}
          initialUsername={username}
          initialProfilePicture={profilePicture}
        />
      )}
    </>
  );
};

export default Navbar;