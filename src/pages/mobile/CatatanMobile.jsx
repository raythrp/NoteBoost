import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Ikon menu dari react-icons
import { useNotes } from "../../contexts/NoteContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CatatanMobile() {
  const { notes, setNotes } = useNotes(); // Ambil daftar catatan dari context
  const navigate = useNavigate(); // Hook untuk navigasi
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

  // Tentukan jumlah baris maksimum per halaman (misalnya, 20 baris per halaman untuk mobile)
  const maxLinesPerPage = 20;

  // Bagi konten menjadi halaman
  const pages = splitIntoPages(content, maxLinesPerPage);

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

            {/* Editable Note Content */}
            <div className="space-y-8">
              {pages.map((page, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-md p-4 shadow-md bg-white"
                  style={{
                    height: "600px", // Tinggi halaman untuk mobile
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
  );
}