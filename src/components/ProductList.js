import React from 'react';
import './ProductList.css';

function ProductList() {
  const products = [
    { id: 1, name: 'Ürün 1', price: 100, quantity: 2 },
    { id: 2, name: 'Ürün 2', price: 150, quantity: 1 },
  ];

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>Adet: {product.quantity}</p>
          </div>
          <div className="product-price">
            {product.price * product.quantity} TL
          </div>
        </div>
      ))}
      <div className="total">
        <strong>Toplam:</strong> 
        <span>{products.reduce((total, product) => total + (product.price * product.quantity), 0)} TL</span>
      </div>
    </div>
  );
}

export default ProductList; 