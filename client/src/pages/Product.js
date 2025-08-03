import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="product-page">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
