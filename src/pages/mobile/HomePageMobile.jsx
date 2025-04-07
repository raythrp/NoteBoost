import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NavbarMobile from "../../components/mobile/NavbarMobile"
import NoteCardMobile from "../../components/mobile/NoteCardMobile"
import AddNoteButtonMobile from "../../components/mobile/AddNoteButtonMobile"
import PageIndicatorMobile from "../../components/mobile/PageIndicatorMobile"
import { useNotes } from "../../contexts/NoteContext"

export default function MobileHome() {
  const navigate = useNavigate()
  const { notes, deleteNote } = useNotes()
  const [currentPage, setCurrentPage] = useState(0)
  const [activeNoteMenu, setActiveNoteMenu] = useState(null)

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  const handleDelete = (id) => {
    deleteNote(id)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const toggleNoteMenu = (id) => {
    setActiveNoteMenu(activeNoteMenu === id ? null : id)
  }

  // Calculate which notes to show based on current page
  const notesPerPage = 4
  const startIndex = currentPage * notesPerPage
  const visibleNotes = notes.slice(startIndex, startIndex + notesPerPage)
  const totalPages = Math.ceil(notes.length / notesPerPage)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="relative w-[393px] h-[852px] mx-auto bg-[#4795C2] overflow-hidden">
        {/* Background ellipses */}
        <div className="absolute w-[546px] h-[547px] left-[155.5px] top-[489.5px] bg-gradient-to-tr from-[#7EC2DD] to-[#ACDCE7] rounded-full filter blur-[2px] z-0"></div>
        <div className="absolute w-[595px] h-[614.13px] left-[-328px] top-[-146px] bg-gradient-to-tr from-[#215273] to-[#ACDCE7] rounded-full filter blur-[2px] z-0"></div>
        
        {/* Animated Floating Shapes */}
        <div className="absolute w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm top-40 left-[20%] animate-pulse-slow" />
        
        <div className="absolute w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm bottom-40 right-[15%] animate-pulse-slow"
        style={{ animationDelay: "1s" }}
        />
        
        <div className="absolute w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm top-[60%] left-[10%] animate-pulse-slow"
        style={{ animationDelay: "0.5s" }}
        />

        <NavbarMobile />
        <div className="relative z-10">
          {visibleNotes.map((note, index) => {
            const topPositions = [108, 281, 451, 621]
            const menuPositions = [
              "top-[231px] left-[305px]",
              "top-[406px] left-[307px]",
              "top-[575px] left-[307px]",
              "top-[744px] left-[307px]",
            ]

            return (
              <NoteCardMobile
                key={note.id}
                id={note.id}
                title={note.title}
                onEdit={handleEdit}
                onDelete={handleDelete}
                top={topPositions[index]}
                menuPosition={menuPositions[index]}
                isMenuOpen={activeNoteMenu === note.id}
                toggleMenu={() => toggleNoteMenu(note.id)}
              />
            )
          })}
        </div>

        <PageIndicatorMobile totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

        <AddNoteButtonMobile />
      </main>
    </div>
  )
}
