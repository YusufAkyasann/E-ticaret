import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onQuantityChange, onAddToCart, cartItems }) => {
  const getQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const quantity = getQuantity(product.id);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₺{product.price}</p>
        <div className="product-actions">
          {quantity > 0 ? (
            <div className="quantity-controls">
              <button onClick={() => onQuantityChange(product.id, -1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => onQuantityChange(product.id, 1)}>+</button>
            </div>
          ) : (
            <button 
              className="add-to-cart-button"
              onClick={() => onAddToCart(product)}
            >
              Sepete Ekle
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;