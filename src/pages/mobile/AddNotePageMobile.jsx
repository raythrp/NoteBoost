"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { X, Upload } from "react-feather"
import Navbar from "../../components/mobile/NavbarMobile"
import Button from "../../components/Button"
import Card from "../../components/Card"
import Input from "../../components/Input"
import Textarea from "../../components/Textarea"
import { useNotes } from "../../contexts/NoteContext"

function AddNotePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addNote } = useNotes()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Check if we should show the upload modal immediately
  useEffect(() => {
    if (searchParams.get("upload") === "true") {
      setShowUploadModal(true)
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addNote(title, content)
    navigate("/")
  }

  return (
    <div className="min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="container px-4 py-4 mx-auto content-container">
        <Card className="max-w-full p-4 mx-auto">
          <h1 className="mb-4 text-xl font-bold">Add New Note</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1 text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block mb-1 text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter note content"
                rows={8}
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" onClick={() => setShowUploadModal(true)}>
                Upload Image
              </Button>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" type="button" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="submit">Save Note</Button>
            </div>
          </form>
        </Card>
      </div>

      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
    </div>
  )
}

function UploadModal({ onClose }) {
  const navigate = useNavigate()
  const { addNote } = useNotes()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [title, setTitle] = useState("")

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
      // In a real app, you would upload the file to a server here
      // For now, we'll just create a note with the file name
      await addNote(title || uploadedFile.name, `Uploaded file: ${uploadedFile.name}`)
      navigate("/")
    } else {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-full relative">
        <button className="absolute text-gray-500 top-2 right-2 hover:text-gray-700" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="mb-6 text-xl font-medium text-center">UPLOAD</h2>

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
                onClick={handleUploadComplete}
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <div className="text-[#215273]">
                <Upload size={80} strokeWidth={1.5} />
              </div>

              <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} />
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

export default AddNotePage

