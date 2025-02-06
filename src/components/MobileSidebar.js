import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './MobileSidebar.css';

const MobileSidebar = ({ isOpen, onClose, selectedCategory, onCategoryClick }) => {
  const categories = [
    { id: 'all', name: 'Tüm Ürünler' },
    { id: 'Electronics', name: 'Elektronik' },
    { id: 'Accessories', name: 'Aksesuarlar' },
    { id: 'Clothing', name: 'Giyim' }
  ];

  const handleCategorySelect = (categoryId) => {
    onCategoryClick(categoryId);
    onClose();
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
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="sidebar-footer">
            <Link to="/account" className="account-link" onClick={onClose}>
              <FaUser />
              <span>Hesabım</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar; 