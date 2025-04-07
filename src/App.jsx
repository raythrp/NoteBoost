import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/desktop/Login";
import Signup from "./pages/desktop/Signup";
import InputData from "./pages/desktop/InputData";
import HomePage from './pages/desktop/HomePage';
import AddNotePage from './pages/desktop/AddNotePage';
import EditNotePage from './pages/desktop/EditNotePage';
import HomePageMobile from './pages/mobile/HomePageMobile';
import { AuthProvider } from "./contexts/AuthContext";
import { NoteProvider } from "./contexts/NoteContext";
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/input-data" element={<InputData />} />
            <Route path="/mobile" element={<HomePageMobile />} />
            <Route path="/add" element={<AddNotePage />} />
            <Route path="/edit/:id" element={<EditNotePage />} />
            <Route path="*" element={<Navigate to="/homepage" replace />} />
          </Routes>
        </MainLayout>
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;
