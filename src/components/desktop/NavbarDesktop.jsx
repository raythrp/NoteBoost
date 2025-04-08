import React from "react";
import { Link } from "react-router-dom";
import { Settings } from "react-feather";
import { useAuth } from "../../contexts/AuthContext"

const Navbar = () => {
  const { user } = useAuth();
  const displayName = user?.name || "Cacing Pintar";

  return (
    <nav className="w-full h-[87px] bg-gray-100 border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] bg-[#215273] rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-white">Logo</span>
          </div>
          <span className="text-[16px] font-semibold text-[#215273]">
            {displayName}
          </span>
        </div>

        {/* Middle: Home */}
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] bg-white shadow-md rounded-md flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                stroke="#215273"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 7H17M7 11H17M7 15H13"
                stroke="#215273"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Link to="/homepage" className="text-2xl font-bold text-[#215273]">
            Home
          </Link>
        </div>

        {/* Right: Settings */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Settings className="w-6 h-6 text-[#215273]" />
          <span className="text-[#215273] font-semibold">Settings</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
