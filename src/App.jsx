import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/desktop/Login";
import Signup from "./pages/desktop/Signup";
import InputData from "./pages/desktop/InputData";
import HomePage from './pages/desktop/HomePage';
import AddNotePage from './pages/desktop/AddNotePage';
import EditNotePage from './pages/desktop/EditNotePage';
import { AuthProvider } from "./contexts/AuthContext";
import { NoteProvider } from "./contexts/NoteContext";

function App() {
  return (
    <AuthProvider>
      <NoteProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/input-data" element={<InputData />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/add" element={<AddNotePage />} />
        <Route path="/edit/:id" element={<EditNotePage />} />
      </Routes>
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;
