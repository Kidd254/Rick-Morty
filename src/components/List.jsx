/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLocation } from '../redux/list/listSlice';
import { fetchResidents } from '../redux/location/residentsSlice';

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [residentMap, setResidentMap] = useState({});
  const { list, residents, status } = useSelector((state) => ({
    list: state.list.list,
    residents: state.residents.residents,
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
    // Update residentMap whenever residents are updated
    setResidentMap(
      residents.reduce((map, resident) => {
        map[resident.id] = resident;
        return map;
      }, {}),
    );
  }, [residents]);

  const handleResidentClick = (residentId) => {
    navigate(`/resident-details/${residentId}`);
  };

  // Function to shuffle array randomly
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
        && residentDetails.resident_name
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    });

    return locationNameMatch || residentsMatch;
  });
  // Shuffle the filteredLocations array randomly
  const shuffledLocations = shuffleArray([...filteredLocations]);

  // Variables to keep track of the number of cards rendered and the current location index
  let cardsInRow = 0;
  let currentLocationIndex = 0;

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <input
          type="text"
          placeholder="Search by location name or type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="row row-cols-1 row-cols-md-3 p-3">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error loading data</p>}
        {shuffledLocations.map((location) => {
          // Change location for every three cards
          if (cardsInRow === 3) {
            currentLocationIndex = (currentLocationIndex + 1) % shuffledLocations.length;
            cardsInRow = 0;
          }

          return (
            <div key={location.id} className="col mb-4">
              <div className="card p-3 border-info cursor-pointer">
                {location.residentURLs.map((residentURL) => {
                  const residentId = residentURL.split('/').pop();
                  const resident = residentMap[residentId];

                  if (resident) {
                    return (
                      <div
                        key={resident.id}
                        className="card-details border p-3 mb-4 bg-dark"
                        onClick={() => handleResidentClick(resident.id)}
                      >
                        <h3 className="card-title text-white">
                          {resident.resident_name}
                        </h3>
                        <p className="card-text text-white">
                          Status:
                          {' '}
                          {resident.resident_status}
                        </p>
                        <img
                          src={resident.resident_image}
                          alt={resident.resident_name}
                          className="card-img-top img-fluid rounded"
                        />

                        <div className="card mt-3 border-success">
                          <div className="card-body bg-secondary">
                            <h4 className="card-subtitle mb-2 text-light">
                              Location:
                              {' '}
                              {
                                shuffledLocations[currentLocationIndex]
                                  .list_name
                              }
                            </h4>
                            <p className="card-text text-white">
                              Type:
                              {' '}
                              {
                                shuffledLocations[currentLocationIndex]
                                  .list_type
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={residentURL} className="card-body">
                      <p className="card-text">
                        Resident data not available for URL:
                        {' '}
                        {residentURL}
                      </p>
                    </div>
                  );
                })}
              </div>
              {/* Add an empty column for spacing after every two cards on small screens */}
              {cardsInRow === 2 && (
                <div className="w-100 d-none d-md-block" />
              )}
              {/* Increment the number of cards in the row */}
              {cardsInRow++}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
