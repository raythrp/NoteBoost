"use client";

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useWindowSize } from "./hooks/useWindowSize";
// Public Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InputData from "./pages/InputData";

import ForgotPassword from "./pages/ForgotPassword"
import InputDataGoogle from "./pages/InputDataGoogle";

// Mobile Pages
import HomePageMobile from "./pages/mobile/HomePageMobile"
import AddNotePageMobile from "./pages/mobile/AddNotePageMobile"
import EditNotePageMobile from "./pages/mobile/EditNotePageMobile"
import MenambahCatatanMobile from "./pages/mobile/MenambahCatatanMobile"
import CatatanMobile from "./pages/mobile/CatatanMobile"
import UploadPage from "./pages/mobile/UploadPage"

// Desktop Pages
import HomePage from "./pages/desktop/HomePageDesktop"
import AddNotePage from "./pages/desktop/AddNotePageDesktop"
import EditNotePage from "./pages/desktop/EditNotePageDesktop"
import MenambahCatatan from "./pages/desktop/MenambahCatatan"



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  // splash loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // periksa jika sudah login tapi belum punya nama → alihkan ke "/input-data"
  if (user && !user.name && location.pathname !== "/input-data") {
    return <Navigate to="/input-data" replace />;
  }

  // splash + auth loading
  if (isLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading Notes App...</p>
        </div>
      </div>
    );
  }

  const userSlug = user?.name?.toLowerCase().replace(/\s+/g, "-");

  return (
    
    <Routes>
       <Route
        path="/"
        element={
          user
            ? isMobile
              ? <HomePageMobile />
              : <HomePage />
            : <Navigate to="/login" replace />  // Jika tidak login, arahkan ke login
        }
      />
      
      <Route path="/Forgot-Password" element={isMobile ? <ForgotPassword /> : <ForgotPassword />} />
      <Route path="/input-data" element={isMobile ? <InputData /> : <InputData />} />
      <Route path="/menambah-catatan" element={isMobile ? <MenambahCatatanMobile /> : <MenambahCatatan />} />
      <Route path="/catatan" element={isMobile ? <CatatanMobile /> : <CatatanMobile />} />
      <Route path="/input-data-google" element={<InputDataGoogle />} />
      {/* Public-only */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={`/${userSlug}`} replace />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to={`/${userSlug}`} replace />}
      />

      {/* Upload (protected) */}
      <Route
        path="/upload"
        element={
          user
            ? isMobile
              ? <UploadPage />
              : <Navigate to="/add?upload=true" replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Protected */}
      <Route
        path="/:displayName"
        element={
          user
            ? isMobile
              ? <HomePageMobile />
              : <HomePage />
            : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/add"
        element={
          user
            ? isMobile
              ? <AddNotePageMobile />
              : <AddNotePage />
            : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/edit/:id"
        element={
          user
            ? isMobile
              ? <EditNotePageMobile />
              : <EditNotePage />
            : <Navigate to="/login" replace />
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={user ? `/${userSlug}` : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
