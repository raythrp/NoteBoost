import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/desktop/NavbarDesktop';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { useNotes } from '../../contexts/NoteContext';

function EditNotePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { notes, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const noteId = parseInt(id);
    const note = notes.find((note) => note.id === noteId);

    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      navigate('/');
    }
  }, [id, navigate, notes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteId = parseInt(id);
    await updateNote(noteId, title, content);
    navigate('/');
  };

  return (
    <div className="min-h-screen blue-gradient-bg">
      <Navbar />

      <div className="container px-4 py-8 mx-auto content-container">
        <Card className="max-w-3xl p-6 mx-auto">
          <h1 className="mb-6 text-2xl font-bold">Edit Note</h1>

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
                rows={10}
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
