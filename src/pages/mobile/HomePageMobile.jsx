import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/mobile/NavbarMobile"
import NoteCard from "../../components/NoteCard"
import AddNoteButton from "../../components/mobile/AddNoteButtonMobile"
import PageIndicator from "../../components/PageIndicator"
import { useNotes } from "../../contexts/NoteContext"

function HomePage() {
  const navigate = useNavigate()
  const { notes, deleteNote, loading } = useNotes()
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4;
  
  const totalPages = Math.ceil(notes.length / itemsPerPage);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  const handleDelete = async (id) => {
    await deleteNote(id)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedNotes = Array.isArray(notes)
  ? notes
      .slice()
      .reverse()
      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  : [];
  
  return (
    <main className="min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="container px-4 py-8 mx-auto content-container">
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
                content={note.content}
                onEdit={handleEdit} 
                onDelete={handleDelete} />
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

      <AddNoteButton />
    </main>
  )
}

export default HomePage

