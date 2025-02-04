import React, { useState } from 'react';
import './CategoriesDrawer.css';

const CategoriesDrawer = ({ categories, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className={`categories-drawer ${isOpen ? 'open' : ''}`}>
      <button className="drawer-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className="drawer-content">
        <ul className="category-list">
          <li className="category-item" onClick={() => handleCategoryClick(null)}>
            All Products
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className="category-item"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesDrawer;