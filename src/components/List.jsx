/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLocation } from '../redux/list/listSlice';
import { fetchResidents } from '../redux/location/residentsSlice';
import { fetchEpisodes } from '../redux/episodes/episodesSlice';
import '../assets/styles/custom.css';

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [residentMap, setResidentMap] = useState({});
  const { list, residents, status } = useSelector((state) => ({
    list: state.list.list,
    residents: state.residents.residents,
    episodes: state.episodes.episodes,
    status: state.list.status,
  }));

  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch locations when the component mounts
    dispatch(getLocation());
  }, [dispatch]);

  useEffect(() => {
    // Fetch residents when the locations are available
    const fetchResidentsData = async () => {
      if (list.length > 0) {
        const residentURLs = list.reduce(
          (urls, location) => urls.concat(location.residentURLs),
          [],
        );

        await dispatch(fetchResidents(residentURLs));
      }
    };

    fetchResidentsData();
  }, [dispatch, list]);

  useEffect(() => {
    // Fetch residents when the locations are available
    const fetchEpisodeDetails = async () => {
      if (residents.length > 0) {
        const episodeURLs = residents.reduce(
          (urls, resident) => urls.concat(resident.episodeURLs),
          [],
        );

        await dispatch(fetchResidents(episodeURLs));
      }
    };

    fetchEpisodeDetails();
  }, [dispatch, residents]);

  useEffect(() => {
    // Update residentMap whenever residents are updated
    setResidentMap(
      residents.reduce((map, resident) => {
        map[resident.id] = resident;
        return map;
      }, {}),
    );
  }, [residents]);

  useEffect(() => {
    // Fetch episodes when the component mounts
    dispatch(fetchEpisodes());
  }, [dispatch]);

  const handleResidentClick = (residentId) => {
    navigate(`/resident-details/${residentId}`);
  };

  const filteredLocations = list.filter((location) => {
    const locationNameMatch = location.list_name
      .toLowerCase()
      .includes(filter.toLowerCase());

    const residentsMatch = location.residentURLs.some((residentURL) => {
      const residentId = residentURL.split('/').pop();
      const residentDetails = residentMap[residentId];

      return (
        residentDetails
        && (residentDetails.resident_name
          .toLowerCase()
          .includes(filter.toLowerCase())
          || location.list_name.toLowerCase().includes(filter.toLowerCase())
          || (residentDetails.episode_name
            && residentDetails.episode_name
              .toLowerCase()
              .includes(filter.toLowerCase())))
      );
    });

    const episodeNameMatch = location.residentURLs.some((residentURL) => {
      const residentId = residentURL.split('/').pop();
      const residentDetails = residentMap[residentId];

      return (
        residentDetails
        && residentDetails.episode_name
        && residentDetails.episode_name
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    });

    return locationNameMatch || residentsMatch || episodeNameMatch;
  });

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <input
          type="text"
          placeholder="Search by location name or resident name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="row row-cols-1 row-cols-md-3 p-3">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error loading data</p>}
        {filteredLocations.map((location) => (
          <div key={location.id} className="col mb-4">
            {location.residentURLs.map((residentURL) => {
              const residentId = residentURL.split('/').pop();
              const resident = residentMap[residentId];

              if (
                !resident
                || (filter
                  && !(
                    resident.resident_name
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                    || location.list_name
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                  ))
              ) {
                return null; // Skip if the resident or location doesn't match the filter
              }

              return (
                <div
                  key={resident.id}
                  className="card p-3 border-info cursor"
                  onClick={() => handleResidentClick(resident.id)}
                >
                  {/* Display resident details here */}
                  <div className="card-details border p-3 mb-4 bg-dark">
                    <h3 className="card-title text-white">
                      {resident.resident_name}
                    </h3>
                    <p className="card-text text-white">
                      Status:
                      {resident.resident_status}
                    </p>
                    <img
                      src={resident.resident_image}
                      alt={resident.resident_name}
                      className="card-img-top img-fluid rounded"
                    />
                  </div>
                  {/* Display location details here */}
                  <div className="card-body bg-secondary">
                    <h4 className="card-subtitle mb-2 text-light">
                      Location:
                      {location.list_name}
                    </h4>
                    <p className="card-text text-white">
                      Type:
                      {location.list_type}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
