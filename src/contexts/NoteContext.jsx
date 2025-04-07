import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNotes, addNote, updateNote, deleteNote } from '../services/noteService';

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load notes on initial render
    setNotes(getNotes());
    setLoading(false);
  }, []);

  const handleAddNote = async (title, content) => {
    const newNote = addNote(title, content);
    setNotes(getNotes());
    return newNote;
  };

  const handleUpdateNote = async (id, title, content) => {
    const updatedNote = updateNote(id, title, content);
    setNotes(getNotes());
    return updatedNote;
  };

  const handleDeleteNote = async (id) => {
    const success = deleteNote(id);
    if (success) {
      setNotes(getNotes());
    }
    return success;
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        addNote: handleAddNote,
        updateNote: handleUpdateNote,
        deleteNote: handleDeleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
}
