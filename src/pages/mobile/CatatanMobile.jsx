import React, { useState, useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNotes } from "../../contexts/NoteContext";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { QuillDeltaToHtmlConverter} from 'quill-delta-to-html';

export default function CatatanMobile() {
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
  const { user } = useAuth();
  const hasMounted = useRef(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [hasUserInput, setHasUserInput] = useState(false);
  const quillEnhancedRef = useRef(null);
    const [isEnhancing, setIsEnhancing] = useState(false);

  useEffect(() => {
    console.log("targetNote:", targetNote); // Check if topic is being passed correctly
  }, [targetNote]);

  useEffect(() => {
    if (!targetNote) {
      navigate('/'); // Optional: Redirect if note not found
      return;
    }
    setContent(targetNote.content || '');
  }, [targetNote, navigate]);

    const handleEnhance = async () => {
      setIsEnhancing(true);
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
      } finally {
        setIsEnhancing(false);
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
    const newTargetNote = notes.find(note => note.id === id);
    if (newTargetNote) {
      setContent(newTargetNote.content || '');
      setClassValue(newTargetNote.selectedClass || 'Class not available');
      setSubjectValue(newTargetNote.subject || 'Subject not available');
      setTopicValue(newTargetNote.topic || 'Topic not available');
      setEnhancedContent(newTargetNote.enhance || '');
    }
  }, [id, notes]);

  useEffect(() => {
        console.log("targetNote:", targetNote); 
  }, [targetNote]);
  
  const jenjangToClasses = {
    "SMP": ["Class 7", "Class 8", "Class 9"],
    "SMA": ["Class 10", "Class 11", "Class 12"],
    "Tidak Tersedia": [],
  };

  useEffect(() => {
      const editor = quillRef.current?.getEditor();
      const editorElement = editor?.root;
    
      const handleKeyUp = (e) => {
        if ([" ", "Backspace"].includes(e.key)) {
          setHasUserInput(true);
          if (typingTimeout) clearTimeout(typingTimeout);
    
          setTypingTimeout(setTimeout(async () => {
            if (hasUserInput) {
              await handleAutoSave();
              setHasUserInput(false);
            }
          }, 5000));
        }
      };
    
      if (editorElement) {
        editorElement.addEventListener("keyup", handleKeyUp);
      }
    
      return () => {
        if (editorElement) {
          editorElement.removeEventListener("keyup", handleKeyUp);
        }
      };
    }, [typingTimeout, hasUserInput]);

  const getClassOptions = () => {
    const jenjang = user?.jenjang || "Tidak Tersedia";
    return jenjangToClasses[jenjang] || []; 
  };

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

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }],
      [{ 'align': [] }],
    ]
  };

  const modules1 = {
    toolbar: []
  };


  // Quill formats
  const formats = [
    'bold', 'italic', 'underline',
    'color', 'align', 'list', 'bullet'
  ];
  
  // Function to split text into pages based on number of lines
  const splitIntoPages = (text, maxLinesPerPage) => {
    return [text];
  };

  // Maximum lines per page (for mobile)
  const maxLinesPerPage = 20;

  // Split content into pages
  const pages = splitIntoPages(content, maxLinesPerPage);

  const handleMenuClick = () => {
    const userSlug = user.name?.toLowerCase().replace(/\s+/g, "-");
    navigate(`/${userSlug}`, { replace: true });
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
          onClick={handleEnhance}
          className="ml-auto font-semibold text-blue-500"
          disabled={isEnhancing}
        >
          {isEnhancing ? "Enhancing..." : "Enhance"}
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md p-4 text-black overflow-y-auto mt-4 max-h-[75vh]">
        {notes.length > 0 ? (
          <div>
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
                  style={{
                    height: "600px",
                    overflow: "hidden",
                    pageBreakAfter: "always",
                  }}
                >
                  <h2 className="text-lg font-semibold text-black text-center">
                    {hasUserInput
                      ? "📝 Catatan is unsaved, don't leave page!"
                      : flashMessage
                      ? `💾 Catatan ${flashMessage}...`
                      : "📒 Catatan"}
                  </h2>
                  <ReactQuill
                    ref= {quillRef}
                    theme="snow"
                    value={content}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    readOnly={flashMessage === "is saving!" ? true : false} // Conditional readOnly
                    style={{
                      height: "300px", 
                      minHeight: "500px", 
                      overflow: "auto", 
                      borderTop: "1px solid #e0e0e0", // Add separator between content and enhanced section
                      paddingTop: "20px",
                    }}
                    placeholder="Write your notes here..."
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
                  style={{
                    height: "600px",
                    overflow: "hidden",
                    pageBreakAfter: "always",
                  }}
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
  );
}