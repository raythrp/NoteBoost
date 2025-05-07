import React, { useState } from 'react';

const YouTubeLogo = () => {
  return (
    <div
      style={{
        width: '64px',
        height: '64px',
        backgroundColor: '#FF0000', 
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s',
      }}
      className="transform hover:scale-110"
    >
      {/* Play button */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="white"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
};

const LinkYoutube = ({ onClose }) => {
  const [message, setMessage] = useState("Butuh Bantuan Dalam Menggunakan Web Ini?");
  const [error, setError] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-sm p-6 bg-white rounded-lg sm:max-w-md">
        {/* X Button (Close) */}
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-6 text-2xl font-bold text-center">{message}</h2>

        {error && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* YouTube Logo Link */}
        <div className="flex justify-center mt-4">
          <a
            href="https://www.youtube.com/watch?v=1BX-XSUEs28"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeLogo />
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Klik logo untuk tutorial video
        </p>
      </div>
    </div>
  );
};

export default LinkYoutube;
