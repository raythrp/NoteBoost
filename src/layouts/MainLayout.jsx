import React from 'react';
import Navbar from '../components/desktop/Navbar';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen blue-gradient-bg">
      <Navbar />
      <div className="container px-4 py-8 mx-auto content-container">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
