import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrip, updateTrip, createTrip, uploadImage } from '../../services/tripService';
import './TripPage.css';

const TripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Nacional Bus',
    dates: [new Date().toISOString().split('T')[0]],
    price: '',
    currency: '$',
    amenities: [''],
    currentAmenity: '',
    image_url: '',
    image_filename: ''
  });
  
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['Nacional Bus', 'Nacional Aereo', 'Internacional', 'Grupal'];
  const currencies = [
    { value: '$', label: 'Pesos ($)' },
    { value: 'USD', label: 'Dólares (USD)' }
  ];

  useEffect(() => {
    if (id) {
      const fetchTrip = async () => {
        try {
          const trip = await getTrip(id);
          setFormData({
            ...trip,
            currentAmenity: '',
            dates: trip.dates && trip.dates.length > 0 ? trip.dates : [new Date().toISOString().split('T')[0]]
          });
          if (trip.image_url) {
            setImagePreview(trip.image_url);
          }
        } catch (error) {
          setError('Error al cargar el viaje. Por favor, intente nuevamente.');
          console.error('Error fetching trip:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTrip();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (index, value) => {
    const newDates = [...formData.dates];
    newDates[index] = value;
    setFormData(prev => ({
      ...prev,
      dates: newDates
    }));
  };

  const addDate = () => {
    setFormData(prev => ({
      ...prev,
      dates: [...prev.dates, '']
    }));
  };

  const removeDate = (index) => {
    if (formData.dates.length <= 1) return;
    const newDates = formData.dates.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      dates: newDates
    }));
  };

  const handleAmenityChange = (e) => {
    setFormData(prev => ({
      ...prev,
      currentAmenity: e.target.value
    }));
  };

  const addAmenity = () => {
    if (!formData.currentAmenity.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      amenities: [...prev.amenities, formData.currentAmenity],
      currentAmenity: ''
    }));
  };

  const removeAmenity = (index) => {
    const newAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      amenities: newAmenities
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageData = await uploadImage(file);
      
      setFormData(prev => ({
        ...prev,
        image_url: imageData.imageUrl,
        image_filename: imageData.filename
      }));
      console.log(imageData);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error al cargar la imagen. Por favor, intente nuevamente.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Filter out empty amenities
      const filteredAmenities = formData.amenities.filter(amenity => amenity.trim() !== '');
      console.log(filteredAmenities);
      const tripData = {
        ...formData,
        amenities: filteredAmenities,
        price: Number(formData.price),
        dates: formData.dates.filter(date => date)
      };
      console.log(tripData);
      if (id) {
        await updateTrip(id, tripData);
        setSuccess('¡Viaje actualizado exitosamente!');
      } else {
        await createTrip(tripData);
        setSuccess('¡Viaje creado exitosamente!');
      }
      
     
      setTimeout(() => {
        navigate('/paquetes');
      }, 1500);
    } catch (error) {
      console.error('Error updating trip:', error);
      setError(error.message || 'Error al actualizar el viaje. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Cargando viaje...</div>;
  }

  return (
    <div className="page-content new-trip-container">
      {id ? <h1>Editar Viaje</h1> : <h1>Crear Viaje</h1>}
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label>Nombre del Viaje</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Fechas</label>
          {formData.dates.map((date, index) => (
            <div key={index} className="date-input-group">
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                required
              />
              {formData.dates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDate(index)}
                  className="remove-button"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addDate} className="add-button">
            Agregar Fecha
          </button>
        </div>
        
        <div className="form-group">
          <label>Precio</label>
          <div className="price-input">
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="currency-select"
            >
              {currencies.map(currency => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Comodidades</label>
          <div className="amenities-container">
            <div className="amenity-input">
              <input
                type="text"
                value={formData.currentAmenity}
                onChange={handleAmenityChange}
                placeholder="Agregar comodidad"
              />
              <button
                type="button"
                onClick={addAmenity}
                disabled={!formData.currentAmenity.trim()}
                className="add-button"
              >
                Agregar
              </button>
            </div>
            
            <ul className="amenities-list">
              {formData.amenities.map((amenity, index) => (
                amenity && (
                  <li key={index} className="amenity-item">
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
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
        
        <div className="form-group">
          <label>Imagen del Viaje</label>
          <div className="image-upload">
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Vista previa" />
              </div>
            )}
            <div className="file-input-container">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              <label htmlFor="image-upload" className="file-input-label">
                {uploadingImage ? 'Subiendo...' : 'Seleccionar Imagen'}
              </label>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-button"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || uploadingImage}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripPage;