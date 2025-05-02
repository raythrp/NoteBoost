import { useState } from "react";
import { LayoutPanelLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate

export default function SidebarDesktop({ notes, onUpdateNotes }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const { id } = useParams();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleNewNotesClick = () => {
    navigate("/add"); // Navigasi ke halaman /add
  };

  return (
    <div className="flex">
      <div
        className={`h-screen bg-gray-100 border-r flex flex-col p-2 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between bg-white border rounded px-2 py-1">
          {isOpen && (
            <button
              onClick={handleNewNotesClick} // Panggil handleNewNotesClick
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

        <div className="mt-4">
          {isOpen && notes.map((note) => (
            <button
              key={note.id}
              onClick={() => navigate(`/catatan/${note.id}`)}
              className={`w-full text-left p-2 mb-2 rounded shadow text-sm flex justify-between items-center transition 
                ${id === note.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              <span>{note.title}</span>
            </button>
          ))}
        </div>
      </div>

      {showEditModal && selectedNote && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white text-black p-8 rounded-md w-[400px] shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Catatan</h2>
            <label className="block mb-2">Mata Pelajaran</label>
            <input
              type="text"
              value={selectedNote.mataPelajaran}
              onChange={(e) =>
                setSelectedNote({ ...selectedNote, mataPelajaran: e.target.value })
              }
              className="w-full p-2 rounded border mb-4"
            />
            <label className="block mb-2">Konten</label>
            <textarea
              value={selectedNote.content || ""}
              onChange={(e) =>
                setSelectedNote({ ...selectedNote, content: e.target.value })
              }
              className="w-full p-2 rounded border mb-4 h-32 resize-none"
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-red-600 hover:bg-red-700 w-[48%] p-2 rounded font-bold text-white"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  const updatedNotes = notes.map((note) =>
                    note.id === selectedNote.id ? selectedNote : note
                  );
                  setShowEditModal(false);
                  onUpdateNotes(updatedNotes);
                }}
                className="bg-green-600 hover:bg-green-700 w-[48%] p-2 rounded font-bold text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}