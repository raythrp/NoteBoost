import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/desktop/NavbarDesktop';
import NoteCard from '../../components/NoteCard';
import AddNoteButton from '../../components/desktop/AddNoteButtonDesktop';
import PageIndicator from '../../components/PageIndicator';
import { useNotes } from '../../contexts/NoteContext';
import { getNotes } from '../../services/noteService';
import { Search } from 'lucide-react';
import LinkYoutube from '../linkYoutube';

function HomePage() {
  const navigate = useNavigate();
  const { notes, deleteNote, loading } = useNotes();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [direction, setDirection] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleEdit = (id) => {
    navigate(`/catatan/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Balik urutan notes agar yang terbaru tampil dulu
  const filteredNotes = Array.isArray(notes)
  ? notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);
  
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(filteredNotes.length / itemsPerPage) - 1);
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [filteredNotes.length]);

  const paginatedNotes = filteredNotes
    .slice()
    .reverse()
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);

  useEffect(() => {
    const hasClosedPopup = localStorage.getItem("popupClosed");
    
    const fetchNotes = async () => {
      const allNotes = await getNotes();
      if (allNotes.length === 0 && !hasClosedPopup && !loading) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    fetchNotes();
  }, [loading]);


  return (
    <main className="flex flex-col w-full min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="relative mb-4 max-w-md mx-auto mt-6">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search notes by title..."
          className="w-full pl-10 pr-4 py-2 text-sm border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div 
        className="flex-1 w-full max-w-screen-xl px-4 py-6 mx-auto sm:px-6 lg:px-8 ">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-xl text-white">Loading notes...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {paginatedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    onEdit={handleEdit}
                    content={note.content}
                    onDelete={handleDelete}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
      </div>

      {/* Page Indicator dinamis */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-2 mt-6">
          {/* Arrow buttons on top */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (currentPage > 0) {
                  setDirection(-1);
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              disabled={currentPage === 0}
              className="px-3 py-1 text-white bg-blue-600 rounded-full disabled:opacity-50"
            >
              ←
            </button>

            <button
              onClick={() => {
                if (currentPage < totalPages - 1) {
                  setDirection(1);
                  setCurrentPage((prev) => prev + 1);
                }
              }}
              disabled={currentPage >= totalPages - 1}
              className="px-3 py-1 text-white bg-blue-600 rounded-full disabled:opacity-50"
            >
              →
            </button>
          </div>

          {/* Dots below the arrows */}
          <PageIndicator
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => {
              setDirection(page > currentPage ? 1 : -1);
              handlePageChange(page);
            }}
          />
        </div>
      )}

      {/* Tombol tambah catatan */}
      <AddNoteButton />
       {/* Show popup if no notes */}
       {showPopup && (
        <LinkYoutube
          onClose={() => setShowPopup(false)}
        />
      )}
    </main>
  );
}

export default HomePage;
