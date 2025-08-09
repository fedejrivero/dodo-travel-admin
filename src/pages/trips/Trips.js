import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getTrips, deleteTrip } from '../../services/tripService';
import './Trips.css';
import Trip from '../../components/trip';

const CATEGORIES = ['Nacional Bus', 'Nacional Aereo', 'Internacional', 'Grupal'];

const Trips = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get current category filter from URL or use 'all' as default
  const currentCategory = searchParams.get('categoria') || 'all';

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data);
      } catch (err) {
        setError('Error al cargar los paquetes. Por favor, intente nuevamente.');
        console.error('Error fetching trips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Filter trips based on selected category
  const filteredTrips = useMemo(() => {
    if (currentCategory === 'all') {
      return trips;
    }
    return trips.filter(trip => trip.category === currentCategory);
  }, [trips, currentCategory]);
  
  // Handle category filter change
  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('categoria');
    } else {
      params.set('categoria', category);
    }
    setSearchParams(params);
    // Scroll to top when changing filters
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteTrip = async (id) => {
    try {
      await deleteTrip(id);
      setTrips(prev => prev.filter(trip => trip.id !== id));
    } catch (err) {
      setError('Error al eliminar el paquete. Por favor, intente nuevamente.');
      console.error('Error deleting trip:', err);
    }
  };

  if (loading) {
    return <div className="page-content loading">Cargando paquetes...</div>;
  }

  if (error) {
    return <div className="page-content error">{error}</div>;
  }

  return (
    <div className="page-content trips-container">
      <div className="trips-header">
        <h1>Paquetes</h1>
        <button 
          className="add-trip-btn"
          onClick={() => navigate('/paquete/nuevo')}
        >
          + Nuevo Paquete
        </button>
      </div>
      
      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={`filter-btn ${currentCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          Todos
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`filter-btn ${currentCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {trips.length === 0 ? (
        <p>No hay paquetes disponibles en este momento.</p>
      ) : (
        <div className="trips">
          {filteredTrips.length === 0 ? (
            <div className="no-results">
              <p>No se encontraron paquetes en la categoría seleccionada.</p>
            </div>
          ) : (
            filteredTrips.map((trip) => (
            <Trip 
              key={trip.id}
              {...trip}
              onDeleteTrip={() => handleDeleteTrip(trip.id)}
            />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Trips;
