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
  ];
  
  // In a real app, this would be replaced with API calls or localStorage
  let notes = [...initialNotes];
  
  // Get all notes
  export function getNotes() {
    // In a real app, we would get notes from localStorage
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      notes = JSON.parse(storedNotes);
    } else {
      // Initialize localStorage with our default notes
      localStorage.setItem('notes', JSON.stringify(notes));
    }
    return [...notes];
  }
  
  // Get a note by ID
  export function getNoteById(id) {
    return notes.find((note) => note.id === id);
  }
  
  // Add a new note
  export function addNote(title, content) {
    const newId = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 1;
    const newNote = { id: newId, title, content };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    return newNote;
  }
  
  // Update a note
  export function updateNote(id, title, content) {
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      notes[index] = { ...notes[index], title, content };
      localStorage.setItem('notes', JSON.stringify(notes));
      return notes[index];
    }
    return undefined;
  }
  
  // Delete a note
  export function deleteNote(id) {
    const initialLength = notes.length;
    notes = notes.filter((note) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    return notes.length < initialLength;
  }
  
  // Reset to initial data (for testing)
  export function resetNotes() {
    notes = [...initialNotes];
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  