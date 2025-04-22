"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function EmailForgotPassword({ onClose }) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Handle ESC key press to close modal
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    // Prevent scrolling when modal is open
    window.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setMessage("Please enter your email address")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store email in localStorage for the confirmation page
      localStorage.setItem("resetEmail", email)

      // Navigate to the forgot password confirmation page with email as query param
      navigate(`/forgotpassword?email=${encodeURIComponent(email)}`)
    } catch (error) {
      setMessage("An error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  // Prevent clicks inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Container */}
      <div
        className="relative w-[755px] h-[509px] bg-[#215273] border border-black shadow-lg overflow-hidden"
        onClick={handleModalClick}
      >
        {/* Background Decorations - moved to the back with lower z-index */}
        <div className="absolute w-[350px] h-[350px] left-[-91px] bottom-[-90px] rounded-full bg-gradient-to-br from-[#215273] to-[#607B81] opacity-50 z-0" />
        <div className="absolute w-[350px] h-[350px] left-[47px] bottom-[-150px] rounded-full bg-gradient-to-br from-[#ACDCE7] to-[#607B81] opacity-50 z-0" />

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          className="absolute z-10 flex items-center justify-center w-8 h-8 text-white transition-all duration-150 rounded-full cursor-pointer top-2 right-2 bg-white/10 hover:bg-white/30 active:scale-95"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content - added z-10 to ensure it's above the background circles */}
        <div className="flex flex-col items-center pt-[54px] relative z-10">
          {/* Heading */}
          <h2 className="text-[39px] font-bold text-white text-center leading-[47px] w-full">Reset Password</h2>

          {/* Description */}
          <p className="w-[458px] text-[16px] text-white text-center mt-[14px]">
            Kita akan memeberikan link ke E-mail untuk resset password
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-16 w-[352px]">
            <div className="mb-2">
              <label htmlFor="email" className="block text-white text-[16px] text-center mb-1">
                E-mail Address
              </label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukan Email"
                className="w-full h-[52px] px-4 text-[20px] text-black bg-white"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[52px] mt-6 bg-[#ECE2D0] rounded-md text-[20px] text-black shadow-md hover:bg-[#e5d9c2] transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-black animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>

            {/* Message */}
            {message && (
              <div className="w-full p-3 mt-6 text-center text-white rounded bg-white/10 animate-fadeIn">{message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmailForgotPassword
