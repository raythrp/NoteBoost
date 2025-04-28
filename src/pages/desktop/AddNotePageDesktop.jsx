import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X, Upload, ChevronDown } from 'react-feather';
import Navbar from '../../components/desktop/NavbarDesktop';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { useNotes } from '../../contexts/NoteContext';
import { uploadImageAndSaveNote } from '../../services/noteService';
import { useAuth } from "../../contexts/AuthContext";


function AddNotePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addNote } = useNotes();
  const [topic, setTopic] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [subject, setSubject] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { user } = useAuth();

  // Check if we should show the upload modal immediately
  useEffect(() => {
    if (searchParams.get('upload') === 'true') {
      setShowUploadModal(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNote(topic, selectedClass, subject);
    navigate('/catatan');

    await addNote(title, content);
    const userSlug = user?.name.toLowerCase().replace(/\s+/g, "-");
    if (userSlug) {
      navigate(`/${userSlug}`, { replace: true });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="container px-4 py-8 mx-auto content-container">
        <Card className="max-w-3xl p-6 mx-auto">
          <h1 className="mb-6 text-2xl font-bold">Add New Note</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Topic field */}
            <div>
              <label htmlFor="topic" className="block mb-1 text-sm font-medium">
                Topic
              </label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter note topic"
                required
              />
            </div>

            {/* Class field */}
            <div>
              <label htmlFor="class" className="block mb-1 text-sm font-medium">
                Class
              </label>
              <div className="relative">
                <select
                  id="class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md appearance-none border-black/25"
                >
                  <option value="">Pick Your Class</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
                <div className="absolute transform -translate-y-1/2 pointer-events-none right-3 top-1/2">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Subject field */}
            <div>
              <label htmlFor="subject" className="block mb-1 text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                rows={10}
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowUploadModal(true)}
              >
                Upload Image
              </Button>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button type="submit">Save Note</Button>
            </div>
          </form>
        </Card>
      </div>

      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
    </div>
  );
}

function UploadModal({ onClose }) {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadComplete = async () => {
    // if (uploadedFile) {
    //   await addNote(title || uploadedFile.name, `Uploaded file: ${uploadedFile.name}`);
    //   navigate('/');
    // } else {
    //   onClose();
    // }
    if (!uploadedFile) {
      setError('No file selected.');
      return;
    }
  
  
    try {
      // Call the uploadImageAndSaveNote function passing necessary parameters
      const note = await uploadImageAndSaveNote(uploadedFile, title, "", "", "");
  
      // If note is successfully saved, navigate to catatan page
      if (note) {
        console.log(`[${new Date().toLocaleTimeString()}] Note berhasil disimpan:`, note);
        navigate('/catatan');  // Navigate to the notes page if saved successfully
      } else {
        setError('Failed to extract text or save the note.');
      }
    } catch (err) {
      console.error('Error during image upload and note save:', err);
      setError('An error occurred while processing the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="bg-white p-8 rounded-lg w-[500px] max-w-full relative">
        <button className="absolute text-gray-500 top-2 right-2 hover:text-gray-700" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="mb-8 text-2xl font-medium text-center">UPLOAD</h2>

        <div className="flex flex-col items-center justify-center gap-4">
          {uploadedFile ? (
            <div className="w-full">
              <p className="mb-4 text-center text-green-600">
                File selected: {uploadedFile.name}
              </p>
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
                <Upload size={100} strokeWidth={1.5} />
              </div>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="bg-[#215273] text-white w-[210px] h-[52px] text-xl flex items-center justify-center rounded-md cursor-pointer"
              >
                EXPLORE
              </label>

              <p className="mt-4 text-center text-gray-700">or drag the photo here</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNotePage;
