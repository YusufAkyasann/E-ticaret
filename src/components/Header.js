import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import './Header.css';

const Header = ({ cartItems, onCartClick, onMenuClick }) => {
  const navigate = useNavigate();
  const cartItemCount = cartItems?.length || 0;

  const handleLogoClick = (e) => {
    // Mobil görünümde logo tıklamasını yakala
    if (window.innerWidth <= 768) {
      e.preventDefault();
      onMenuClick();
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-main">
        <div className="header-left">
          <button className="menu-button" onClick={onMenuClick}>
            <FaBars />
          </button>
          <Link to="/" className="logo" onClick={handleLogoClick}>
            E-SHOP
          </Link>
        </div>
        <div className="header-actions">
          <Link to="/account" className="header-action-item">
            <FaUser />
            <span>Hesabım</span>
          </Link>
          <div 
            onClick={onCartClick} 
            className="header-action-item cart" 
            style={{cursor: 'pointer'}}
          >
            <FaShoppingCart />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 