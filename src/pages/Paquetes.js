import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrips } from '../services/tripService';
import './Paquetes.css';

const Paquetes = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data);
        setError(null);
      } catch (err) {
        console.error('Error loading trips:', err);
        setError('Failed to load trips. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return <div className="page-content loading">Loading trips...</div>;
  }

  if (error) {
    return <div className="page-content error">{error}</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="page-content paquetes-container">
      <div className="paquetes-header">
        <h1>Our Travel Packages</h1>
        <button 
          className="add-package-btn"
          onClick={() => navigate('/paquetes/agregar')}
        >
          + Add New Package
        </button>
      </div>
      
      {trips.length === 0 ? (
        <p>No trips available at the moment.</p>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <div key={trip.id} className="trip-card">
              <div className="trip-image">
                {/* You can add trip images here */}
                <div className="placeholder-image">{trip.destination}</div>
              </div>
              <div className="trip-details">
                <h2>{trip.title}</h2>
                <p className="destination">
                  <i className="fas fa-map-marker-alt"></i> {trip.destination}
                </p>
                <p className="dates">
                  {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                </p>
                <p className="description">{trip.description}</p>
                <div className="trip-footer">
                  <span className="price">${trip.price}</span>
                  <button className="book-now">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Paquetes;
