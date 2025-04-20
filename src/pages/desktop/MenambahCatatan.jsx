import React, { useState } from "react";
import Navbar from "../../components/desktop/NavbarDesktop";
import SidebarDesktop from "../../components/desktop/SidebarDesktop";

export default function MenambahCatatan() {
  const [kelas, setKelas] = useState("");
  const [mataPelajaran, setMataPelajaran] = useState("");
  const [showPage, setShowPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]); // Menyimpan daftar catatan

  const handleNewNotesClick = () => {
    setShowModal(true);
  };

  const handleOkClick = () => {
    if (kelas && mataPelajaran) {
      // Tambahkan catatan baru ke daftar notes
      setNotes((prevNotes) => [
        ...prevNotes,
        { id: Date.now(), kelas, mataPelajaran },
      ]);

      setShowModal(false);
      setShowPage(true);
    } else {
      alert("Mohon isi kelas dan mata pelajaran.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-500 to-blue-800">
      {/* Background Bubbles */}
      <div className="absolute w-[300px] h-[300px] bg-white bg-opacity-20 rounded-full top-[20%] left-[10%] z-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-white bg-opacity-20 rounded-full bottom-[10%] right-[15%] z-0"></div>

      {/* Navbar */}
      <Navbar />

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <SidebarDesktop onNewNotesClick={handleNewNotesClick} notes={notes} />

        {/* Main Area */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-800 opacity-20 z-0 pointer-events-none"></div>

          <div className="relative z-10 p-6 text-white">
            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
                <div className="bg-[#134074] text-white p-8 rounded-md w-[400px] shadow-lg relative">
                  <h2 className="text-xl font-bold mb-4 text-center">
                    📝 NOTEBOOST
                  </h2>
                  <label className="block mb-2">Pilih Kelas</label>
                  <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="w-full p-2 rounded text-black mb-4"
                  >
                    <option value="">Masukkan Kelas Anda</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>

                  <label className="block mb-2">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={mataPelajaran}
                    onChange={(e) => setMataPelajaran(e.target.value)}
                    placeholder="Tulis Nama Pelajaran"
                    className="w-full p-2 rounded text-black mb-4"
                  />

                  <div className="flex justify-between">
                    {/* Tombol Keluar */}
                    <button
                      onClick={() => setShowModal(false)} // Tutup modal
                      className="bg-red-600 hover:bg-red-700 w-[48%] p-2 rounded font-bold"
                    >
                      Keluar
                    </button>

                    {/* Tombol OK */}
                    <button
                      onClick={handleOkClick}
                      className="bg-green-600 hover:bg-green-700 w-[48%] p-2 rounded font-bold"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Halaman putih setelah OK */}
            {showPage && (
              <div className="flex justify-center items-center h-full">
                <div className="bg-white w-[700px] h-[85%] rounded-md shadow-2xl p-8 text-black overflow-y-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Page 1</span>
                    <strong>Enhance</strong>
                  </div>
                  <hr className="mb-4 border-gray-300" />
                  <h2 className="text-xl font-bold mb-2">Kelas {kelas}</h2>
                  <h3 className="text-lg font-semibold mb-1">
                    {mataPelajaran}
                  </h3>

                  {/* Area editable catatan */}
                  <div
                    contentEditable
                    className="mt-4 min-h-[300px] border-t border-gray-300 pt-2 outline-none"
                    placeholder="Tulis catatanmu di sini..."
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
