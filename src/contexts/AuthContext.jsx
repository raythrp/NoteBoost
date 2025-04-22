"use client"
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react"
import { loginUser, registerUser, loginWithGoogleUser } from "../utils/authService"
import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "../firebase"; 
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
  
        // Ensure the parsed data has all necessary fields
        if (parsedUser && parsedUser.email && parsedUser.name) {
          console.log("User loaded from localStorage:", parsedUser);
          setUser(parsedUser);
        } else {
          console.error("Parsed user data is invalid or incomplete:", parsedUser);
          localStorage.removeItem("user");  // Remove invalid data
          setUser(null);  // Reset user state
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem("user");  // Clear corrupted data
        setUser(null);  // Reset user state
      }
    } else {
      setUser(null);  // If there's no user data in localStorage, reset state
    }
  
    setLoading(false);  // End loading after the check
  }, []);
  


  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
  
      if (!user.emailVerified) {
        await signOut(auth)
        return { success: false, error: "Email belum diverifikasi. Silakan cek inbox." }
      }
  
      const idToken = await user.getIdToken()
      localStorage.setItem("token", idToken)
      
      const res = await axios.post("/api/auth/login", { idToken })
      const fullUser = {
        email: res.data.email,
        name: user.displayName || res.data.nama || "Cacing Pintar",
        jenjang: res.data.jenjang || "Tidak Tersedia",
      };
      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));

      return { success: true, needsAdditionalInfo: res.data.needsAdditionalInfo };
    } catch (err) {
      let msg = "Terjadi kesalahan. Silakan coba lagi.";
      const code = err.code || err?.response?.data?.error;
  
      if (code === "auth/user-not-found") msg = "Akun tidak ditemukan.";
      else if (code === "auth/wrong-password") msg = "Password salah.";
      else if (code === "auth/invalid-credential") msg = "Email atau password salah.";
      else if (typeof code === "string") msg = code;
  
      return { success: false, error: msg };
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
    setLoading(true)
    try {
      const result = await loginWithGoogle()
  
      if (result.success) {
        setUser({ email: result.email, name: result.nama || "User"  })
        localStorage.setItem("user", JSON.stringify({ email: result.email }))
        return { success: true, needsAdditionalInfo: result.needsAdditionalInfo }
      } else {
        return { success: false, error: result.error || "Google login failed" }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfile = async (userData) => {
    try {
      // Ambil user yang ada di localStorage untuk memudahkan
      const user = JSON.parse(localStorage.getItem("user"));
      
      // Pastikan user ada
      if (user && user.email) {
        // Ambil referensi ke dokumen user di Firestore berdasarkan email
        const userRef = doc(db, "users", user.email);
  
        // Perbarui data user di Firestore
        await updateDoc(userRef, {
          ...userData,  // Menyebarkan data baru yang ingin diperbarui
        });
  
        // Update user di localStorage
        const updatedUser = { ...user, ...userData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
  
        // Update state user di aplikasi
        setUser(updatedUser);
      }
    } catch (err) {
      console.error("Error updating user profile:", err);
    }
  };

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
