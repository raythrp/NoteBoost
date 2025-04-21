"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, Upload } from "react-feather"
import Input from "./Input"
import { useNotes } from "../contexts/NoteContext"
import { uploadImageAndSaveNote } from '../../services/noteService';


function UploadModal({ onClose }) {
  const navigate = useNavigate()
  const { addNote } = useNotes()
  const { uploadImageAndSaveNote } = useNotes();
  const [uploadedFile, setUploadedFile] = useState(null)
  const [title, setTitle] = useState("")
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    console.log("error");
    if (uploadedFile) {
      console.log("error");
      setLoading(true);
      setError(null);

      try {
        const note = await uploadImageAndSaveNote(uploadedFile, title, "", "", "");
        if (note) {
          navigate('/catatan');
        } else {
          setError("Failed to extract text or save the note.");
        }
      } catch (err) {
        setError("An error occurred while processing the image.");
      } finally {
        setLoading(false);
      }
    } else {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
        <button
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2 className="mb-8 text-2xl font-medium text-center">UPLOAD</h2>

        <div className="flex flex-col items-center justify-center gap-4">
          {uploadedFile ? (
            <div className="w-full">
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
                className="bg-[#215273] text-white w-full h-[52px] text-xl rounded-md"
                // onClick={handleUploadComplete}
                onClick={() => {
                  console.error("Clicked upload button");
                  handleUploadComplete();
                }}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
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
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              <label
                htmlFor="file-upload"
                className="bg-[#215273] text-white w-[210px] h-[52px] text-xl flex items-center justify-center rounded-md cursor-pointer"
              >
                JELAJAH
              </label>

              <p className="mt-4 text-center text-gray-700">atau tarik file kesini</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadModal

