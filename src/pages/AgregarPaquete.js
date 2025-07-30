import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../services/tripService';
import './AgregarPaquete.css';

const AgregarPaquete = () => {
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

  const categories = ['Nacional Bus', 'Nacional Aereo', 'Internacional', 'Grupal'];
  const currencies = [
    { value: '$', label: 'Pesos ($)' },
    { value: 'USD', label: 'Dólares (USD)' }
  ];

  const handleChange = (e) => {
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
    
    setFormData(prev => ({
      ...prev,
      dates: prev.dates.filter((_, i) => i !== index)
    }));
  };

  const handleAmenityChange = (e) => {
    setFormData(prev => ({
      ...prev,
      currentAmenity: e.target.value
    }));
  };

  const addAmenity = (e) => {
    e.preventDefault();
    if (!formData.currentAmenity.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      amenities: [...prev.amenities, formData.currentAmenity],
      currentAmenity: ''
    }));
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      
      // Upload the file
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir la imagen');
      }
      
      const { imageUrl, filename } = await response.json();
      
      setFormData(prev => ({
        ...prev,
        image_url: imageUrl,
        image_filename: filename
      }));
      
      setImagePreview(imageUrl);
      setError('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error.message || 'Error al subir la imagen');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.name.trim()) {
      setError('El nombre del paquete es obligatorio');
      return;
    }
    
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      setError('Ingrese un precio válido');
      return;
    }
    
    if (formData.amenities.length === 0) {
      setError('Agregue al menos un servicio incluido');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const tripData = {
        name: formData.name,
        category: formData.category,
        dates: formData.dates.filter(date => date), // Remove empty dates
        price: Number(formData.price),
        currency: formData.currency,
        amenities: formData.amenities.filter(a => a.trim() !== ''), // Remove empty amenities
        image_url: formData.image_url || null // Add image URL if available
      };
      
      await createTrip(tripData);
      setSuccess('¡Paquete creado exitosamente!');
      
      // Reset form
      setFormData({
        name: '',
        category: 'Nacional Bus',
        dates: [new Date().toISOString().split('T')[0]],
        price: '',
        currency: '$',
        amenities: [''],
        currentAmenity: '',
        image_url: ''
      });
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/paquetes');
      }, 1500);
      
    } catch (err) {
      console.error('Error al crear el paquete:', err);
      setError(err.message || 'Error al crear el paquete. Por favor, intente nuevamente.');
      if (err.details) {
        setError(prev => `${prev}: ${err.details.join(', ')}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-package-container">
      <div className="add-package-card">
        <h1>Nuevo Paquete Turístico</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Imagen del Paquete</label>
            <div className="image-upload-container">
              {uploadingImage ? (
                <div className="uploading-overlay">
                  <div className="spinner"></div>
                  <p>Subiendo imagen...</p>
                </div>
              ) : imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="change-image-btn"
                    onClick={() => document.getElementById('image-upload').click()}
                    disabled={uploadingImage}
                  >
                    Cambiar Imagen
                  </button>
                </div>
              ) : (
                <div 
                  className="upload-placeholder"
                  onClick={() => !uploadingImage && document.getElementById('image-upload').click()}
                >
                  <div className="upload-icon">+</div>
                  <div className="upload-text">Haz clic para subir una imagen</div>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                disabled={uploadingImage}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre del Paquete *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Paquete Playa del Carmen"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Categoría *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="currency">Moneda *</label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
              >
                {currencies.map(currency => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Fechas *</label>
            {formData.dates.map((date, index) => (
              <div key={index} className="date-input-container">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  required
                />
                {formData.dates.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-date-btn"
                    onClick={() => removeDate(index)}
                    title="Eliminar fecha"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              className="add-date-btn"
              onClick={addDate}
            >
              + Agregar otra fecha
            </button>
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Precio *</label>
            <div className="price-input-container">
              <span className="currency-symbol">
                {formData.currency === 'USD' ? 'US$' : '$'}
              </span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ej: 250000"
                min="0"
                step="1"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Servicios Incluidos *</label>
            <div className="amenities-list">
              {formData.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span>{amenity}</span>
                  <button 
                    type="button" 
                    className="remove-amenity-btn"
                    onClick={() => removeAmenity(index)}
                    title="Eliminar servicio"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="add-amenity-container">
              <input
                type="text"
                value={formData.currentAmenity}
                onChange={handleAmenityChange}
                placeholder="Ej: Traslado al aeropuerto"
              />
              <button 
                type="button" 
                className="add-amenity-btn"
                onClick={addAmenity}
              >
                Agregar
              </button>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/paquetes')}
              disabled={isSubmitting || uploadingImage}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting || uploadingImage || !formData.name || !formData.price || formData.amenities.length === 0}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Paquete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarPaquete;
