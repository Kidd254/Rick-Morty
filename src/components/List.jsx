import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLocation } from '../redux/list/listSlice';
import { fetchResidents } from '../redux/location/residentsSlice';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, residents, status } = useSelector((state) => ({
    list: state.list.list,
    residents: state.residents.residents,
    status: state.list.status
  }));

  const [filter, setFilter] = useState('');

  const residentMap = residents.reduce((map, resident) => {
    map[resident.id] = resident;
    return map;
  }, {});

  const filteredLocations = list.filter((location) => {
    const locationNameMatch = location.list_name
      .toLowerCase()
      .includes(filter.toLowerCase());

    const residentsMatch = location.residentURLs.some((residentURL) => {
      const residentId = residentURL.split('/').pop();
      const residentDetails = residentMap[residentId];

      return (
        residentDetails &&
        (residentDetails.resident_name
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
          filter
            .toLowerCase()
            .includes(residentDetails.resident_name.toLowerCase()))
      );
    });

    return locationNameMatch || residentsMatch;
  });

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
          []
        );

        console.log('Resident URLs:', residentURLs);

        await dispatch(fetchResidents(residentURLs));
      }
    };

    fetchResidentsData();
  }, [dispatch, list]);

  useEffect(() => {
    // This effect will run whenever residents are updated
    console.log('Residents after fetching:', residents);
    // You can perform additional actions that depend on residents here
  }, [residents]);

  const handleResidentClick = (residentId) => {
    navigate(`/resident-details/${residentId}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by location name or type"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading data</p>}
      {filteredLocations.map((location) => (
        <div key={location.id}>
          {location.residentURLs.map((residentURL) => {
            // Extract ID from the resident URL
            const residentId = residentURL.split('/').pop();

            // Find resident by ID using the mapping
            const resident = residentMap[residentId];

            // Check if there is a matching resident
            if (resident) {
              return (
                <div
                  key={resident.id}
                  onClick={() => handleResidentClick(resident.id)}
                >
                  <h3>{resident.resident_name}</h3>
                  <p>Status: {resident.resident_status}</p>
                  <img
                    src={resident.resident_image}
                    alt={resident.resident_name}
                  />
                  {/* Display location details */}
                  <h4>Location: {location.list_name}</h4>
                  <p>Type: {location.list_type}</p>
                </div>
              );
            }

            return (
              <div key={residentURL}>
                <p>Resident data not available for URL: {residentURL}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default List;
