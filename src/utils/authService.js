import axios from "axios";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../firebase";

// agar semua axios.post("/…") mengarah ke BE-mu
axios.defaults.baseURL = 
  import.meta.env.VITE_API_URL || "https://noteboost-serve-772262781875.asia-southeast2.run.app";

  export const registerUser = async ({ email, password, nama, jenjang }) => {
    try {
      const res = await axios.post("/api/auth/register", { email, password, nama, jenjang });
      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  };

  export const updateUserProfile = async (userData) => {
    try {
      const response = await axios.post("/api/auth/updateProfile", userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
  
      if (!user.emailVerified) {
        await signOut(auth)
        throw new Error("Email belum diverifikasi. Silakan cek inbox.")
      }
  
      const idToken = await user.getIdToken()
      localStorage.setItem("token", idToken)
  
      const res = await axios.post("/api/auth/login", { idToken })
      return { success: true, displayName: res.data.nama,
        needsAdditionalInfo: res.data.needsAdditionalInfo}
  
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || err.message
      }
    }
  }

  export const loginWithGoogleUser = async () => { 
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const idToken = await user.getIdToken()
      localStorage.setItem("token", idToken)
  
      const res = await axios.post("/api/auth/login", { idToken })
      return { success: true, displayName: res.data.nama,
        needsAdditionalInfo: res.data.needsAdditionalInfo}
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.message ||
          "Google login gagal. Silakan coba lagi.",
      }
    }

};

