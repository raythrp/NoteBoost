"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./../contexts/AuthContext"
import Logo from "../components/icons/Logo"
import { registerUser } from "../utils/authService";

const InputData = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [education, setEducation] = useState("")
  const { updateUserProfile } = useAuth()
  const [isGoogle, setIsGoogle] = useState(false)
  const [pending, setPending] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const educationOptions = ["SMP", "SMA"]
  
  useEffect(() => {
    const pSign = localStorage.getItem("pendingSignUp")
    const pGoogle = localStorage.getItem("pendingGoogle")

    if (pSign) {
      setPending(JSON.parse(pSign))
    } else if (pGoogle) {
      setPending({ email: pGoogle })
      setIsGoogle(true)
    } else {
      navigate("/signup")
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    console.log("Submitting Data:", { name, education, isGoogle, pending })

    if (!name.trim() || !education) {
      setError("Nama & jenjang wajib diisi.")
      return
    }

    setLoading(true)
    try {
      if (isGoogle) {
        // Google flow: update profile in context
        updateUserProfile({ nama: name, jenjang: education })
        localStorage.removeItem("pendingGoogle")
        navigate("/")         // immediately go home
      } else {
        // Email/password: register via backend
        const { email, password } = pending
        const res = await registerUser({
          email,
          password,
          nama: name,
          jenjang: education,
        })

        if (res.success) {
          localStorage.removeItem("pendingSignUp")
          navigate("/login?verificationSent=true")
        } else {
          setError(res.error)
        }
      }
    } catch (err) {
      console.error(err)
      setError("Terjadi kesalahan, silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo className="w-[95px] h-[95px]" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">DATA DIRI</h1>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Input Nama"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Education */}
          <div className="relative">
            <label className="block mb-1 font-semibold">
              Jenjang Pendidikan
            </label>
            <div
              className="relative px-4 py-2 border rounded cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{education || "Pilih Jenjang Pendidikan"}</span>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {showDropdown && (
                <div className="absolute left-0 right-0 mt-1 bg-white border rounded">
                  {educationOptions.map((opt) => (
                    <div
                      key={opt}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setEducation(opt)
                        setShowDropdown(false)
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {loading ? "Submitting…" : "OK"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default InputData
