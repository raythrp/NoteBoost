import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function CatatanMobile() {
  const location = useLocation();
  const { kelas, mataPelajaran } = location.state || {};

  const [sidebarOpen, setSidebarOpen] = useState(false); // State untuk mengontrol sidebar
  const [lessons, setLessons] = useState(["Negosiasi", "Fisika Kuantum", "Vektor"]); // Daftar pelajaran
  const [selectedLesson, setSelectedLesson] = useState(mataPelajaran || ""); // Pelajaran yang dipilih

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddLesson = () => {
    const newLesson = prompt("Masukkan nama pelajaran baru:");
    if (newLesson) {
      setLessons([...lessons, newLesson]);
    }
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setSidebarOpen(false); // Tutup sidebar setelah memilih pelajaran
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 p-4 relative">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="absolute top-0 left-0 w-[250px] h-full bg-white shadow-lg z-20 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Daftar Pelajaran</h2>
          <ul className="space-y-4">
            {lessons.map((lesson, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-3 rounded shadow hover:bg-gray-200 cursor-pointer"
              >
                <div
                  className="flex-1"
                  onClick={() => handleSelectLesson(lesson)}
                >
                  <p className="text-gray-800 font-semibold">{lesson}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  ⋮
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleAddLesson}
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tambah Pelajaran
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-white p-2 rounded shadow">
        <button
          className="text-gray-800 font-bold text-lg"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className="text-gray-800 text-lg font-bold">Notes</h1>
        <button className="text-gray-800 font-bold text-lg">Enhance</button>
      </div>

      {/* Page 1 */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-sm font-bold mb-2">Page 1</h2>
        <p className="text-gray-800 mb-1">Kelas: {kelas || "Tidak ada data"}</p>
        <p className="text-gray-800 mb-4">
          Pelajaran: {selectedLesson || "Tidak ada data"}
        </p>
        <div
          contentEditable
          className="min-h-[300px] border border-gray-300 rounded p-2 outline-none"
          placeholder="Tulis catatanmu di sini..."
        ></div>
      </div>
    </div>
  );
}