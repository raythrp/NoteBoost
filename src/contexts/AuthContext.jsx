"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { login, signup, loginWithGoogle } from "../services/authService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password)
      if (response.success) {
        setUser(response.user)
        localStorage.setItem("user", JSON.stringify(response.user))
        return { success: true }
      }
      return { success: false, error: "Invalid credentials" }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signupUser = async (email) => {
    try {
      const response = await signup(email)
      if (response.success) {
        setUser(response.user)
        localStorage.setItem("user", JSON.stringify(response.user))
        return { success: true }
      }
      return { success: false, error: "Signup failed" }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const loginWithGoogleUser = async () => {
    try {
      const response = await loginWithGoogle()
      if (response.success) {
        setUser(response.user)
        localStorage.setItem("user", JSON.stringify(response.user))
        return { success: true }
      }
      return { success: false, error: "Google login failed" }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updateUserProfile = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        signupUser,
        loginWithGoogleUser,
        updateUserProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
