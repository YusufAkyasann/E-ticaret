import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './MobileSidebar.css';

const MobileSidebar = ({ 
  isOpen, 
  onClose, 
  selectedCategory, 
  onCategoryClick,
  isAuthenticated,
  user,
  onLogout
}) => {
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'Tüm Ürünler' },
    { id: 'Electronics', name: 'Elektronik' },
    { id: 'Accessories', name: 'Aksesuarlar' },
    { id: 'Clothing', name: 'Giyim' }
  ];

  const handleCategoryClick = (categoryId) => {
    onCategoryClick(categoryId);
    onClose();
    navigate('/', { 
      state: { selectedCategory: categoryId }
    });
  };

  const handleLogout = () => {
    onLogout();
    onClose();
    navigate('/');
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={onClose}>E-SHOP</Link>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-categories">
            <h3>Kategoriler</h3>
            {categories.map(category => (
              <button
                key={category.id}
                className={`sidebar-category ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="sidebar-footer">
            {isAuthenticated ? (
              <div className="account-section">
                <Link to="/account" className="account-link" onClick={onClose}>
                  <FaUser />
                  <span>{user?.name || 'Hesabım'}</span>
                </Link>
                <button 
                  className="sidebar-logout-button" 
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="auth-section">
                <Link to="/login" className="account-link" onClick={onClose}>
                  <FaUser />
                  <span>Giriş Yap / Üye Ol</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar; 