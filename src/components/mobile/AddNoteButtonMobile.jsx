import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

// Simple text placeholders for icons
const Plus = () => <span>+</span>
const X = () => <span>X</span>
const Type = () => <span>T</span>
const Upload = () => <span>U</span>

export default function AddNoteButtonMobile() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleTypeClick = () => {
    navigate("/add")
    setIsMenuOpen(false)
  }

  const handleUploadClick = () => {
    navigate("/add?upload=true")
    setIsMenuOpen(false)
  }

  return (
    <>
      {isMenuOpen ? (
        <>
          {/* Main button (X) rotated -45 degrees */}
          <div className="absolute w-[50px] h-[50px] left-[310.64px] top-[805px] bg-[#215273] rounded-full z-50 transform -rotate-45">
            <button onClick={toggleMenu} className="absolute flex items-center justify-center w-full h-full">
              <X className="w-6 h-6 text-white transform rotate-45" />
            </button>
          </div>

          {/* Type option - rectangular background */}
          <div
            className="absolute w-[59px] h-[27.76px] left-[268px] top-[818.76px] bg-[#215273] cursor-pointer z-50 transform -rotate-90"
            onClick={handleTypeClick}
          >
            {/* Type icon */}
            <div className="absolute w-[22.2px] h-[21.31px] transform rotate-90" style={{ top: "3px", left: "18px" }}>
              <Type className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Upload option */}
          <div
            className="absolute w-[25.8px] h-[25.8px] left-[297.71px] top-[791.58px] cursor-pointer z-50"
            onClick={handleUploadClick}
          >
            <div className="w-full h-full p-1 border-2 border-white">
              <Upload className="w-full h-full text-white" />
            </div>
          </div>
        </>
      ) : (
        /* Add button (Plus) */
        <div
          className="absolute w-[50px] h-[50px] left-[321px] top-[780px] bg-[#215273] rounded-full flex items-center justify-center cursor-pointer z-50"
          onClick={toggleMenu}
        >
          <Plus className="w-6 h-6 text-white" />
        </div>
      )}
    </>
  )
}

