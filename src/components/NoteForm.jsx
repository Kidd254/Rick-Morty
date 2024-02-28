import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const NoteForm = () => {
  const { residentId } = useParams();
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved note for the resident if any
    const storedNote = localStorage.getItem(`note_${residentId}`);
    if (storedNote) {
      setSavedNote(storedNote);
    }
  }, [residentId]);

  const saveNote = () => {
    try {
      // Save the note for the specific resident
      localStorage.setItem(`note_${residentId}`, note);
      // Update the state to display the saved note
      setSavedNote(note);
    } catch (error) {
      // Intentionally left empty
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <Link to="/" className="btn btn-primary">Home</Link>
        </div>
        <div className="col text-end">
          <button type="button" onClick={() => navigate(`/resident-details/${residentId}`)} className="btn btn-primary">Resident Details</button>
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-7">
          <h3>
            Resident:
            {residentId}
          </h3>
          <textarea
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-control"
          />
          <button type="button" onClick={saveNote} className="btn btn-primary mt-3">
            Save Note
          </button>
        </div>
        <div className="col-md-7 mt-4">
          {savedNote && (
            <div className="alert alert-success" role="alert">
              <strong>Saved Note:</strong>
              {' '}
              {savedNote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
