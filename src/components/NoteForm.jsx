// NoteForm.js

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteForm = () => {
  const { residentId } = useParams(); // Assuming you have a route parameter for residentId
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  const saveNote = () => {
    // Implement logic to persist the note, you can use local storage or any other state management approach
    try {
      // Save the note for the specific resident, you might want to use a unique key for each resident
      localStorage.setItem(`note_${residentId}`, note);
      // You can also update the resident object in some global state with the new note
      // Redirect back to the ResidentDetails screen or any other screen after saving
      navigate(`/resident-details/${residentId}`);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Add a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={saveNote}>Save Note</button>
    </div>
  );
};

export default NoteForm;
