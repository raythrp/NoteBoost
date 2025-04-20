import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Settings } from "react-feather";
import SettingsSidebar from "../SettingsSidebar";

function Navbar() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("username") || user?.name || "Cacing Pintar"
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
    setDisplayName(newUsername);
    setProfilePicture(newProfilePicture);

    // Tutup sidebar
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Ambil data dari localStorage saat komponen dimuat
    const savedUsername = localStorage.getItem("username");
    const savedProfilePicture = localStorage.getItem("profilePicture");

    if (savedUsername) setDisplayName(savedUsername);
    if (savedProfilePicture) setProfilePicture(savedProfilePicture);
  }, []);

  return (
    <>
      <nav className="w-full h-[58px] bg-white border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-full px-4 mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-[45px] h-[45px] bg-[#215273] rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#215273] font-semibold text-[16px]">
              {displayName}
            </span>
          </div>
          <span className="text-base font-normal text-black">Select a Note!</span>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={toggleSidebar}
          >
            <Settings className="w-5 h-5 text-[#215273]" />
            <span className="text-[16px] font-semibold text-[#215273]">
              Settings
            </span>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <SettingsSidebar
          onClose={toggleSidebar}
          onSave={handleSaveSettings}
          initialUsername={displayName}
          initialProfilePicture={profilePicture}
        />
      )}
    </>
  );
}

export default Navbar;