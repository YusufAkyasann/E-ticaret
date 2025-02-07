import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderNavigation.css';

const HeaderNavigation = () => {
  return (
    <nav className="header-navigation">
      <div className="nav-container">
        <Link to="/about" className="nav-link">Hakkımızda</Link>
        <Link to="/contact" className="nav-link">İletişim</Link>
        <Link to="/help" className="nav-link">Yardım</Link>
      </div>
    </nav>
  );
};

export default HeaderNavigation; 