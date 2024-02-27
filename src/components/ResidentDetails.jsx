import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDetails } from '../redux/Details/detailsSlice';

const ResidentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { residentId } = useParams();

  // Use useSelector to access the resident details from the Redux store
  const { details, status } = useSelector((state) => state.details);

  useEffect(() => {
    // Fetch details when the component mounts or residentId changes
    if (status !== 'loading' && details.length === 0) {
      dispatch(fetchDetails(residentId));
    }
  }, [dispatch, details, status, residentId]);

  const navigateToNoteForm = () => {
    // Navigate to the NoteForm route, passing the resident information
    navigate(`/note-form/${residentId}`);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!details || details.length === 0) {
    return <p>Resident details not available.</p>;
  }

  const resident = details[0]; // Assuming you are fetching a single resident

  return (
    <div>
      <img src={resident.details_image} alt={resident.details_name} />
      <h3>{resident.details_name}</h3>
      <p>Status: {resident.details_status}</p>
      <p>Gender: {resident.details_gender}</p>
      <p>Species: {resident.details_species}</p>
      <p>Location: {resident.details_location}</p>
      <p>Origin: {resident.details_origin}</p>
      

      <button onClick={navigateToNoteForm}>Add Note</button>
    </div>
  );
};

export default ResidentDetails;
