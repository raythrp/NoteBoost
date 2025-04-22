import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenambahCatatanMobile() {
  const [kelas, setKelas] = useState("");
  const [mataPelajaran, setMataPelajaran] = useState("");
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleOkClick = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (kelas && mataPelajaran) {
      // Navigasi ke halaman CatatanMobile
      navigate("/catatan", { state: { kelas, mataPelajaran } });
    } else {
      alert("Mohon isi kelas dan mata pelajaran.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e3a5f] relative overflow-hidden">
      {/* Lingkaran Transparan */}
      <div className="absolute w-[200px] h-[200px] bg-white rounded-full opacity-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl" />

      <div className="z-10 w-[90%] max-w-sm p-6 bg-transparent rounded-lg flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-white text-3xl mb-1">📄</div>
          <h1 className="text-white text-lg font-bold tracking-wide">
            NOTEBOOST
          </h1>
        </div>

        {/* Form */}
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-white mb-2">Pilih Kelas</label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Masukkan Kelas Anda</option>
              <option value="7">Kelas 7</option>
              <option value="8">Kelas 8</option>
              <option value="9">Kelas 9</option>
              <option value="10">Kelas 10</option>
              <option value="11">Kelas 11</option>
              <option value="12">Kelas 12</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Mata Pelajaran</label>
            <input
              type="text"
              value={mataPelajaran}
              onChange={(e) => setMataPelajaran(e.target.value)}
              placeholder="Tulis Nama Pelajaran"
              className="w-full px-4 py-2 rounded bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleOkClick}
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
          >
            OK
          </button>
        </form>
      </div>
    </div>
  );
}