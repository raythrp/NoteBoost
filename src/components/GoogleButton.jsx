"use client"

const GoogleButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[352px] h-[52px] flex items-center px-[10px] py-[8px] gap-[12px] rounded-[4px] border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <div className="w-[36px] h-[36px] relative flex-none">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="4" fill="white" />
          <path d="M3 3 H33 V33 H3 Z" fill="#FFC107" />
          <path d="M4.73 3 H14.39 V21.37 Z" fill="#FF3D00" />
          <path d="M4.65 21.04 H11.91 V33 Z" fill="#4CAF50" />
          <path d="M18 15 H33 V29.84 Z" fill="#1976D2" />
        </svg>
      </div>
      <span className="text-[16px] leading-[120%] text-[#3A3A3B]">Continue with Google</span>
    </button>
  )
}

export default GoogleButton

