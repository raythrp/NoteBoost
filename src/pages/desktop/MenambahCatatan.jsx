import React, { useState } from "react";
import Navbar from "../../components/desktop/NavbarDesktop";
import SidebarDesktop from "../../components/desktop/SidebarDesktop";

export default function MenambahCatatan() {
  const [kelas, setKelas] = useState("");
  const [mataPelajaran, setMataPelajaran] = useState("");
  const [showPage, setShowPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]); // Menyimpan daftar catatan

  // Fungsi untuk menambah catatan baru
  const handleNewNotesClick = () => {
    setShowModal(true);
  };

  // Fungsi untuk menyimpan catatan baru
  const handleOkClick = () => {
    if (kelas && mataPelajaran) {
      setNotes((prevNotes) => [
        ...prevNotes,
        { id: Date.now(), kelas, mataPelajaran, content: "" },
      ]);
      setShowModal(false);
      setShowPage(true);
    } else {
      alert("Mohon isi kelas dan mata pelajaran.");
    }
  };

  // Fungsi untuk memperbarui catatan setelah diedit
  const handleUpdateNotes = (updatedNotes) => {
    setNotes(updatedNotes);
  };

  // Fungsi untuk memperbarui konten langsung dari halaman utama
  const handleContentChange = (id, newContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
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
        <SidebarDesktop
          onNewNotesClick={handleNewNotesClick} // Fungsi tambah catatan
          notes={notes} // Kirim daftar catatan
          onUpdateNotes={handleUpdateNotes} // Fungsi update catatan
        />

        {/* Main Area */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-800 opacity-20 z-0 pointer-events-none"></div>

          <div className="relative z-10 p-6 text-white">
            {/* Modal Tambah Catatan */}
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
                    <button
                      onClick={() => setShowModal(false)} // Tutup modal
                      className="bg-red-600 hover:bg-red-700 w-[48%] p-2 rounded font-bold"
                    >
                      Keluar
                    </button>
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
                  {notes.map((note, index) => (
                    <div key={note.id} className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Page {index + 1}</span>
                        <strong>Enhance</strong>
                      </div>
                      <hr className="mb-4 border-gray-300" />
                      <h2 className="text-xl font-bold mb-2">
                        Kelas {note.kelas}
                      </h2>
                      <h3 className="text-lg font-semibold mb-1">
                        {note.mataPelajaran}
                      </h3>
                      <textarea
                        value={note.content}
                        onChange={(e) =>
                          handleContentChange(note.id, e.target.value)
                        }
                        className="w-full p-2 rounded border mb-4 h-32 resize-none"
                      ></textarea>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}