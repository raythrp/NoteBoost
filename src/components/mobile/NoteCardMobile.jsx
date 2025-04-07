import React from "react"

// Text placeholder for MoreHorizontal icon
const MoreHorizontal = () => <span className="text-2xl">⋮</span>

export default function NoteCardMobile({ id, title, onEdit, onDelete, top, menuPosition, isMenuOpen, toggleMenu }) {
  return (
    <>
      {/* Note card */}
      <div
        className="absolute w-[274px] h-[120px] left-[59px] bg-white shadow-md rounded-md flex flex-row items-center p-[8px_10px] gap-[12px]"
        style={{ top: `${top}px` }}
      >
        {/* Card content would go here */}
      </div>

      {/* Title */}
      <div className="absolute left-[68px]" style={{ top: `${top + 126}px` }}>
        <h3 className="text-base font-normal text-black">{title}</h3>
      </div>

      {/* Menu button */}
      <div className={`absolute w-[24px] h-[24px] ${menuPosition}`}>
        <button onClick={toggleMenu} aria-label="More options" className="w-full h-full">
          <MoreHorizontal className="w-6 h-6 text-[#1D1B20]" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-1 bg-[#215273] rounded-[10px] shadow-lg z-10 flex">
            <button
              className="flex items-center p-2 text-white"
              onClick={() => {
                onEdit(id)
                toggleMenu()
              }}
            >
              <span className="text-xs font-semibold">EDIT</span>
            </button>
            <div className="w-px bg-white/30"></div>
            <button
              className="flex items-center p-2 text-white"
              onClick={() => {
                onDelete(id)
                toggleMenu()
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

