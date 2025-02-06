import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';

function ContactPage({ cartItems }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCategoryClick = (categoryId) => {
    navigate('/', { state: { selectedCategory: categoryId } });
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
      <div className="page-container">
        <h2>İletişim</h2>
        {/* Content will be added later */}
      </div>
    </div>
  );
}

export default ContactPage; 