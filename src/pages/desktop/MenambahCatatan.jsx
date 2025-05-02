import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/desktop/NavbarDesktop";
import SidebarDesktop from "../../components/desktop/SidebarDesktop";
import { useNotes } from "../../contexts/NoteContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function MenambahCatatan() {
  const { notes } = useNotes(); // Ambil daftar catatan dari context
  const { id } = useParams();
  const navigate = useNavigate();
  const targetNote = notes.find(note => note.id === id);
  const [content, setContent] = useState(targetNote?.content || ""); // Konten catatan
  const quillRef = useRef(null);

  useEffect(() => {
    if (!targetNote) {
      navigate('/'); // Optional: Redirect if note not found
      return;
    }
    setContent(targetNote.content || '');
  }, [targetNote, navigate]);

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'line-height': ['1', '1.5', '2', '2.5'] }],
    ]
  };

  // Quill formats
  const formats = [
    'font', 'size', 'bold', 'italic', 'underline',
    'color', 'background', 'align', 'list', 'bullet',
    'indent', 'link', 'image', 'line-height'
  ];

  // Fungsi untuk membagi teks menjadi halaman berdasarkan jumlah baris
  const splitIntoPages = (text, maxLinesPerPage) => {
    return [text];
  };

  const maxLinesPerPage = 25;
  const pages = splitIntoPages(content, maxLinesPerPage);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-800">
      {/* Background Bubbles */}
      <div className="absolute w-[300px] h-[300px] bg-white bg-opacity-20 rounded-full top-[20%] left-[10%] z-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-white bg-opacity-20 rounded-full bottom-[10%] right-[15%] z-0"></div>

      {/* Navbar */}
      <Navbar />

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <SidebarDesktop notes={notes} />

        {/* Main Area */}
        <div className="relative flex-1 overflow-hidden">
          <div className="relative z-10 flex flex-col h-full p-6 text-white">
            <div className="flex items-center justify-center flex-grow">
              {/* Paper (bg-white) Container */}
              <div className="bg-white w-[700px] max-h-[85%] rounded-md shadow-2xl p-8 text-black overflow-auto">
                {notes.length > 0 ? (
                  <div>
                    {/* Header */}
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Notes</span>
                      <button className="font-semibold text-blue-500">
                        Enhance
                      </button>
                    </div>
                    <hr className="mb-4 border-gray-300" />

                    {/* Input Fields */}
                    <div className="mb-4">
                      <input
                        type="text"
                        value={targetNote?.selectedClass || "Class not available"}
                        readOnly
                        className="w-full p-2 bg-gray-100 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={targetNote?.subject || "Subject not available"}
                        readOnly
                        className="w-full p-2 bg-gray-100 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={targetNote?.topic || "Topic not available"}
                        readOnly
                        className="w-full p-2 bg-gray-100 border rounded"
                      />
                    </div>

                    {/* Editable Note Content */}
                    <div className="space-y-8">
                      {pages.map((page, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white border border-gray-300 rounded-md shadow-md"
                        >
                          <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={page}
                            modules={modules}
                            formats={formats}
                            style={{
                              height: "300px", // Allow Quill to grow with content
                              minHeight: "600px", // Minimum height for the Quill editor
                              overflow: "hidden", // Remove scrollbar within Quill
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    No notes available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
