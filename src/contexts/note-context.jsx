"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Initial data
const initialNotes = [
  { id: 1, title: "Negosiasi", content: "Content for Negosiasi" },
  { id: 2, title: "Teks Prosedur", content: "Content for Teks Prosedur" },
  { id: 3, title: "Hindu - Budha dan Islam", content: "Content for Hindu - Budha dan Islam" },
  { id: 4, title: "Bela Negara Dalam Konteks NKRI", content: "Content for Bela Negara Dalam Konteks NKRI" },
  { id: 5, title: "Larutan Asam Basa", content: "Content for Larutan Asam Basa" },
  { id: 6, title: "Seni Sunda Angklung", content: "Content for Seni Sunda Angklung" },
  { id: 7, title: "Voli Tangan", content: "Content for Voli Tangan" },
  { id: 8, title: "Cerita Fabel", content: "Content for Cerita Fabel" },
  { id: 9, title: "Fisika Kuantum", content: "Content for Fisika Kuantum" },
]

const NoteContext = createContext()

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load notes from localStorage or use initial data
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    } else {
      setNotes(initialNotes)
    }
    setLoading(false)
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
  }, [notes, loading])

  const addNote = async (title, content) => {
    const newId = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 1
    const newNote = { id: newId, title, content }
    setNotes([...notes, newNote])
    return newNote
  }

  const updateNote = async (id, title, content) => {
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, title, content } : note))
    setNotes(updatedNotes)
    return updatedNotes.find((note) => note.id === id)
  }

  const deleteNote = async (id) => {
    setNotes(notes.filter((note) => note.id !== id))
    return true
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error("useNotes must be used within a NoteProvider")
  }
  return context
}

export default NoteContext
export { NoteProvider, useNotes }