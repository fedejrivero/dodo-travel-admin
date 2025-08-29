import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TripPage.css';
import Rates from '../../components/rates';


const TripRatesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <h1>Tarifas</h1>
    
      <Rates tripId={id} />  

      <div className="form-actions">
        <button
          type="button"
          onClick={() => navigate(`/paquete/${id}`)}
          className="submit-button"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default TripRatesPage;