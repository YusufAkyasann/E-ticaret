import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import './AboutPage.css';

// Add font imports in the head of your HTML file or import in your main CSS
// <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

const AboutPage = ({ cartItems }) => {
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
      <div className="about-container">
        <h1>Hakkımızda</h1>
        <p className="about-text">
          AI kullanımı ve websitesi geliştirme yetilerimizi geliştirmek amacıyla bu e-ticaret websitesini oluşturan, Finnovation'da çalışan üniversite öğrencileriyiz.
        </p>
      </div>
    </div>
  );
};

export default AboutPage; 