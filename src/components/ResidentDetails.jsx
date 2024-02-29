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
    <div className="container mt-5 border-primary p-1 rounded">
      <div className="row mb-4">
        <div className="col">
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center border p-2 card bg-light">
        <div className="col-md-5 justify-content-center border border-secondary border p-2 bg-dark p-2 rounded">
          <img
            src={resident.details_image}
            alt={resident.details_name}
            className="img-fluid rounded mx-auto d-block"
          />
        </div>
        <div className="col-md-5 mt-3 text-white bg-dark border border-secondary p-3 rounded">
          <h3>{resident.details_name}</h3>
          <p className="mb-1">
            <strong>Status:</strong>
            {' '}
            {resident.details_status}
          </p>
          <p className="mb-1">
            <strong>Gender:</strong>
            {' '}
            {resident.details_gender}
          </p>
          <p className="mb-1">
            <strong>Species:</strong>
            {' '}
            {resident.details_species}
          </p>
          <p className="mb-1">
            <strong>Location:</strong>
            {' '}
            {resident.details_location}
          </p>
          <p className="mb-1">
            <strong>Origin:</strong>
            {' '}
            {resident.details_origin}
          </p>
        </div>
        <div className="col-md-4 mt-4 border-secondary p-3 rounded">
          <button
            type="button"
            onClick={navigateToNoteForm}
            className="btn btn-primary mx-auto d-block"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetails;
