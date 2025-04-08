
import { useAuth } from "../../contexts/AuthContext";
import { Settings } from "react-feather";

function Navbar() {
  const { user } = useAuth();
  const displayName = user?.name || "Cacing Pintar";

  return (
    <nav className="w-full h-[58px] bg-white border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        {/* Left: Profile section */}
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] bg-[#215273] rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-white">Profile</span>
          </div>
          <span className="text-[#215273] font-semibold text-[16px]">
            {displayName}
          </span>
        </div>

        {/* Middle: Center text */}
        <span className="text-base font-normal text-black">Select a Note!</span>

        {/* Right: Settings button */}
        <div className="flex items-center gap-1 cursor-pointer">
          <Settings className="w-5 h-5 text-[#215273]" />
          <span className="text-[16px] font-semibold text-[#215273]">Settings</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

