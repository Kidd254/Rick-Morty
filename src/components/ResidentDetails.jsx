import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-7">
          <img
            src={resident.details_image}
            alt={resident.details_name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-7 mt-4">
          <h3>{resident.details_name}</h3>
          <p className="mb-1">Status: {resident.details_status}</p>
          <p className="mb-1">Gender: {resident.details_gender}</p>
          <p className="mb-1">Species: {resident.details_species}</p>
          <p className="mb-1">Location: {resident.details_location}</p>
          <p className="mb-1">Origin: {resident.details_origin}</p>
        </div>
        <div className="col-md-7 mt-4">
          <button onClick={navigateToNoteForm} className="btn btn-primary">
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetails;
