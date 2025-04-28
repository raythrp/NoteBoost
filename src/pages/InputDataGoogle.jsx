"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import Logo from "../components/icons/Logo";
import { updateUserProfile } from "../utils/authService"; // Untuk update profil di server

const InputDataGoogle = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();  
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const educationOptions = ["SMP", "SMA"];
  const [showDropdown, setShowDropdown] = useState(false);
  const BASE_URL = "https://noteboost-serve-772262781875.asia-southeast2.run.app";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setName(user.name); // Ambil nama dari localStorage jika ada
    } else {
      navigate("/signup"); // Jika tidak ada user, arahkan ke signup
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!education) {
      setError("Jenjang pendidikan harus diisi.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
      `${BASE_URL}/api/auth/update-jenjang`,  
        { email: user.email, jenjang: education },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      localStorage.setItem("user", JSON.stringify({ ...user, jenjang: education }));
      setUser({ ...user, jenjang: education });
      if (res.data.message === "Jenjang berhasil diperbarui") {
        const userSlug = user.name?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
        navigate(`/${userSlug || user.email}`, { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex justify-center mb-4">
          <Logo className="w-[95px] h-[95px]" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">Isi Data Pengguna</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="relative">
            <label className="block mb-1 font-semibold">Jenjang Pendidikan</label>
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
                        setEducation(opt);
                        setShowDropdown(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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
  );
};

export default InputDataGoogle;
