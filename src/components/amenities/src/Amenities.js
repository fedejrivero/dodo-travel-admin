
const Amenities = ({amenities}) => (
  <div className="amenities">
    <ul>
      {amenities.map((amenity, index) => (
        <li key={index} className="amenity">
          {amenity}
        </li>
      ))}
    </ul>
  </div>
);

export default Amenities;
