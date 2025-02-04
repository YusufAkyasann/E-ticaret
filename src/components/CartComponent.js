import React from 'react';
import '../styles/CartComponent.css';


const CartComponent = ({ cartItems, onCartClick }) => {
  // Calculate total amount based on cart items
  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="cart-component">
      <span>Your Cart ({cartItems.length}) - ${totalAmount.toFixed(2)}</span>
      <button onClick={onCartClick}>
        🛍️
      </button>
    </div>
  );
};

export default CartComponent;