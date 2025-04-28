import { createContext, useContext, useState, useEffect } from "react";
import { getNotes, addNote, updateNote, deleteNote,uploadImageAndSaveNote } from "../services/noteService";

const NoteContext = createContext();

export function NoteProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotes = async () => {
        setLoading(true);
        const loadedNotes = await getNotes();
        setNotes(loadedNotes);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleAddNote = async (title, content) => {
        const newNote = addNote(title, content);
        if (newNote) {
            await fetchNotes(); // refetch after add
        }
        return newNote;
    };

    const handleUpdateNote = async (id, title, content) => {
        const updatedNote = await updateNote(id, title, content);
        if (updatedNote) {
            await fetchNotes(); // refetch after update
        }
        return updatedNote;
    };

    const handleDeleteNote = async (id) => {
        const success = await deleteNote(id);
        if (success) {
            await fetchNotes(); // refetch after delete
        }
        return success;
    };

    const handleUploadImageAndSaveNote = async (file, title, kelas, mata_pelajaran, topik) => {
        const newNote = await uploadImageAndSaveNote(file, title, kelas, mata_pelajaran, topik);
        if (newNote) {
            await fetchNotes(); // refetch after upload
        }
        return newNote;
    };

    return (
        <NoteContext.Provider
            value={{
                notes,
                loading,
                addNote: handleAddNote,
                updateNote: handleUpdateNote,
                deleteNote: handleDeleteNote,
                uploadImageAndSaveNote: handleUploadImageAndSaveNote,
                refetchNotes: fetchNotes,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
}

export function useNotes() {
    const context = useContext(NoteContext);
    if (context === undefined) {
        throw new Error("useNotes must be used within a NoteProvider");
    }
    return context;
}
