import React from "react";
import { FiMenu } from "react-icons/fi"; // Ikon menu dari react-icons
import { useNotes } from "../../contexts/NoteContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CatatanMobile() {
  const { notes, setNotes } = useNotes(); // Ambil daftar catatan dari context
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk mengupdate konten catatan
  const handleContentChange = (id, newContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  const handleMenuClick = () => {
    navigate("/add"); // Arahkan ke halaman AddNotePage
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
          notes.map((note, index) => (
            <div key={note.id} className="mb-6">
              {/* Header */}
              <div className="flex justify-between text-sm mb-2">
                <span>Page {index + 1}</span>
              </div>
              <hr className="mb-4 border-gray-300" />

              {/* Input Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Kelas</label>
                <input
                  type="text"
                  value={note.kelas || "Kelas tidak tersedia"}
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
                  value={note.mataPelajaran || "Mata pelajaran tidak tersedia"}
                  readOnly
                  className="w-full p-2 rounded border bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Topik</label>
                <input
                  type="text"
                  value={note.topic || "Topik tidak tersedia"}
                  readOnly
                  className="w-full p-2 rounded border bg-gray-100"
                />
              </div>

              {/* Editable Note Content */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Catatan</label>
                <textarea
                  value={note.content || ""}
                  onChange={(e) =>
                    handleContentChange(note.id, e.target.value)
                  }
                  className="w-full p-2 rounded border h-32 resize-none"
                  placeholder="Tulis catatan Anda di sini..."
                ></textarea>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada catatan yang tersedia.
          </p>
        )}
      </div>
    </div>
  );
}