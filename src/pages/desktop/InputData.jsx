"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import Logo from "../../components/desktop/Logo"

const InputData = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [education, setEducation] = useState("")
  const { updateUserProfile } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUserProfile({ name, education })
    navigate("/")
  }

  const educationOptions = ["SMP", "SMA"]

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl animate-slide-up">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-[95px] h-[95px]">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-black mb-8 font-['Inter']">
          DATA DIRI
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black font-['Inter']">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Input Nama"
              required
              className="w-full px-4 py-2 text-lg font-normal border rounded-md border-black/25"
            />
          </div>

          {/* Jenjang Pendidikan */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black font-['Inter']">Jenjang Pendidikan</label>
            <div
              className="relative px-4 py-2 border rounded-md cursor-pointer border-black/25"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-lg font-normal">{education || "Input Jenjang Pendidikan"}</span>
              <svg
                className="absolute transform -translate-y-1/2 right-4 top-1/2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#1D1B20"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Dropdown options */}
              {showDropdown && (
                <div className="absolute left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-md top-full">
                  {educationOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setEducation(option)
                        setShowDropdown(false)
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#128455] hover:bg-[#0f6a44] text-white py-3 rounded-md text-lg font-semibold button-shadow transition-colors mt-4"
          >
            OK
          </button>
        </form>
      </div>
    </div>
  )
}

export default InputData
