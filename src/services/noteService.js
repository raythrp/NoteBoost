import axios from "axios";

// Default dummy data
// const initialNotes = [
//   { id: 1, title: "Negosiasi", content: "Content for Negosiasi" },
//   { id: 2, title: "Teks Prosedur", content: "Content for Teks Prosedur" },
//   { id: 3, title: "Hindu - Budha dan Islam", content: "Content for Hindu - Budha dan Islam" },
//   { id: 4, title: "Bela Negara Dalam Konteks NKRI", content: "Content for Bela Negara Dalam Konteks NKRI" },
//   { id: 5, title: "Larutan Asam Basa", content: "Content for Larutan Asam Basa" },
//   { id: 6, title: "Seni Sunda Angklung", content: "Content for Seni Sunda Angklung" },
//   { id: 7, title: "Voli Tangan", content: "Content for Voli Tangan" },
//   { id: 8, title: "Cerita Fabel", content: "Content for Cerita Fabel" },
//   { id: 9, title: "Fisika Kuantum", content: "Content for Fisika Kuantum" },
// ];

// let notes = [...initialNotes];
const BASE_URL = "https://noteboost-serve-772262781875.asia-southeast2.run.app/api";
// Get token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get all notes
const getNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/history`, getAuthHeaders());
        const notes = response.data.map((item) => ({
            id: item.id,
            title: `${item.mata_pelajaran} - ${item.topik}`,
            content: item.isi_catatan_asli,
        }));
        return notes;
    } catch (e) {
        console.error("❌ Error parsing notes:", e);
        return [];
    }
};

// Get one note
const getNoteById = (id) => {
    return notes.find((n) => n.id === id);
};

// Add note with text
const addNote = async (title, content) => {
    try {
        
        const body = {
            tanggal_waktu: new Date().toISOString(),
            kelas: "",
            mata_pelajaran: "", 
            topik: title,
            isi_catatan_asli: content,
        };

        
        const response = await axios.post(`${BASE_URL}/history`, body, getAuthHeaders());

        
        if (response.status === 201) {
            return {
                id: response.data.id,
                title,
                content,
            };
        } else {
            console.error("Gagal menambahkan catatan:", response);
            return null;
        }
    } catch (error) {
        console.error("Error saat menambahkan catatan:", error);
        return null;
    }
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
const deleteNote = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/history/${id}`, getAuthHeaders());
        if (response.status === 200) {
            return true;
        } else {
            console.error("Failed to delete note:", response);
            return true;
        }
    } catch (error) {
        console.error("Error deleting note:", error);
        return false;
    }
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
