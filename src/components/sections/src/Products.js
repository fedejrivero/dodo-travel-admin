import Title from "../../title";
import products from "../data/products";

const Products = () => (
  <div className="products">
    {products.map((product) => (
      <div key={product.title} className="product-container">
        <div 
          className="product"
          style={{ 
            backgroundImage: `url(${product.image})`, 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }}
        >
          <Title text={product.title} />
        </div>
      </div>
    ))}
  </div>
);

export default Products;
