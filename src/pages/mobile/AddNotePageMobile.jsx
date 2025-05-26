// "use client"

import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { X, Upload, ChevronDown } from 'react-feather';
import Navbar from "../../components/mobile/NavbarMobile"
import Button from "../../components/Button"
import Card from "../../components/Card"
import Input from "../../components/Input"
import TextArea from "../../components/Textarea";
import { useNotes } from "../../contexts/NoteContext"
import { uploadImageAndSaveNote } from "../../services/noteService";
import { useAuth } from "../../contexts/AuthContext";

function AddNotePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addNote } = useNotes();
  const [topic, setTopic] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);  // Add this line
  const { user } = useAuth();

  useEffect(() => {
      if (searchParams.get("upload") === "true") {
        setShowUploadModal(true);
      }
    }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const note = await addNote(topic, selectedClass, subject, content);
      if (note && note.id) {
        navigate(`/catatan/${note.id}`);
      } else {
        console.error("Gagal membuat catatan:", note);
        alert("Terjadi kesalahan saat menyimpan catatan.");
      }
    } catch (err) {
      console.error("Error saat menyimpan:", err);
      alert("Gagal menyimpan catatan. Coba lagi.");
    }
  };

  const jenjangToClasses = {
    "SMP": ["Class 7", "Class 8", "Class 9"],
    "SMA": ["Class 10", "Class 11", "Class 12"],
    "Tidak Tersedia": [],
  };

  return (
    <div className="min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="container px-4 py-4 mx-auto content-container">
        <Card className="max-w-full p-4 mx-auto">
          <h1 className="mb-4 text-xl font-bold">Add New Note</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Topic field */}
            <div>
              <label htmlFor="topic" className="block mb-1 text-sm font-medium">
                Topic
              </label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter note topic"
                required
              />
            </div>

            {/* Class field */}
            <div>
              <label htmlFor="class" className="block mb-1 text-sm font-medium">
                Class
              </label>
              <div className="relative">
                <select
                  id="class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md appearance-none border-black/25"
                >
                  <option value="">Pick Your Class</option>
                  {(jenjangToClasses[user?.jenjang] || []).map((kelas) => (
                    <option key={kelas} value={kelas}>
                      {kelas}
                    </option>
                  ))}
                </select>
                <div className="absolute transform -translate-y-1/2 pointer-events-none right-3 top-1/2">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Subject field */}
            <div>
              <label htmlFor="subject" className="block mb-1 text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                required
              />
            </div>

            {content ? (
              <>
                {/* Extracted Text field */}
                <div>
                  <label
                    htmlFor="content"
                    className="block mb-1 text-sm font-medium"
                  >
                    Extracted Text
                  </label>
                  <TextArea
                    id="content"
                    value={content}
                    disabled
                    placeholder="Extracted Content"
                    rows={10}
                    required
                  />
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUploadModal(true)}
              >
                {content ? "Change Image" : "Upload Image"}
              </Button>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" type="button" onClick={() => navigate('/catatan/${note.id}')}>
                Cancel
              </Button>
              <Button type="submit">Save Note</Button>
            </div>
          </form>
        </Card>
      </div>
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          setContent={setContent}
        />
      )}
    </div>
  )
}

function UploadModal({ onClose, setContent}) {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadComplete = async () => {
    setLoading(true);
    try {
      // Call the uploadImageAndSaveNote function passing necessary parameters
      const note = await uploadImageAndSaveNote(
        uploadedFile,
        uploadedFile.name,
        "",
        "",
        "",
      );
      

      if (note) {
        setContent(note.extractedText);
        onClose();
      } else {
        setError("Failed to extract text or save the note.");
        onClose();
      }

      // // If note is successfully saved, navigate to catatan page
      // if (note) {
      //   console.log(
      //     `[${new Date().toLocaleTimeString()}] Note berhasil disimpan:`,
      //     note
      //   );
      //   navigate("/catatan"); // Navigate to the notes page if saved successfully
      // } else {
      //   setError("Failed to extract text or save the note.");
      // }
    } catch (err) {
      console.error("Error during image upload and note save:", err);
      setError("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="bg-white p-8 rounded-lg w-[500px] max-w-full relative">
        <button
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="mb-8 text-2xl font-medium text-center">UPLOAD</h2>

        <div className="flex flex-col items-center justify-center gap-4">
          {uploadedFile ? (
            <div className="w-full">
              <p className="mb-4 text-center text-green-600">
                File selected: {uploadedFile.name}
              </p>
              <button
                className="bg-[#215273] text-white w-full h-[52px] text-xl rounded-md"
                onClick={handleUploadComplete}
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          ) : (
            <>
              <div className="text-[#215273]">
                <Upload size={100} strokeWidth={1.5} />
              </div>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="bg-[#215273] text-white w-[210px] h-[52px] text-xl flex items-center justify-center rounded-md cursor-pointer"
              >
                EXPLORE
              </label>

              <p className="mt-4 text-center text-gray-700">
                or drag the photo here
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNotePage