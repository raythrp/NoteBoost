import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/desktop/NavbarDesktop";
import SidebarDesktop from "../../components/desktop/SidebarDesktop";
import { useNotes } from "../../contexts/NoteContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { QuillDeltaToHtmlConverter} from 'quill-delta-to-html';

export default function MenambahCatatan() {
  const { notes, refetchNotes } = useNotes();
  const { id } = useParams();
  const navigate = useNavigate();
  const targetNote = notes.find(note => note.id === id);
  const [content, setContent] = useState(targetNote?.content || ""); 
  const [classValue, setClassValue] = useState(targetNote?.selectedClass || "Class not available");
  const [subjectValue, setSubjectValue] = useState(targetNote?.subject || "Subject not available");
  const [topicValue, setTopicValue] = useState(targetNote?.topic || "Topic not available");
  const [enhancedContent, setEnhancedContent] = useState(targetNote?.enhance || "");
  const [isEditable, setIsEditable] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const quillRef = useRef(null);
  const quillEnhancedRef = useRef(null);
  const { user } = useAuth();
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [hasUserInput, setHasUserInput] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!targetNote) {
      navigate('/'); 
      return;
    }
    setContent(targetNote.content || '');
  }, [targetNote, navigate]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor) {
        console.log("Quill editor is fully rendered.");
      } else {
        console.error("Quill editor is not initialized properly.");
      }
    }
  }, [quillRef.current]);
  
  const handleEnhance = async () => {
    try {
      if (quillRef.current) {
        const updatedContent = quillRef.current.getEditor().getContents();
        const updateResponse = await axios.put(
          `https://noteboost-serve-772262781875.asia-southeast2.run.app/api/history/${id}`,
          {
            tanggal_waktu: new Date().toISOString(),
            isi_catatan_asli: updatedContent,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        if (updateResponse.status === 200) {
          console.log("Catatan berhasil diperbarui!");

          var cfg = {};
          var converter = new QuillDeltaToHtmlConverter(updatedContent, cfg);
          var htmlContent = converter.convert();
          const enhanceResponse = await axios.post(
            `https://noteboost-serve-772262781875.asia-southeast2.run.app/api/history/${id}/enhance`,
            {
              htmlContent: htmlContent,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
  
          if (enhanceResponse.status === 200) {
            const { hasil_enhance } = enhanceResponse.data;
            console.log("Hasil Enhance:", hasil_enhance);
            const enhanceparser = hasil_enhance.replace(/^```[\w]*\n/, "").replace(/\n```$/, "");
            const delta = quillRef.current.getEditor().clipboard.convert(enhanceparser);
            setEnhancedContent(delta);
            await axios.put(
              `https://noteboost-serve-772262781875.asia-southeast2.run.app/api/history/${id}/update-enhanced`,
              {
                hasil_enhance: delta, 
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          }
        }
      }
    } catch (error) {
      console.error("Error during enhancement:", error);
    }
  };  

  const handleChange = (value, delta, source) => {
    setContent(value);
    if (source !== 'user') {
      // Skip auto-saving if the change didn't come from the user
      return;
    }
    if (!hasMounted.current) {
      // Ignore Quill's initial load change
      hasMounted.current = true;
      return;
    }
    setHasUserInput(true); // Indicate this change came from user input
  
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  
    setTypingTimeout(setTimeout(async () => {
      if (hasUserInput) {
        await handleAutoSave(value, "content"); // Save only if user typed
        setHasUserInput(false);  // Reset flag after save
      }
    }, 5000));
  };

  const handleEnhancedContentChange = (value) => {
    setEnhancedContent(value);  // Update state enhanced content
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
      [{ 'indent': '-1' }, { 'indent': '+1' }]
    ]
  };

  const modules1 = {
    toolbar: []
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

  const handleAutoSave = async () => {
    try {
      setFlashMessage("is saving!");
      if (quillRef.current) {
        const updatedContent = quillRef.current.getEditor().getContents();
  
        const noteResponse = await axios.put(
          `https://noteboost-serve-772262781875.asia-southeast2.run.app/api/history/${id}`,
          {
            tanggal_waktu: new Date().toISOString(),
            isi_catatan_asli: updatedContent,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
  
        if (noteResponse.status === 200) {
          console.log("Note content updated successfully!");
  
          await refetchNotes();
          setTimeout(() => {
            setFlashMessage("");
          }, 1000);
        }
      } else {
        console.error("Quill editor is not available");
      }
    } catch (error) {
      console.error("Error updating note", error);
      alert("Failed to update note!");
    }
  };

  const handleSave = async () => {
    try {
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
        await refetchNotes()
        setIsEditable(false);
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
                      <button className="font-semibold text-blue-500" onClick={handleEnhance}>
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
                          <h2 className="text-lg font-semibold text-black text-center">
                            {hasUserInput
                              ? "📝 Catatan is unsaved!"
                              : flashMessage
                              ? `💾 Catatan ${flashMessage}...`
                              : "📒 Catatan"}
                          </h2>
                          <div>
                              <ReactQuill
                                ref={quillRef}
                                theme="snow"
                                value={content}
                                modules={modules}
                                onChange={handleChange}
                                formats={formats}
                                style={{
                                  height: "300px", 
                                  minHeight: "500px", 
                                  overflow: "auto", 
                                  borderTop: "1px solid #e0e0e0",
                                  paddingTop: "20px",
                                }}
                              />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Content Section */}
                    <div className="space-y-8 over">
                      {pages.map((page, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden"
                        >
                          <h2 className="text-lg font-semibold text-black text-center">Hasil Enhance</h2>
                          <ReactQuill
                            ref={quillEnhancedRef}
                            theme="snow"
                            value={enhancedContent}
                            onChange={handleEnhancedContentChange} 
                            readOnly={true}
                            modules={modules1}
                            formats={formats}
                            style={{
                              height: "300px", 
                              minHeight: "500px", 
                              overflow: "auto", 
                              borderTop: "1px solid #e0e0e0",
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
