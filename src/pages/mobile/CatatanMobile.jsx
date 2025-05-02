import React, { useState, useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNotes } from "../../contexts/NoteContext";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CatatanMobile() {
  const { notes } = useNotes();
  const { id } = useParams();
  const navigate = useNavigate();
  const targetNote = notes.find(note => note.id === id);
  const [content, setContent] = useState(targetNote?.content || "");
  const quillRef = useRef(null);

  useEffect(() => {
    if (!targetNote) {
      navigate('/'); // Optional: Redirect if note not found
      return;
    }
    setContent(targetNote.content || '');
  }, [targetNote, navigate]);

  // Function to update note content
  // const handleContentChange = (value) => {
  //   setContent(value);
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === id ? { ...note, content: value } : note
  //     )
  //   );
  // };

  // Quill modules configuration - simplified for mobile
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }],
      [{ 'align': [] }],
    ]
  };

  // Quill formats
  const formats = [
    'bold', 'italic', 'underline',
    'color', 'align', 'list', 'bullet'
  ];
  
  // Function to split text into pages based on number of lines
  const splitIntoPages = (text, maxLinesPerPage) => {
    // For Quill content, we'll need a different approach since it's HTML
    // Here we'll treat each Quill content as a separate page
    // In a production app, you might want to implement more sophisticated page splitting
    return [text];
  };

  // Maximum lines per page (for mobile)
  const maxLinesPerPage = 20;

  // Split content into pages
  const pages = splitIntoPages(content, maxLinesPerPage);

  const handleMenuClick = () => {
    navigate('/');
  };

  const handleEnhanceClick = () => {
    console.log("Enhance clicked");
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-500 to-blue-800">
      {/* Navbar */}
      <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
        {/* Menu Icon and Notes Text */}
        <div className="flex items-center space-x-2">
          <button onClick={handleMenuClick} className="text-2xl text-gray-800">
            <FiArrowLeft />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Notes</h1>
        </div>

        {/* Enhance Button */}
        <button
          onClick={handleEnhanceClick}
          className="ml-auto font-semibold text-blue-500"
        >
          Enhance
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md p-4 text-black overflow-y-auto mt-4 max-h-[75vh]">
        {notes.length > 0 ? (
          <div>
            {/* Input Fields */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Class</label>
              <input
                type="text"
                value={targetNote?.selectedClass || "Class not available"}
                readOnly
                className="w-full p-2 bg-gray-100 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                value={targetNote?.subject || "Subject not available"}
                readOnly
                className="w-full p-2 bg-gray-100 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Topic</label>
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
                  style={{
                    height: "600px",
                    overflow: "hidden",
                    pageBreakAfter: "always",
                  }}
                >
                  <ReactQuill
                    ref={index === 0 ? quillRef : null}
                    theme="snow"
                    value={page}
                    // onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    style={{
                      height: "550px",
                      overflow: "hidden",
                    }}
                    placeholder="Write your notes here..."
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
  );
}