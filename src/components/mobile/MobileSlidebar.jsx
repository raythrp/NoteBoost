"use client"

import { Link } from "react-router-dom"
import { X, Home, BookOpen, Settings, HelpCircle, Info, Moon, Sun } from "lucide-react"
import { useTheme } from "../hooks/useTheme"

function MobileSidebar({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Notes App</h2>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100" aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center px-2 py-2 rounded-md hover:bg-gray-100" onClick={onClose}>
                <Home className="w-5 h-5 mr-3 text-gray-500" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/notes" className="flex items-center px-2 py-2 rounded-md hover:bg-gray-100" onClick={onClose}>
                <BookOpen className="w-5 h-5 mr-3 text-gray-500" />
                <span>My Notes</span>
              </Link>
            </li>
            <li>
              <Link to="/create" className="flex items-center px-2 py-2 rounded-md hover:bg-gray-100" onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Note</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center px-2 py-2 rounded-md hover:bg-gray-100"
                onClick={onClose}
              >
                <Settings className="w-5 h-5 mr-3 text-gray-500" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>

          <div className="pt-4 mt-8 border-t">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 mr-3 text-gray-500" />
                ) : (
                  <Sun className="w-5 h-5 mr-3 text-gray-500" />
                )}
                <span>Dark Mode</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                  theme === "dark" ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span className="sr-only">Toggle dark mode</span>
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    theme === "dark" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="flex items-center px-2 py-2 rounded-md hover:bg-gray-100" onClick={onClose}>
                  <HelpCircle className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Help & Support</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center px-2 py-2 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <Info className="w-5 h-5 mr-3 text-gray-500" />
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default MobileSidebar

