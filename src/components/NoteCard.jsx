import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';


function NoteCard({ id, title, content, onEdit, onDelete }) {
  const plainText = (content && Array.isArray(content.ops))
  ? content.ops.map(op => op.insert).join('')
  : (typeof content === 'string' ? content : '');
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent triggering card click when clicking menu
    setShowMenu(!showMenu);
  };
  
  const handleCardClick = () => {
    onEdit(id); // Navigate to note detail page
  };

  return (
    <div className="relative w-full sm:w-[calc(100%-16px)] max-w-full p-2 mb-2">
      <div
        className="w-full h-[120px] bg-white shadow-md rounded-lg p-2 mb-2 overflow-hidden text-ellipsis"
        onClick={handleCardClick}
      >
        {plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText}
      </div>
      <div className="flex items-center justify-between mt-2">
        <h3 className="text-base font-normal text-black">{title}</h3>
        <div className="relative">
          <button className="p-1" 
          onClick={toggleMenu} 
          aria-label="More options">
            <MoreHorizontal className="w-6 h-6 text-gray-800" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 bg-[#215273] rounded-lg shadow-lg z-10 flex">
              <button 
                className="flex items-center p-2 text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  onEdit(id);
                  setShowMenu(false);
                }}
              >
                <span>EDIT</span>
              </button>
              <div className="w-px bg-white/30"></div>
              <button 
                className="flex items-center p-2 text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  onDelete(id);
                  setShowMenu(false);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteCard;