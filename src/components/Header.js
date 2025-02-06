import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import './Header.css';

const Header = ({ cartItems, onCartClick, searchTerm, setSearchTerm }) => {
  // Sepetteki toplam ürün sayısını hesapla
  const totalItems = cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

  // Sepetteki toplam fiyatı hesapla
  const totalPrice = cartItems?.reduce((total, item) => {
    return total + ((item.price || 0) * (item.quantity || 0));
  }, 0) || 0;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-main">
          <div className="header-left">
            <Link to="/" className="logo">
              E-SHOP
            </Link>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="header-actions">
            <Link to="/account" className="header-action-item">
              <FaUser />
              <span>Hesabım</span>
            </Link>
            <div className="header-action-item cart" onClick={onCartClick}>
              <FaShoppingCart />
              <span>Sepetim</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 