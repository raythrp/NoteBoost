"use client"
import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import Logo from "../components/icons/Logo"
import { useAuth } from "../contexts/AuthContext"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ForgotPassword from "./ForgotPassword"

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginUser, user, setUser } = useAuth();
  const params = new URLSearchParams(location.search)
  const justSignedUp = params.get("verificationSent") === "true"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (justSignedUp) {
      setSuccessMessage(
        "Email verification sent! Please check your inbox."
      )
    }
  }, [justSignedUp])

  useEffect(() => {
    window.onerror = (msg, url, line, col, err) => {
      console.error("Runtime Error:", msg, "at", url)
      setErrorMessage("An application error occurred.")
    }
  }, [])

  const redirectToUserPage = (displayNameOrEmail) => {
    const slug = displayNameOrEmail?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "") || "user"
    navigate(`/${slug}`, { replace: true })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (email && password) {
      // Login with email/password
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        if (!user.emailVerified) {
          await signOut(auth)
          setErrorMessage("Email not verified. Please check your inbox.")
          return;
        }

        const idToken = await user.getIdToken()
        localStorage.setItem("token", idToken)

        const res = await axios.post("/api/auth/login", { idToken })
        const fullUser = {
          email: res.data.email,
          name: user.displayName || res.data.nama || "Smart User",
          jenjang: res.data.jenjang || "Not Available",
        }

        setUser(fullUser)  // Set user in context
        localStorage.setItem("user", JSON.stringify(fullUser))

        if (res.data.needsAdditionalInfo) {
          navigate("/input-data", { replace: true });
        } else {
          const userSlug = fullUser.name?.toLowerCase().replace(/\s+/g, "-");
          if (userSlug) {
            navigate(`/${userSlug}`, { replace: true });
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        let msg = "An error occurred. Please try again."
        const code = err.code || err?.response?.data?.error

        if (code === "auth/user-not-found") msg = "Account not found."
        else if (code === "auth/wrong-password") msg = "Incorrect password."
        else if (code === "auth/invalid-credential") msg = "Invalid email or password."
        else if (typeof code === "string") msg = code

        setErrorMessage(msg)
      }
    } else {
      // Login with Google
      try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        const idToken = await user.getIdToken()
        localStorage.setItem("token", idToken)

        const res = await axios.post("/api/auth/login", { idToken })
        const fullUser = {
          email: res.data.email,
          name: user.displayName || res.data.nama || "Smart User",
          jenjang: res.data.jenjang,
        }

        setUser(fullUser)  // Set user in context
        localStorage.setItem("user", JSON.stringify(fullUser))

        if (fullUser.jenjang === null) {
          navigate("/input-data-google", { replace: true });
        } else {
          const userSlug = fullUser.name?.toLowerCase().replace(/\s+/g, "-");
          navigate(`/${userSlug}`, { replace: true });
        }
      } catch (err) {
        setErrorMessage("Error. Try Again.");
        console.error("Error:", err);
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
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
        name: user.displayName || res.data.nama || "Smart User",
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
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openForgotPasswordModal = (e) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 bg-white">
      <div className="w-[95px] h-[95px] mb-[32px]">
        <Logo />
      </div>

      <h1 className="text-[39px] font-bold text-center text-black mb-8 w-[352px]">Welcome</h1>

      {/* Display success message if available */}
      {successMessage && (
        <div className="w-full max-w-[352px] mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="w-full max-w-[352px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="w-full max-w-[352px] flex flex-col gap-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="border border-black/25 px-4 py-3 text-[20px] h-[52px]"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-black/25 px-4 py-3 text-[20px] h-[52px] pr-[60px]"
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
          className="bg-[#128455] text-white py-3 h-[52px] text-[20px] rounded-md shadow-md hover:bg-[#0f6a44] transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Forgot Password - Changed to button that opens modal */}
      <div className="w-full max-w-[352px] flex justify-center mt-6">
        <button 
          onClick={openForgotPasswordModal} 
          className="text-[13px] text-black hover:underline cursor-pointer"
        >
          Forgot Password? Click Here
        </button>
      </div>

      <div className="flex gap-3 mt-4 mb-6 text-[13px] text-black w-[203px]">
        <span>Don't have an account?</span>
        <Link to="/signup" className="hover:underline">
          Sign up
        </Link>
      </div>

      <div className="w-full max-w-[352px] flex items-center my-6 relative">
        <div className="flex-1 border-t border-[#3A3A3B]"></div>
        <span className="px-4 text-[16px] text-[#3A3A3B]">OR</span>
        <div className="flex-1 border-t border-[#3A3A3B]"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex items-center justify-center gap-3 border border-black/20 px-4 py-3 rounded mt-2 w-full max-w-[352px] h-[52px] hover:bg-gray-50 transition"
      >
        {/* Google SVG Logo */}
        <svg className="w-6 h-6" viewBox="0 0 533.5 544.3">
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
        <span className="text-[16px] text-[#3A3A3B]">Continue with Google</span>
      </button>
      
      {/* Render the ForgotPassword modal when state is true */}
      {showForgotPasswordModal && <ForgotPassword onClose={closeForgotPasswordModal} email={email} />}
    </div>
  )
}

export default Login