import { format, parseISO } from 'date-fns';
import emptyImage from '../../../images/emptyImage.jpg';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price, currency) => {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  if (currency === '$') {
    return formatter.format(price).replace('ARS', '').trim();
  }
  return formatter.format(price);
};

const Trip = ({
  id,
  image_url,
  name,
  dates,
  amenities,
  price,
  currency,
  onDeleteTrip
}) => {
  const navigate = useNavigate();
  
  return (
  <div key={id} className="trip-card">
    {id}
      <section 
        className="trip-image"
        style={{ backgroundImage: `url(${image_url || emptyImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      
      <div className="trip-card-title">
        <h3>{name}</h3>
      </div>
      <div className="trip-dates">
        <ul>
          {dates.map(date => (
            <li className="trip-date" key={date}>{format(parseISO(date), 'dd/MM/yyyy')}</li>
          ))}
        </ul>
      </div>
      
      {amenities && amenities.length > 0 && (
        <div className="trip-amenities">
          <ul>
            {amenities.map((amenity, index) => (
              <li className="trip-amenity" key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="trip-price">
        {formatPrice(price, currency)}
      </div>

      <div className="trip-actions">
        <button onClick={() => navigate(`/paquete/${id}`)}>Editar</button>
        <button>Deshabilitar</button>
        <button onClick={onDeleteTrip}>Eliminar</button>
      </div>
    </div>
  );
};

export default Trip;
