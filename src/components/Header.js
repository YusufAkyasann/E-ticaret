import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import HeaderNavigation from './HeaderNavigation';
import './Header.css';

const Header = ({ cartItems, onCartClick, onMenuClick }) => {
  const navigate = useNavigate();
  const cartItemCount = cartItems?.length || 0;

  const handleLogoClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      onMenuClick?.();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="header">
      <div className="header-content">
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
        <HeaderNavigation />
      </div>
    </div>
  );
};

export default Header; 