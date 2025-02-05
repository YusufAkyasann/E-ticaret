import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ cartItems, onCartClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? 'nav-button active' : 'nav-button';
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <h1 className="main-title">E-Ticaret Websitesi</h1>
        <div className="header-actions">
          <div className="cart-section">
            <span>Your Cart ({cartItems?.length || 0}) - ${cartItems?.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</span>
            <button onClick={onCartClick}>🛍️</button>
          </div>
          <div className="auth-section">
            <button className="auth-button">Login / Register</button>
          </div>
        </div>
      </div>
      <div className="nav-container">
        <button 
          className={getActiveClass('/')}
          onClick={() => navigate('/')}
        >
          Ana Sayfa
        </button>
        <button 
          className={getActiveClass('/about')}
          onClick={() => navigate('/about')}
        >
          Hakkımızda
        </button>
        <button 
          className={getActiveClass('/contact')}
          onClick={() => navigate('/contact')}
        >
          İletişim
        </button>
        <button 
          className={getActiveClass('/help')}
          onClick={() => navigate('/help')}
        >
          Yardım
        </button>
      </div>
    </div>
  );
};

export default Header; 