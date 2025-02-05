import React from 'react';
import Header from '../components/Header';

function HelpPage({ cartItems, onCartClick }) {
  return (
    <div>
      <Header cartItems={cartItems} onCartClick={onCartClick} />
      <div className="page-container">
        <h2>Yardım</h2>
        {/* Content will be added later */}
      </div>
    </div>
  );
}

export default HelpPage; 