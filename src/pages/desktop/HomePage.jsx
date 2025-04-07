import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/desktop/Navbar';
import NoteCard from '../../components/desktop/NoteCard';
import AddNoteButton from '../../components/desktop/AddNoteButton';
import PageIndicator from '../../components/desktop/PageIndicator';
import { useNotes } from '../../contexts/NoteContext';

function HomePage() {
  const navigate = useNavigate();
  const { notes, deleteNote, loading } = useNotes();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(notes.length / itemsPerPage);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Balik urutan notes agar yang terbaru tampil dulu
  const paginatedNotes = notes
    .slice()
    .reverse()
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <main className="flex flex-col w-full min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="flex-1 w-full max-w-screen-xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-white">Loading notes...</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Page Indicator dinamis */}
      {totalPages > 1 && (
        <PageIndicator
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Tombol tambah catatan */}
      <AddNoteButton />
    </main>
  );
}

export default HomePage;
