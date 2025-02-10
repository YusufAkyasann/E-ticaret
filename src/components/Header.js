import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaUser } from 'react-icons/fa';
import HeaderNavigation from './HeaderNavigation';
import './Header.css';

const Header = ({ cartItems, onCartClick, onMenuClick, isAuthenticated, user, onLogout }) => {
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

  const handleLogout = () => {
    onLogout();
    navigate('/');  // Ana sayfaya yönlendir
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
            {isAuthenticated ? (
              <div className="user-menu">
                <button 
                  className="user-button"
                  onClick={() => navigate('/account')}
                >
                  <FaUser />
                  <span className="user-name">
                    {user?.name || 'Hesabım'}
                  </span>
                </button>
                <button 
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  className="auth-button login"
                  onClick={() => navigate('/login')}
                >
                  Giriş Yap
                </button>
                <button 
                  className="auth-button signup"
                  onClick={() => navigate('/signup')}
                >
                  Üye Ol
                </button>
              </div>
            )}
            <div 
              onClick={onCartClick} 
              className="header-action-item cart"
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