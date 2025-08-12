import emptyImage from '../../../images/emptyImage.jpg';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const getCategoryClass = (category) => {
  if (!category) return '';
  return category.toLowerCase().replace(/\s+/g, '-');
};

const Trip = ({
  id,
  image_url,
  name,
  category,
  price,
  currency,
  dates,
  amenities,
  onDeleteTrip
}) => {
  const navigate = useNavigate();
  const formatDates = dates.map((date) => format(parseISO(date), 'dd/MM/yyyy'));

  return (
  <div key={id} className="trip-card"> 
      <div className="trip-card-header">
        <div className="trip-card-image">
          <section 
            className="section"
            style={{ backgroundImage: `url(${image_url || emptyImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <span className={`trip-category ${getCategoryClass(category)}`}>
              {category}
            </span>
          </section>
        </div>
        <div className="trip-card-content">
          <div className="trip-card-title">
            <h3>{name}</h3>
          </div>
          <div className="trip-dates">
            <h4>Salidas:</h4>
            {formatDates.join(' - ')}
            {/* {dates.map((date, index) => (
              <p key={index}>{format(parseISO(date), 'dd/MM/yyyy')}</p>
            ))} */}
          </div>
        
          {amenities && amenities.length > 0 && (
            <div className="trip-amenities">
              <h4>Incluye:</h4>
              <ul>
                {amenities.map((amenity, index) => (
                  <li className="trip-amenity" key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="trip-card-footer">
        <div className="trip-price">
          <h3>{currency}</h3>
          <h3>{price}</h3>
        </div>
        <div className="trip-actions">
          <button className="icon-button" onClick={() => navigate(`/paquete/${id}`)} title="Editar">✏️</button>
          <button className="icon-button" onClick={onDeleteTrip} title="Eliminar">🗑️</button>
        </div>
      </div>
    </div>
    );
};

export default Trip;
