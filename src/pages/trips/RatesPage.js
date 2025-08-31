import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TripPage.css';
import { useState, useEffect } from 'react';
import { getRatesByTripId, createRate, deleteRate } from '../../services/rateService';
import Rates from '../../components/rates';


const RatesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rateFormData, setRateFormData] = useState({
    hotel: '',
    date: '',
    price: '',
    nights: '',
    busBed: null,
    regime: null,
    assist: false,
    excursions: false,
    currency: '$'
  });
  const [hasToUpdateRates, setHasToUpdateRates] = useState(true);  
  const [rates, setRates] = useState([]);  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currencies = [
    { value: '$', label: 'Pesos ($)' },
    { value: 'USD', label: 'Dólares (USD)' }
  ];

  const busBeds = [
    { value: null, label: 'N/A' },
    { value: 'Cama', label: 'Cama' },
    { value: 'Semicama', label: 'Semicama' }
  ];

  const regimes = [
    { value: null, label: 'Selecciona un régimen' },
    { value: 'Solo Alojamiento', label: 'Solo Alojamiento' },
    { value: 'Alojamiento y Desayuno', label: 'Alojamiento y Desayuno' },
    { value: 'Media Pensión', label: 'Media Pensión' },
    { value: 'Pensión Completa', label: 'Pensión Completa' },
    { value: 'Todo Incluido', label: 'Todo Incluido' }
  ];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rates = await getRatesByTripId(id);
        setRates(rates);
      } catch (error) {
        setError('Error al cargar las tarifas. Por favor, intente nuevamente.');
        console.error('Error fetching rates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (hasToUpdateRates) {
      fetchRates();
      setHasToUpdateRates(false);
    }
  }, [id, hasToUpdateRates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRateFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const removeRate = async (index) => {
    setError('');
    setSuccess('');
    rateFormData.trip_id = id;

    try {
      await  deleteRate(index);;
      setSuccess('¡Tarifa eliminada exitosamente!');
      setHasToUpdateRates(true);
    } catch (error) {
      console.error('Error deleting rate:', error);
      setError(error.message || 'Error al eliminar la tarifa. Por favor, intente nuevamente.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    rateFormData.trip_id = id;

    try {
      await createRate(rateFormData);
      setSuccess('¡Tarifa creada exitosamente!');
      setRateFormData({
        hotel: '',
        date: '',
        nights: '',
        busBed: null,
        regime: null,
        assist: false,
        excursions: false,
        price: '',
        currency: '$'
      });
      setHasToUpdateRates(true);
    } catch (error) {
      console.error('Error creating rate:', error);
      setError(error.message || 'Error al crear la tarifa. Por favor, intente nuevamente.');
    }
  };

  if (isLoading) {
    return <div className="loading">Cargando tarifas...</div>;
  }

  return (
    <div className="page-content">
      <h1>Tarifas</h1>
  
      <div className="rates-container">
          
        <div className="rates-container">
          <form onSubmit={handleSubmit} className="rates-form">
            <div className="form-group">
              <label>Hotel</label>
              <input
                type="text"
                name="hotel"
                placeholder="Agregar hotel"
                value={rateFormData.hotel}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                name="date"
                value={rateFormData.date}
                onChange={handleChange}
                placeholder="Agregar fecha"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Noches</label>
              <input
                type="text"
                name="nights"
                value={rateFormData.nights}
                onChange={handleChange}
                placeholder="Agregar noches"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Cama</label>
              <select
                name="busBed"
                value={rateFormData.busBed}
                onChange={handleChange}
                className="busBed-select"
              >
                {busBeds.map(busBed => (
                  <option key={busBed.value} value={busBed.value}>
                    {busBed.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Régimen</label>
              <select
                name="regime"
                value={rateFormData.regime}
                onChange={handleChange}
                className="regime-select"
                required
              >
                {regimes.map(regime => (
                  <option key={regime.value} value={regime.value}>
                    {regime.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Moneda</label>
              <select
                name="currency"
                value={rateFormData.currency}
                onChange={handleChange}
                className="currency-select"
                required
              >
                {currencies.map(currency => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Precio</label>
              <input
                type="text"
                name="price"
                value={rateFormData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Assist</label>
              <input
                type="checkbox"
                name="assist"
                checked={rateFormData.assist}
                onChange={handleChange}
                className="assist-checkbox"
              />
            </div>
            
            <div className="form-group">
              <label>Excursión</label>
              <input
                type="checkbox"
                name="excursions"
                checked={rateFormData.excursions}
                onChange={handleChange}
                className="excursions-checkbox"
              />
            </div>
            
            <div className="form-group">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!rateFormData.date || !rateFormData.hotel || !rateFormData.price}
                className="add-button"
              >
                Agregar
              </button>
            </div>
          </form>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>

      <Rates rates={rates} removeRate={removeRate} />

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
export default RatesPage;