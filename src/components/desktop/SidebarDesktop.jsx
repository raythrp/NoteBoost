import { useState } from "react";
import { LayoutPanelLeft } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi

export default function Sidebar({ onNewNotesClick, notes }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-100 border-r flex flex-col p-2 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between bg-white border rounded px-2 py-1">
          {isOpen && (
            <button
              onClick={onNewNotesClick} // Panggil fungsi dari komponen induk
              className="text-sm font-medium text-gray-700"
            >
              + New Notes
            </button>
          )}
          <LayoutPanelLeft
            className="w-4 h-4 text-gray-500 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        {/* Navigasi Halaman
        <div className="mt-4">
          <Link
            to="/"
            className="block bg-white p-2 mb-2 rounded shadow text-sm text-gray-700 hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to="/add-note"
            className="block bg-white p-2 mb-2 rounded shadow text-sm text-gray-700 hover:bg-gray-200"
          >
            Tambah Catatan
          </Link>
          <Link
            to="/edit-note"
            className="block bg-white p-2 mb-2 rounded shadow text-sm text-gray-700 hover:bg-gray-200"
          >
            Edit Catatan
          </Link>
        </div> */}

        {/* Daftar Catatan */}
        <div className="mt-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-2 mb-2 rounded shadow text-sm flex justify-between items-center"
            >
              <span>{note.mataPelajaran}</span>
              <button className="text-gray-500 hover:text-gray-700">...</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}