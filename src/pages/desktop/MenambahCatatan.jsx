import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/desktop/NavbarDesktop";
import SidebarDesktop from "../../components/desktop/SidebarDesktop";
import { useNotes } from "../../contexts/NoteContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export default function MenambahCatatan() {
  const { notes } = useNotes(); // Ambil daftar catatan dari context
  const { id } = useParams();
  const navigate = useNavigate();
  const targetNote = notes.find(note => note.id === id);
  const [content, setContent] = useState(targetNote?.content || ""); // Konten catatan
  const [classValue, setClassValue] = useState(targetNote?.selectedClass || "Class not available");
  const [subjectValue, setSubjectValue] = useState(targetNote?.subject || "Subject not available");
  const [topicValue, setTopicValue] = useState(targetNote?.topic || "Topic not available");
  const [enhancedContent, setEnhancedContent] = useState(targetNote?.enhance || "");
  const [isEditable, setIsEditable] = useState(false);
  const quillRef = useRef(null);
  const { user } = useAuth();
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (!targetNote) {
      navigate('/'); // Optional: Redirect if note not found
      return;
    }
    setContent(targetNote.content || '');
  }, [targetNote, navigate]);

  const handleChange = (value) => {
    setContent(value);  // Update state content

    // Clear any previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a new timeout to update after 5 seconds
    setTypingTimeout(setTimeout(async () => {
      await handleSave(value);  // Call save function after 5 seconds
    }, 5000)); // 5000 ms = 5 seconds
  };

  useEffect(() => {
    const newTargetNote = notes.find(note => note.id === id); // Find the new note
    if (newTargetNote) {
      setContent(newTargetNote.content || ''); // Update content
      setClassValue(newTargetNote.selectedClass || 'Class not available');
      setSubjectValue(newTargetNote.subject || 'Subject not available');
      setTopicValue(newTargetNote.topic || 'Topic not available');
      setEnhancedContent(newTargetNote.enhance || '');
    }
  }, [id, notes]);
  
  useEffect(() => {
      console.log("targetNote:", targetNote); // Check if topic is being passed correctly
    }, [targetNote]);
  const jenjangToClasses = {
    "SMP": ["Class 7", "Class 8", "Class 9"],
    "SMA": ["Class 10", "Class 11", "Class 12"],
    "Tidak Tersedia": [],
  };

  const getClassOptions = () => {
    const jenjang = user?.jenjang || "Tidak Tersedia"; // Default to "Tidak Tersedia" if jenjang is not available
    return jenjangToClasses[jenjang] || [];
  };
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

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    try {
      // 1. Memperbarui detail (kelas, mata pelajaran, topik)
      const detailsResponse = await axios.put(
        `https://noteboost-serve-772262781875.asia-southeast2.run.app/api/history/${id}/update-details`,  // Endpoint untuk update detail
        {
          kelas: classValue,
          mata_pelajaran: subjectValue,
          topik: topicValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Sertakan token di header Authorization
          }
        }
      );

      if (detailsResponse.status === 200) {
        console.log("Details updated successfully!");
      }

      // 2. Memperbarui isi catatan (isi_catatan_asli dan tanggal_waktu)
      const updatedContent = quillRef.current.getEditor().getContents();
      const noteResponse = await axios.put(
        `https://noteboost-serve-772262781875.asia-southeast2.run.app/api/history/${id}`,  // Endpoint untuk update isi catatan
        {
          tanggal_waktu: new Date().toISOString(), // Atur tanggal dan waktu saat ini
          isi_catatan_asli: updatedContent, // Isi catatan yang baru
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Sertakan token di header Authorization
          }
        }
      );

      if (noteResponse.status === 200) {
        console.log("Note content updated successfully!");
      }
    } catch (error) {
      console.error("Error updating note", error);
      alert("Failed to update note!");
    }
  };

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
        <div className="relative flex-1 overflow-auto">
          <div className="relative z-10 flex flex-col h-full p-6 text-white">
            <div className="flex items-center justify-center flex-grow">
              {/* Paper (bg-white) Container */}
              <div className="bg-white w-[700px] max-h-[85%] rounded-md shadow-2xl p-8 text-black overflow-y-auto border border-gray-300">
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
                      <select
                        value={classValue}
                        onChange={(e) => setClassValue(e.target.value)}
                        disabled={!isEditable}
                        className="w-full p-2 bg-gray-100 border rounded"
                      >
                        <option value="Class not available" disabled>
                          Class not available
                        </option>
                        {getClassOptions().map((classOption, index) => (
                          <option key={index} value={classOption}>
                            {classOption}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={subjectValue}
                        onChange={(e) => setSubjectValue(e.target.value)}
                        readOnly={!isEditable}
                        className="w-full p-2 bg-gray-100 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={topicValue}
                        onChange={(e) => setTopicValue(e.target.value)}
                        readOnly={!isEditable}
                        className="w-full p-2 bg-gray-100 border rounded"
                      />
                    </div>

                    {/* Edit Button */}
                    <div className="mb-4">
                      <button
                        onClick={handleEdit}
                        className="w-auto px-4 py-2 bg-blue-500 text-white rounded text-sm"
                      >
                        {isEditable ? "Cancel" : "Edit"}
                      </button>
                    </div>

                    {/* Save Button (Visible only when editable) */}
                    {isEditable && (
                      <div className="mb-4">
                        <button
                          onClick={handleSave}
                          className="w-auto px-4 py-2 bg-green-500 text-white rounded text-sm"
                        >
                          Save
                        </button>
                      </div>
                    )}

                    {/* Editable Note Content */}
                    <div className="space-y-8">
                      {pages.map((page, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white border border-gray-300 rounded-md shadow-md"
                        >
                          <h2 className="text-lg font-semibold text-black text-center">Catatan</h2>
                          <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={page}
                            modules={modules}
                            onChange={handleChange}
                            formats={formats}
                            style={{
                              height: "300px", 
                              minHeight: "500px", 
                              overflow: "hidden", 
                              borderTop: "1px solid #e0e0e0", // Add separator between content and enhanced section
                              paddingTop: "20px",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Content Section */}
                    <div className="space-y-8">
                      {pages.map((page, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white border border-gray-300 rounded-md shadow-md"
                        >
                          <h2 className="text-lg font-semibold text-black text-center">Hasil Enhance</h2>
                          <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={enhancedContent}
                            readOnly={true}
                            modules={modules}
                            formats={formats}
                            style={{
                              height: "300px", 
                              minHeight: "500px", 
                              overflow: "hidden", 
                              borderTop: "1px solid #e0e0e0", // Add separator between content and enhanced section
                              paddingTop: "20px",
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
