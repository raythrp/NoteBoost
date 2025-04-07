import Image from "../desktop/Logo" // Assuming we have a Logo component that can serve as avatar

export default function NavbarMobile() {
  return (
    <nav className="absolute w-[402px] h-[58px] left-0 top-0 bg-white border border-black backdrop-blur-sm z-10">
      <div className="absolute w-[107px] h-[19px] left-[22px] top-[20px] font-inter text-base font-normal">
        Select a Note!
      </div>

      <div className="absolute w-[122px] h-[35px] left-[266px] top-[10px] flex items-center gap-2">
        <div className="relative w-[35px] h-[35px]">
          <Image
            src="/placeholder.svg"
            alt="Avatar"
            className="w-[35px] h-[35px] rounded-full"
          />
        </div>
        <span className="text-[#215273] text-xs font-semibold">Cacing Pintar</span>
      </div>
    </nav>
  )
}

