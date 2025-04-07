"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { useNotes } from "@/contexts/note-context"

export default function EditNotePage({ params }) {
  const router = useRouter()
  const { notes, updateNote } = useNotes()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    const id = Number.parseInt(params.id)
    const note = notes.find((note) => note.id === id)

    if (note) {
      setTitle(note.title)
      setContent(note.content)
    } else {
      router.push("/")
    }
  }, [params.id, router, notes])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = Number.parseInt(params.id)
    await updateNote(id, title, content)
    router.push("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[393px] h-[852px] mx-auto bg-[#4795C2] overflow-hidden">
        {/* Background ellipses */}
        <div className="absolute w-[546px] h-[547px] left-[155.5px] top-[489.5px] bg-gradient-to-tr from-[#7EC2DD] to-[#ACDCE7] rounded-full filter blur-[2px] z-0"></div>
        <div className="absolute w-[595px] h-[614.13px] left-[-328px] top-[-146px] bg-gradient-to-tr from-[#215273] to-[#ACDCE7] rounded-full filter blur-[2px] z-0"></div>

        <Navbar />

        <div className="relative z-10 pt-[80px] px-6">
          <div className="p-6 bg-white rounded-md shadow">
            <h1 className="mb-6 text-2xl font-bold">Edit Note</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-1 text-sm font-medium">
                  Title
                </label>
                <input
                  id="title"
                  className="w-full p-2 border rounded"
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
                <textarea
                  id="content"
                  className="w-full p-2 border rounded"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter note content"
                  rows={10}
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button type="button" className="px-4 py-2 border rounded" onClick={() => router.push("/")}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#215273] text-white rounded">
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

