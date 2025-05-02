import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/mobile/NavbarMobile";
import NoteCard from "../../components/NoteCard";
import AddNoteButton from "../../components/mobile/AddNoteButtonMobile";
import PageIndicator from "../../components/PageIndicator";
import { useNotes } from "../../contexts/NoteContext";

function HomePage() {
  const navigate = useNavigate();
  const { notes, deleteNote, loading } = useNotes();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil((notes?.length || 0) / itemsPerPage);

  const handleEdit = (id) => {
    navigate(`/catatan/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
  };

  const handlePageChange = (page) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  const paginatedNotes = Array.isArray(notes)
    ? notes
        .slice()
        .reverse()
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  return (
    <main className="min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="container px-4 py-8 mx-auto content-container" style={{ userSelect: "none" }}>
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
              className="grid gap-4 sm:grid-cols-1"
            >
              {paginatedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Page controls: arrows + dots */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-2 mt-6">
          <div className="flex gap-16">
            <button
              onClick={() => {
                if (currentPage > 0) {
                  setDirection(-1);
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              disabled={currentPage === 0}
              className="text-3xl px-4 py-2 text-white bg-blue-600 rounded-full disabled:opacity-50"
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
              className="text-3xl px-4 py-2 text-white bg-blue-600 rounded-full disabled:opacity-50"
            >
              →
            </button>
          </div>

          <PageIndicator
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <AddNoteButton />
    </main>
  );
}

export default HomePage;