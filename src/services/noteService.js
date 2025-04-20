// noteService.js

// Default dummy data
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
];

let notes = [...initialNotes];

// Get all notes
const getNotes = () => {
  try {
    const stored = localStorage.getItem("notes");
    if (stored) {
      notes = JSON.parse(stored);
    } else {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  } catch (e) {
    console.error("❌ Error parsing notes:", e);
    notes = [...initialNotes];
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  return [...notes];
};

// Get one note
const getNoteById = (id) => {
  return notes.find((n) => n.id === id);
};

// Add
const addNote = (title, content) => {
  const newId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  const newNote = { id: newId, title, content };
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  return newNote;
};

// Update
const updateNote = (id, title, content) => {
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], title, content };
    localStorage.setItem("notes", JSON.stringify(notes));
    return notes[index];
  }
  return undefined;
};

// Delete
const deleteNote = (id) => {
  const before = notes.length;
  notes = notes.filter((n) => n.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
  return notes.length < before;
};

// Reset
const resetNotes = () => {
  notes = [...initialNotes];
  localStorage.setItem("notes", JSON.stringify(notes));
};

// ✅ Export sebagai named exports — AMAN BUAT VITE
export {
  getNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
  resetNotes
};
