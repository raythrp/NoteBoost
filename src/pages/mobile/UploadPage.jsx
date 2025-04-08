"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "react-feather"
import { useNotes } from "../../contexts/NoteContext"
import Input from "../../components/Input"
import CloudUploadIcon from "../../components/icons/CloudUpload"

function UploadPage() {
  const navigate = useNavigate()
  const { addNote } = useNotes()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [title, setTitle] = useState("")
  const [uploading, setUploading] = useState(false)

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
    if (uploadedFile) {
      try {
        setUploading(true)
        // In a real app, you would upload the file to a server here
        // For now, we'll just create a note with the file name
        await addNote(title || uploadedFile.name, `Uploaded file: ${uploadedFile.name}`)
        navigate("/")
      } catch (error) {
        console.error("Error uploading file:", error)
      } finally {
        setUploading(false)
      }
    }
  }

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
              JELAJAH
            </label>

            <p className="text-center text-gray-700">atau tarik file kesini</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadPage
