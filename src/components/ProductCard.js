import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onQuantityChange, cartItems }) => {
  // Get current quantity from cart items
  const currentQuantity = cartItems?.find(item => item.product.id === product.id)?.quantity || 0;

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className="quantity-controls">
        <button onClick={() => onQuantityChange(product.id, -1)}>-</button>
        <span className="quantity-display">{currentQuantity}</span>
        <button onClick={() => onQuantityChange(product.id, 1)}>+</button>
      </div>
    </div>
  );
};

export default ProductCard;