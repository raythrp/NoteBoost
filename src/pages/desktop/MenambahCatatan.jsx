import React, { useState } from "react";
import Navbar from "../../components/desktop/NavbarDesktop";
import SidebarDesktop from "../../components/desktop/SidebarDesktop";
import { useNotes } from "../../contexts/NoteContext";

export default function MenambahCatatan() {
  const { notes, setNotes } = useNotes(); // Ambil daftar catatan dari context
  const [content, setContent] = useState(notes[0]?.content || ""); // Konten catatan

  // Fungsi untuk mengupdate konten catatan
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === 0 ? { ...note, content: newContent } : note
      )
    );
  };

  // Fungsi untuk membagi teks menjadi halaman berdasarkan jumlah baris
  const splitIntoPages = (text, maxLinesPerPage) => {
    const lines = text.split("\n"); // Pisahkan teks menjadi baris
    const pages = [];

    for (let i = 0; i < lines.length; i += maxLinesPerPage) {
      pages.push(lines.slice(i, i + maxLinesPerPage).join("\n"));
    }

    return pages;
  };

  // Tentukan jumlah baris maksimum per halaman (misalnya, 25 baris per halaman)
  const maxLinesPerPage = 25;

  // Bagi konten menjadi halaman
  const pages = splitIntoPages(content, maxLinesPerPage);

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

                    {/* Editable Note Content */}
                    <div className="space-y-8">
                      {pages.map((page, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 rounded-md p-4 shadow-md bg-white"
                          style={{
                            height: "800px", // Tinggi halaman
                            overflow: "hidden", // Sembunyikan teks yang melebihi batas
                            pageBreakAfter: "always", // Pisahkan halaman
                          }}
                        >
                          <textarea
                            className="w-full h-full p-2 border-none resize-none outline-none"
                            // value={page}
                            // onChange={(e) => {
                            //   const updatedPages = [...pages];
                            //   updatedPages[index] = e.target.value;
                            //   setContent(updatedPages.join("\n"));
                            // }}
                            placeholder="Tulis catatan Anda di sini..."
                            style={{
                              height: "100%",
                              overflow: "hidden", // Sembunyikan teks yang melebihi batas
                              lineHeight: "1.5", // Tinggi baris
                            }}
                          ></textarea>
                        </div>
                      ))}
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