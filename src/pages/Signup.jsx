"use client"
import axios from "axios";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Logo from "../components/icons/Logo"
import Separator from "../components/Separator"
import { useAuth } from "../contexts/AuthContext"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate()
  const { loginWithGoogleUser } = useAuth()
  const { loginUser, user, setUser } = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const isPasswordStrong = (pwd) => {
    const minLength = pwd.length >= 8
    const hasUpper = /[A-Z]/.test(pwd)
    const hasLower = /[a-z]/.test(pwd)
    const hasNumber = /\d/.test(pwd)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    return minLength && hasUpper && hasLower && hasNumber && hasSymbol
  }

  const handleSignup = (e) => {
    e.preventDefault()
    setError("")
  
    if (!email || !password) {
      setError("Email & password wajib diisi.")
      return
    }
  
    // simpan untuk InputData
    localStorage.setItem(
      "pendingSignUp",
      JSON.stringify({ email, password })
    )
    navigate("/input-data")
  }
  

  const handleGoogleSignup = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const idToken = await user.getIdToken();
      localStorage.setItem("token", idToken);

      const res = await axios.post("/api/auth/login", { idToken });
      const fullUser = {
        email: res.data.email,
        name: user.displayName || res.data.nama || "Cacing Pintar",
        jenjang: res.data.jenjang, 
      };

      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));

      if (!fullUser.jenjang) {
        navigate("/input-data-google", { replace: true });
      } else {
        const userSlug = fullUser.name?.toLowerCase().replace(/\s+/g, "-");
        navigate(`/${userSlug}`, { replace: true });
      }
    } catch (err) {
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 bg-white">
      {/* Logo */}
      <div className="w-[95px] h-[95px] mb-[32px]">
        <Logo />
      </div>

      {/* Heading */}
      <h1 className="text-[32px] font-bold text-center text-black mb-4">Create Your Account</h1>
      <p className="text-[14px] text-gray-600 text-center mb-6">
        Note: Create an account to access all features of our service
      </p>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-[352px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSignup} className="w-full max-w-[352px] flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="border border-black/25 px-4 py-3 text-[16px] rounded"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-black/25 px-4 py-3 text-[16px] rounded pr-[60px]"
            required
          />
          <button
            type="button"
            className="absolute text-sm text-gray-600 transform -translate-y-1/2 right-3 top-1/2 hover:text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#128455] text-white py-3 rounded hover:bg-[#0f6a44] transition-colors"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      {/* Redirect to Login */}
      <div className="flex gap-2 mt-4 mb-6 text-sm text-gray-600">
        <span>Already have an account?</span>
        <Link to="/login" className="text-black hover:underline">Login</Link>
      </div>

      <Separator />

      {/* Google Signup */}
      <div className="mt-6 w-full max-w-[352px]">
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="flex items-center justify-center w-full gap-3 py-3 transition-colors border rounded border-black/25 hover:bg-gray-100"
        >
            <svg alt="Google logo" className="w-5 h-5" viewBox="0 0 533.5 544.3" >
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95.1h147.1c-6.4 34.5-25.1 63.7-53.6 83.2v68h86.5c50.5-46.5 81.5-115.1 81.5-196.1z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c72.9 0 134.1-24.2 178.7-65.5l-86.5-68c-24 16.2-54.8 25.8-92.2 25.8-70.9 0-131-47.9-152.5-112.2H31.8v70.7c44.9 89.1 137.1 149.2 240.2 149.2z"
            />
            <path
              fill="#fbbc04"
              d="M119.5 324.4c-10.1-30-10.1-62.5 0-92.5V161.2H31.8c-43.9 87.8-43.9 191.9 0 279.7l87.7-70.5z"
            />
            <path
              fill="#ea4335"
              d="M272 107.7c39.6-.6 77.8 13.9 107.2 40.9l80.2-80.2C411.7 25.3 344.1-1.1 272 0 168.9 0 76.7 60.1 31.8 149.2l87.7 70.5C141 155.6 201.1 107.7 272 107.7z"
            />
          </svg>
          <span className="text-sm text-black">Sign up with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Signup

