import { Link } from 'react-router-dom';
import emptyImage from '../../../images/emptyImage.jpg';
import Amenities from '../../amenities';
import Title from '../../title';

const getCategoryClass = (category) => {
  if (!category) return '';
  return category.toLowerCase().replace(/\s+/g, '-');
};

const TripCard = ({
  id,
  name,
  dates,
  category,
  price,
  currency,
  amenities,
  image_url
}) => { 

  return (
  <Link to={`/paquete/${id}`} className="trip-card-link">
    <div className="trip-card">
      <div className="trip-card-header">
        <div className="trip-card-image">
          <section 
            className="section"
            style={{ backgroundImage: `url(${image_url || emptyImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <span className={`trip-card-category ${getCategoryClass(category)}`}>
              {category}
            </span>
          </section>
        </div>
        <div className="trip-card-content">
          <div className="trip-card-title">
            <h3>{name}</h3>
            {dates && <p className="trip-card-dates">{dates}</p>}
          </div>

          <div className="trip-card-amenities">
            <h4>Incluye:</h4>
            {amenities && (
              <Amenities amenities={amenities} />
            )}
          </div>
        

        </div>

      </div>

      <div className="trip-card-bottom">
        <Title text="Ver fechas y disponibilidad" />

        <div className="trip-card-footer">
          <div className="trip-card-price">
            <h4>Desde</h4>
            <div className="price-amount">
              <span className="currency">{currency}</span>
              <span className="amount">{price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
  )
};

export default TripCard;
