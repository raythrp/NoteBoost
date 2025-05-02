import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/desktop/NavbarDesktop';
import NoteCard from '../../components/NoteCard';
import AddNoteButton from '../../components/desktop/AddNoteButtonDesktop';
import PageIndicator from '../../components/PageIndicator';
import { useNotes } from '../../contexts/NoteContext';
import { useAuth } from "../../contexts/AuthContext"



function HomePage() {
  const navigate = useNavigate();
  const { notes, deleteNote, loading } = useNotes();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const { displayName } = useParams();
  const [direction, setDirection] = useState(0);

  const totalPages = Math.ceil((notes?.length || 0) / itemsPerPage);

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
  const paginatedNotes = Array.isArray(notes)
  ? notes
      .slice()
      .reverse()
      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  : [];

  return (
    <main className="flex flex-col w-full min-h-screen blue-gradient-bg">
      <Navbar />

      <div 
        style={{ userSelect: 'none' }}
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
    </main>
  );
}

export default HomePage;
