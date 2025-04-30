import React from "react";
import { FiMenu } from "react-icons/fi"; // Ikon menu dari react-icons
import { useNotes } from "../../contexts/NoteContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CatatanMobile() {
  const { notes, setNotes } = useNotes(); // Ambil daftar catatan dari context
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk mengupdate konten catatan
  const handleContentChange = (newContent) => {
    const updatedNotes = newContent.split("\n").map((content, index) => ({
      ...notes[index],
      content,
    }));
    setNotes(updatedNotes);
  };

  // Gabungkan semua catatan menjadi satu string
  const combinedNotes = notes.map((note) => note.content).join("\n");

  const handleMenuClick = () => {
    navigate("/"); // Arahkan ke halaman home
  };

  const handleEnhanceClick = () => {
    console.log("Enhance clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 p-4">
      {/* Navbar */}
      <div className="flex items-center bg-white p-4 shadow-md rounded-lg">
        {/* Ikon Menu dan Teks Notes */}
        <div className="flex items-center space-x-2">
          <button onClick={handleMenuClick} className="text-gray-800 text-2xl">
            <FiMenu />
          </button>
          <h1 className="text-gray-800 text-lg font-bold">Notes</h1>
        </div>

        {/* Tombol Enhance */}
        <button
          onClick={handleEnhanceClick}
          className="text-blue-500 font-semibold ml-auto"
        >
          Enhance
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md p-4 text-black overflow-y-auto mt-4 max-h-[75vh]">
        {notes.length > 0 ? (
          <div>
            {/* Input Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Kelas</label>
              <input
                type="text"
                value={notes[0].kelas || "Kelas tidak tersedia"}
                readOnly
                className="w-full p-2 rounded border bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Mata Pelajaran
              </label>
              <input
                type="text"
                value={notes[0].mataPelajaran || "Mata pelajaran tidak tersedia"}
                readOnly
                className="w-full p-2 rounded border bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Topik</label>
              <input
                type="text"
                value={notes[0].topic || "Topik tidak tersedia"}
                readOnly
                className="w-full p-2 rounded border bg-gray-100"
              />
            </div>

            {/* Single Editable Note Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Catatan</label>
              <textarea
                className="w-full p-2 rounded border h-64 resize-none"
                placeholder="Tulis catatan Anda di sini..."
              ></textarea>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada catatan yang tersedia.
          </p>
        )}
      </div>
    </div>
  );
}