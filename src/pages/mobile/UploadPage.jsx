"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "react-feather"
import { useNotes } from "../../contexts/NoteContext"
import Input from "../../components/Input"
import CloudUploadIcon from "../../components/icons/CloudUpload"
import { uploadImageAndSaveNote } from "../../services/noteService";

function UploadPage() {
  const navigate = useNavigate()
  const { addNote } = useNotes()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [title, setTitle] = useState("")
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false); 

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleUploadComplete = async () => {
    setLoading(true);
    try {
      // Call the uploadImageAndSaveNote function passing necessary parameters
      const note = await uploadImageAndSaveNote(
        uploadedFile,
        title,
        "",
        "",
        ""
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
    <div className="flex flex-col min-h-screen bg-gray-100" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="flex items-center p-4 bg-white">
        <button onClick={() => navigate("/")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Upload</h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 p-6">
        {uploadedFile ? (
          <div className="w-full max-w-md">
            <p className="mb-4 text-center text-green-600">File selected: {uploadedFile.name}</p>
            <div className="mb-4">
              <label htmlFor="upload-title" className="block mb-1 text-sm font-medium">
                Title
              </label>
              <Input
                id="upload-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={uploadedFile.name}
              />
            </div>
            <button
              className="bg-[#215273] text-white w-full h-[52px] text-xl rounded-md shadow-md"
              onClick={handleUploadComplete}
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="mb-16 text-3xl font-bold">UPLOAD</h1>

            <div className="mb-16">
              <CloudUploadIcon size={120} color="#215273" />
            </div>

            <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} />
            <label
              htmlFor="file-upload"
              className="bg-[#215273] text-white w-[210px] h-[52px] text-xl flex items-center justify-center rounded-md shadow-md cursor-pointer mb-8"
            >
              EXPLORE
            </label>

            <p className="text-center text-gray-700">or drag the photo here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadPage
