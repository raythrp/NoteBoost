"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../components/icons/Logo"

function ForgotPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const [showBackConfirm, setShowBackConfirm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setMessage("")
      setLoading(true)
      // API to reset the password
      // demo, simulate a successful reset
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage("Password has been reset successfully. You can now login with your new password.")
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (error) {
      setError("Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    // If form is empty or not modified, go back directly
    if (!newPassword && !confirmPassword) {
      navigate("/login")
    } else {
      // Otherwise show confirmation popup
      setShowBackConfirm(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col items-center w-full max-w-md">
        {/* Logo */}
        <div className="w-[95px] h-[95px] mb-10">
          <Logo />
        </div>

        {/* Reset Password Text */}
        <h1 className="text-[39px] font-bold mb-10 text-center">Reset Password</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-[352px]">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-full max-w-[352px]">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-[352px] space-y-6">
          {/* New Password Input */}
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full h-[52px] px-4 text-[20px] border border-black/25"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full h-[52px] px-4 text-[20px] border border-black/25"
              required
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full h-[52px] bg-[#128455] text-white text-[20px] shadow-md rounded-md hover:bg-[#128455]/90 transition-colors"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset"}
          </button>
        </form>

        {/* Back to Login Button */}
        <div className="mt-6">
          <button onClick={handleBackToLogin} className="text-[#215273] font-medium hover:underline">
            Back to Login
          </button>
        </div>

        {/* Back to Login Confirmation Popup */}
        {showBackConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-[352px] shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Return to Login?</h3>
              <p className="mb-6 text-gray-600">
                Your password reset progress will be lost. Are you sure you want to go back to the login page?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowBackConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-[#215273] text-white rounded hover:bg-[#215273]/90"
                >
                  Yes, go back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
