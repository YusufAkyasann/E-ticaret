import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderNavigation.css';

const HeaderNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="header-navigation">
      <button 
        className="nav-button"
        onClick={() => navigate('/about')}
      >
        Hakkımızda
      </button>
      <button 
        className="nav-button"
        onClick={() => navigate('/contact')}
      >
        İletişim
      </button>
      <button 
        className="nav-button"
        onClick={() => navigate('/help')}
      >
        Yardım
      </button>
    </div>
  );
};

export default HeaderNavigation; 