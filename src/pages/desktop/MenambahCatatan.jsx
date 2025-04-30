import React from "react";
import Navbar from "../../components/desktop/NavbarDesktop";
import SidebarDesktop from "../../components/desktop/SidebarDesktop";
import { useNotes } from "../../contexts/NoteContext";

export default function MenambahCatatan() {
  const { notes, setNotes } = useNotes(); // Ambil daftar catatan dari context

  // Fungsi untuk mengupdate konten catatan
  const handleContentChange = (newContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === 0 ? { ...note, content: newContent } : note
      )
    );
  };

  // Gabungkan semua catatan menjadi satu string
  const combinedNotes = notes.map((note) => note.content).join("\n");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-800">
      {/* Background Bubbles */}
      <div className="absolute w-[300px] h-[300px] bg-white bg-opacity-20 rounded-full top-[20%] left-[10%] z-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-white bg-opacity-20 rounded-full bottom-[10%] right-[15%] z-0"></div>

      {/* Navbar */}
      <Navbar />

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <SidebarDesktop notes={notes} />

        {/* Main Area */}
        <div className="relative flex-1 overflow-hidden">
          <div className="relative z-10 flex flex-col h-full p-6 text-white">
            <div className="flex items-center justify-center flex-grow">
              <div className="bg-white w-[700px] h-full max-h-[85%] rounded-md shadow-2xl p-8 text-black overflow-y-auto">
                {notes.length > 0 ? (
                  <div>
                    {/* Header */}
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Catatan</span>
                      <button className="font-semibold text-blue-500">
                        Enhance
                      </button>
                    </div>
                    <hr className="mb-4 border-gray-300" />

                    {/* Input Fields */}
                    <div className="mb-4">
                      <input
                        type="text"
                        value={notes[0].kelas || "Kelas tidak tersedia"}
                        readOnly
                        className="w-full p-2 bg-gray-100 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={
                          notes[0].mataPelajaran ||
                          "Mata pelajaran tidak tersedia"
                        }
                        readOnly
                        className="w-full p-2 bg-gray-100 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={notes[0].topic || "Topik tidak tersedia"}
                        readOnly
                        className="w-full p-2 bg-gray-100 border rounded"
                      />
                    </div>

                    {/* Single Editable Note Content */}
                    <div className="mb-4">
                      <label className="block mb-1 text-sm font-medium">
                        Catatan
                      </label>
                      <textarea
                        className="w-full h-64 p-2 border rounded resize-none"
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
          </div>
        </div>
      </div>
    </div>
  );
}