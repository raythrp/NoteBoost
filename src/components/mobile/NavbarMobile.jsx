
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user } = useAuth();
  const displayName = user?.name || "Cacing Pintar";

  return (
    <nav className="w-full h-[58px] bg-white border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        <div className="flex items-center">
          <span className="text-base font-normal text-black">Select a Note!</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
              <div className="w-full h-full bg-gray-300"></div>
            </div>
            <span className="text-[#215273] font-semibold text-[16px]">
              {displayName}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

