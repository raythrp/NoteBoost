"use client"

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Type, Upload } from 'react-feather';

function AddNoteButton() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTypeClick = () => {
    navigate('/add');
    setIsMenuOpen(false);
  };

  const handleUploadClick = () => {
    navigate('/add?upload=true');
    setIsMenuOpen(false);
  };

  return (
    <div className="add-menu">
      {isMenuOpen && (
        <>
          <div className="add-menu-item" onClick={handleTypeClick}>
            <span>Type</span>
            <Type className="w-5 h-5  bg-white floating-button text-[#215273]" />
          </div>
          <div className="add-menu-item" onClick={handleUploadClick}>
            <span>Upload</span>
            <Upload className="w-5 h-5 bg-white floating-button text-[#215273]" />
          </div>
        </>
      )}
      <button 
        className="w-16 h-16 floating-button text-white shadow-sky-800/30 bg-[#215273] rounded-full flex items-center justify-center shadow-lg hover:bg-[#215273]/90 transition-colors z-20"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Add new note"}
      >
        {isMenuOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <Plus className="w-8 h-8 text-white" />
        )}
      </button>
    </div>
  );
}

export default AddNoteButton;
