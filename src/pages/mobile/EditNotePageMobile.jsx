import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/mobile/NavbarMobile';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { useNotes } from '../../contexts/NoteContext';

function EditNotePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { notes, updateNote } = useNotes();
  const [topic, setTopic] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    console.log("Available notes:", notes);
    console.log("Looking for noteId:", id);
    const note = notes.find((note) => parseInt(note.id) === id);

    if (note) {
      setTopic(note.topic);
      setSelectedClass(note.selectedClass);
      setSubject(note.subject);
    } else {
      navigate('/');
    }
  }, [id, navigate, notes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteId = parseInt(id);
    await updateNote(noteId, topic, selectedClass, subject);
    navigate(`/catatan/${note.id}`);
  };

  return (
    <div className="min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="container px-4 py-8 mx-auto content-container">
        <Card className="max-w-3xl p-6 mx-auto">
          <h1 className="mb-6 text-2xl font-bold">Edit Note</h1>

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
                required
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button type="submit">Update Note</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}


export default EditNotePage;
