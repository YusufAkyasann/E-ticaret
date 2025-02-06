import React, { useState } from 'react';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import { useNavigate } from 'react-router-dom';

const AccountPage = ({ cartItems }) => {
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
      <div className="account-container">
        <h1>Hesabım</h1>
        {/* Hesap sayfası içeriği buraya gelecek */}
      </div>
    </div>
  );
};

export default AccountPage; 