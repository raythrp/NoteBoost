import React from "react";
import Navbar from "../../components/desktop/NavbarDesktop";
import SidebarDesktop from "../../components/desktop/SidebarDesktop";
import { useNotes } from "../../contexts/NoteContext";

export default function MenambahCatatan() {
  const { notes, setNotes } = useNotes(); // Ambil daftar catatan dari context

  // Fungsi untuk mengupdate konten catatan
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
        <SidebarDesktop notes={notes} />

        {/* Main Area */}
        <div className="flex-1 relative overflow-hidden">
          <div className="relative z-10 p-6 text-white h-full flex flex-col">
            <div className="flex justify-center items-center flex-grow">
              <div className="bg-white w-[700px] h-full max-h-[85%] rounded-md shadow-2xl p-8 text-black overflow-y-auto">
                {notes.length > 0 ? (
                  notes.map((note, index) => (
                    <div key={note.id} className="mb-6">
                      {/* Header */}
                      <div className="flex justify-between text-sm mb-2">
                        <span>Page {index + 1}</span>
                        <button className="text-blue-500 font-semibold">
                          Enhance
                        </button>
                      </div>
                      <hr className="mb-4 border-gray-300" />

                      {/* Input Fields */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Kelas
                        </label>
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
                        <label className="block text-sm font-medium mb-1">
                          Topik
                        </label>
                        <input
                          type="text"
                          value={note.topic || "Topik tidak tersedia"}
                          readOnly
                          className="w-full p-2 rounded border bg-gray-100"
                        />
                      </div>

                      {/* Editable Note Content */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Catatan
                        </label>
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
          </div>
        </div>
      </div>
    </div>
  );
}