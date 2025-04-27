import { createContext, useContext, useState, useEffect } from "react";
import { getNotes, addNote, updateNote, deleteNote,uploadImageAndSaveNote } from "../services/noteService";

const NoteContext = createContext();

export function NoteProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNotes = async () => {
            const loadedNotes = await getNotes();
            setNotes(loadedNotes);
            setLoading(false);
        };

        loadNotes();
    }, []);

    const handleAddNote = (title, content) => {
        const newNote = addNote(title, content);
        setNotes(getNotes());
        return newNote;
    };

    const handleUpdateNote = (id, title, content) => {
        const updatedNote = updateNote(id, title, content);
        setNotes(getNotes());
        return updatedNote;
    };

    const handleDeleteNote = (id) => {
        const success = deleteNote(id);
        if (success) {
            setNotes(getNotes());
        }
        return success;
    };

    const handleUploadImageAndSaveNote = async (file, title, kelas, mata_pelajaran, topik) => {
        try {
            const newNote = await uploadImageAndSaveNote(file, title, kelas, mata_pelajaran, topik);
            setNotes(await getNotes());  // Ensure notes are reloaded after the note is added
            return newNote;
        } catch (error) {
            console.error("Error uploading and saving note:", error);
            return null;
        }
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
