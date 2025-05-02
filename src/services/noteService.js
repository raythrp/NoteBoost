import axios from "axios";

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
            content: item.hasil_enhance
              ? `${item.isi_catatan_asli}\n\n\nHasil Enchance\n${item.hasil_enhance}`
              : item.isi_catatan_asli,
            topic: item.topik,
            selectedClass: item.kelas,
            subject: item.mata_pelajaran,
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
const addNote = async (title, kelas, mata_pelajaran, content) => {
  try {
    const body = {
      tanggal_waktu: new Date().toISOString(),
      kelas: kelas,
      mata_pelajaran: mata_pelajaran,
      topik: title,
      isi_catatan_asli: content,
    };

    const response = await axios.post(
      `${BASE_URL}/history`,
      body,
      getAuthHeaders()
    );

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
    const response = await axios.delete(
      `${BASE_URL}/history/${id}`,
      getAuthHeaders()
    );
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

const uploadImageAndSaveNote = async (
  file,
  title,
  kelas,
  mata_pelajaran,
  topik
) => {
  try {
    console.log(BASE_URL);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("tanggal_waktu", new Date().toISOString());
    formData.append("kelas", "");
    formData.append("mata_pelajaran", "");
    formData.append("topik", "");
    const response = await axios.post(
      `${BASE_URL}/image/extract-and-save/`,
      formData,
      getAuthHeaders()
    );

    if (response.status === 201) {
      return response.data;
    } else {
      console.log("Error Upload Image: ", response);
      return false;
    }

    // if (response.status === 200) {
    //     const extractedText = response.data.extractedText;

    //     const body = {
    //         tanggal_waktu: new Date().toISOString(),
    //         kelas: kelas || "",
    //         mata_pelajaran: mata_pelajaran || "",
    //         topik: title,
    //         isi_catatan_asli: extractedText,
    //     };

    //     // Simpan catatan ke backend setelah teks berhasil diekstraksi
    //     const saveNoteResponse = await axios.post(`${BASE_URL}/history`, body, getAuthHeaders());

    //     if (saveNoteResponse.status === 201) {
    //         return {
    //             id: saveNoteResponse.data.id,
    //             title,
    //             content: extractedText,
    //         };
    //     } else {
    //         console.error("Gagal menyimpan catatan:", saveNoteResponse);
    //         return null;
    //     }
    // } else {
    //     console.error("Gagal mengekstrak teks:", response);
    //     return null;
    // }
  } catch (error) {
    console.error("Error saat mengunggah gambar dan menyimpan catatan:", error);
    return null;
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
    resetNotes,
    uploadImageAndSaveNote,
};
