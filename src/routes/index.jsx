import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AddNotePage from '../pages/AddNotePage';
import EditNotePage from '../pages/EditNotePage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddNotePage />} />
      <Route path="/edit/:id" element={<EditNotePage />} />
    </Routes>
  );
}

export default AppRoutes;
