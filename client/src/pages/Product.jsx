import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products', err));
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(prod => (
          <div key={prod._id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={prod.image} alt={prod.name} style={{ width: '100%' }} />
            <h3>{prod.name}</h3>
            <p>{prod.description}</p>
            <strong>₹{prod.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
