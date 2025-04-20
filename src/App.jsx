"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import Signup from "./pages/Signup"
import InputData from "./pages/InputData"
import { useAuth } from "./contexts/AuthContext"
import { useWindowSize } from "./hooks/useWindowSize"

// Mobile Pages
import HomePageMobile from "./pages/mobile/HomePageMobile"
import AddNotePageMobile from "./pages/mobile/AddNotePageMobile"
import EditNotePageMobile from "./pages/mobile/EditNotePageMobile"
import UploadPage from "./pages/mobile/UploadPage"

// Desktop Pages
import HomePage from "./pages/desktop/HomePageDesktop"
import AddNotePage from "./pages/desktop/AddNotePageDesktop"
import EditNotePage from "./pages/desktop/EditNotePageDesktop"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { width } = useWindowSize()
  const isMobile = width < 768

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading Notes App...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={isMobile ? <HomePageMobile /> : <HomePage />} />
      <Route path="/add" element={isMobile ? <AddNotePageMobile /> : <AddNotePage />} />
      <Route path="/edit/:id" element={isMobile ? <EditNotePageMobile /> : <EditNotePage />} />
      <Route path="/upload" element={isMobile ? <UploadPage /> : <Navigate to="/add?upload=true" />} />
      <Route path="/login" element={isMobile ? <Login /> : <Login />} />
      <Route path="/forgotPassword" element={isMobile ? <ForgotPassword /> : <ForgotPassword />} />
      <Route path="/signup" element={isMobile ? <Signup /> : <Signup />} />
      <Route path="/input-data" element={isMobile ? <InputData /> : <InputData />} />
    </Routes>
  )
}

export default App

