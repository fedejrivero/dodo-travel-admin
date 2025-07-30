import { format, parseISO } from 'date-fns';
import emptyImage from '../../../images/emptyImage.jpg';

const formatDateRange = (dates) => {
  if (!dates || dates.length === 0) return 'Sin fechas definidas';
  
  const sortedDates = [...dates].sort();
  const startDate = format(parseISO(sortedDates[0]), 'dd/MM/yyyy');
  
  if (sortedDates.length === 1) {
    return startDate;
  }
  
  const endDate = format(parseISO(sortedDates[sortedDates.length - 1]), 'dd/MM/yyyy');
  return `${startDate} - ${endDate}`;
};
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

const getCategoryClass = (category) => {
  if (!category) return '';
  return category.toLowerCase().replace(/\s+/g, '-');
};

const Trip = ({trip}) => (
 <div key={trip.id} className="trip-card">
    <div className="trip-card-header">
      <section 
        className="section"
        style={{ backgroundImage: `url(${trip.image_url || emptyImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <span className={`trip-category ${getCategoryClass(trip.category)}`}>
          {trip.category}
        </span>
      </section>
    </div>
    
    <div className="trip-card-content">
      <div className="trip-card-title">
        <h3>{trip.name}</h3>
      </div>
      <div className="trip-dates">
        <h4>Salidas:</h4>
        {formatDateRange(trip.dates)}
      </div>
     
      {trip.amenities && trip.amenities.length > 0 && (
        <div className="trip-amenities">
          <h4>Incluye:</h4>
          <ul>
            {trip.amenities.map((amenity, index) => (
              <li className="trip-amenity" key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

    <div className="trip-card-footer">
      <div className="trip-price">
        {formatPrice(trip.price, trip.currency)}
      </div>
    </div>
  </div>
);

export default Trip;
