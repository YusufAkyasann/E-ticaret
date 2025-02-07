import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import './ContactPage.css';

const ContactPage = ({ cartItems }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCategoryClick = (categoryId) => {
    navigate('/', { 
      state: { selectedCategory: categoryId },
      replace: true 
    });
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <Header 
        cartItems={cartItems} 
        onCartClick={() => navigate('/payment')}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCategory="all"
        onCategoryClick={handleCategoryClick}
      />
      <div className="contact-container">
        <h1>İletişim</h1>
        {/* İletişim sayfası içeriği */}
      </div>
    </div>
  );
};

export default ContactPage; 