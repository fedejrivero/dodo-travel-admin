import { Link } from 'react-router-dom';
import Title from "../../title";
import categories from "../data/categories";

const Categories = () => (
  <div className="categories">
    {categories.map((category) => (
      <div className="categories-container">
        <Link 
          key={category.title} 
          to={`paquetes?categoria=${category.category}`} 
          style={{ textDecoration: 'none' }}
        >
          <div 
            className="category"
            style={{ 
              backgroundImage: `url(${category.image})`, 
              backgroundSize: "cover", 
              backgroundPosition: "center" 
            }}
          >
            <Title text={category.title} />
          </div>
        </Link>
      </div>
    ))}
  </div>
);

export default Categories;
