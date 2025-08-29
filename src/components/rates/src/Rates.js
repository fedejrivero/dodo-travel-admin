import React, { useState, useEffect } from 'react';
import { createRate, deleteRate, getRatesByTripId } from '../../../services/rateService';
import { format, parseISO } from 'date-fns';

const Rates = ({tripId}) => {

  const [rateFormData, setRateFormData] = useState({
    hotel: '',
    date: '',
    price: '',
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

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rates = await getRatesByTripId(tripId);
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
  }, [tripId, hasToUpdateRates]);

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
    rateFormData.trip_id = tripId;

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
    rateFormData.trip_id = tripId;

    try {
      await createRate(rateFormData);
      setSuccess('¡Tarifa creada exitosamente!');
      setRateFormData({
        hotel: '',
        date: '',
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
    <div className="rates-container">
      <h1>Tarifas</h1>
      
      <form onSubmit={handleSubmit} className="rates-form">
        
        <div className="form-group">
          <label>Tarifas</label>
          <div className="rates-container">
            <div className="rates-input">
              <input
                type="text"
                name="hotel"
                placeholder="Agregar hotel"
                value={rateFormData.hotel}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                value={rateFormData.date}
                onChange={handleChange}
                placeholder="Agregar fecha"
              />
              <div className="price-input">
                <select
                  name="currency"
                  value={rateFormData.currency}
                  onChange={handleChange}
                  className="currency-select"
                >
                  {currencies.map(currency => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
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
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!rateFormData.date || !rateFormData.hotel || !rateFormData.price}
                className="add-button"
              >
                Agregar
              </button>
            </div>
            
            <ul className="rates-list">
              {rates.map((rate) => (
                rate && (
                  <li key={rate.id} className="rate-item">
                    {rate.hotel} - {format(parseISO(rate.date), 'dd/MM/yyyy')} - {rate.currency}{rate.price}
                    <button
                      type="button"
                      onClick={() => removeRate(rate.id)}
                      className="remove-button"
                    >
                      ×
                    </button>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
};

export default Rates;