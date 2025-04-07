"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X, Upload, ChevronDown } from "lucide-react"
import { useNotes } from "@/contexts/note-context"

export default function AddNotePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addNote } = useNotes()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState("Masukan Kelas Anda")
  const [selectedSubject, setSelectedSubject] = useState("Button")
  const [showClassDropdown, setShowClassDropdown] = useState(false)
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false)

  // Class and subject options
  const classOptions = ["Kelas 7", "Kelas 8", "Kelas 9", "Kelas 10", "Kelas 11", "Kelas 12"]
  const subjectOptions = ["Matematika", "Fisika", "Biologi", "Kimia", "Sejarah", "Bahasa Indonesia", "Bahasa Inggris"]

  // Check if we should show the upload modal immediately
  useEffect(() => {
    if (searchParams.get("upload") === "true") {
      setShowUploadModal(true)
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addNote(selectedSubject, content || "No content provided")
    router.push("/")
  }

  const selectClass = (className) => {
    setSelectedClass(className)
    setShowClassDropdown(false)
  }

  const selectSubject = (subject) => {
    setSelectedSubject(subject)
    setShowSubjectDropdown(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[393px] h-[852px] mx-auto bg-[#215273]">
        {/* Background gradient */}
        <div className="absolute w-[350px] h-[350px] left-[-141px] top-[256px] bg-gradient-to-tr from-[#607B81] to-[#ACDCE7]"></div>

        {/* Logo */}
        <div className="absolute w-[224px] h-[65px] left-[89px] top-[92px] flex items-center gap-3">
          <div className="w-[65px] h-[65px] bg-white rounded-md flex items-center justify-center">
            {/* Logo icon would go here */}
          </div>
          <span className="text-2xl font-semibold text-white">NOTEBOOST</span>
        </div>

        {/* Class selection */}
        <div className="absolute left-[41px] top-[231px]">
          <label className="block mb-2 text-base text-white">PILIH KELAS</label>
        </div>

        <div
          className="absolute w-[319px] h-[41px] left-[41px] top-[257px] bg-white rounded-[6px] border border-[rgba(130,130,130,0.1)] flex items-center px-4 cursor-pointer"
          onClick={() => setShowClassDropdown(!showClassDropdown)}
        >
          <span className="text-base">{selectedClass}</span>
          <ChevronDown className="absolute w-5 h-5 transform -translate-y-1/2 right-3 top-1/2" />

          {showClassDropdown && (
            <div className="absolute left-0 top-[41px] w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {classOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => selectClass(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject selection */}
        <div className="absolute left-[41px] top-[328px]">
          <label className="block mb-2 text-base text-white">MATA PELAJARAN</label>
        </div>

        <div
          className="absolute w-[320px] h-[41px] left-[41px] top-[352px] bg-white rounded-[6px] border border-[rgba(130,130,130,0.1)] flex items-center px-4 cursor-pointer"
          onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
        >
          <span className="text-base">{selectedSubject}</span>
          <ChevronDown className="absolute w-5 h-5 transform -translate-y-1/2 right-3 top-1/2" />

          {showSubjectDropdown && (
            <div className="absolute left-0 top-[41px] w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {subjectOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => selectSubject(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save button */}
        <button
          className="absolute w-[320px] h-[41px] left-[41px] top-[526px] bg-[#128455] text-white text-xl rounded-[6px] shadow-md flex items-center justify-center"
          onClick={handleSubmit}
        >
          Save
        </button>

        {showUploadModal && (
          <UploadModal
            onClose={() => setShowUploadModal(false)}
            onSave={(title, content) => {
              addNote(title, content)
              setShowUploadModal(false)
              router.push("/")
            }}
          />
        )}
      </div>
    </div>
  )
}

function UploadModal({ onClose, onSave }) {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [title, setTitle] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleUploadComplete = () => {
    if (uploadedFile) {
      onSave(title || uploadedFile.name, `Uploaded file: ${uploadedFile.name}`)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="relative w-[393px] h-[852px] bg-[#F1F1F1] border border-black shadow-md">
        <button className="absolute text-gray-500 top-2 right-2 hover:text-gray-700" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="flex flex-col items-center pt-[74px]">
          <h2 className="text-2xl font-medium text-center">UPLOAD</h2>

          <div className="flex flex-col items-center justify-center gap-4 mt-[100px]">
            {uploadedFile ? (
              <div className="w-full px-8">
                <p className="mb-4 text-center text-green-600">File selected: {uploadedFile.name}</p>
                <div className="mb-4">
                  <label htmlFor="upload-title" className="block mb-1 text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="upload-title"
                    className="w-full p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={uploadedFile.name}
                  />
                </div>
                <button
                  className="bg-[#215273] text-white w-full h-[41px] text-xl rounded-[6px]"
                  onClick={handleUploadComplete}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                {/* Upload cloud icon with exact positioning and styling */}
                <div className="absolute w-[150px] h-[150px] left-[126px] top-[229px]">
                  <div className={`w-full h-full flex items-center justify-center ${isDragging ? "opacity-70" : ""}`}>
                    <div className="w-[138px] h-[112.5px] border-[8px] border-[#215273] flex items-center justify-center">
                      <Upload size={80} className="text-[#215273]" />
                    </div>
                  </div>
                </div>

                <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} />
                <label
                  htmlFor="file-upload"
                  className="absolute w-[210px] h-[41px] left-[96px] top-[499px] bg-[#215273] text-white text-xl flex items-center justify-center rounded-[6px] shadow-md cursor-pointer"
                >
                  JELAJAH
                </label>

                <p className="absolute h-[24px] left-[26.37%] right-[26.61%] top-[calc(50%+166px)] text-center text-black">
                  atau tarik file kesini
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

