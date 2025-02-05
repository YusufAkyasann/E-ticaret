import React from 'react';
import './CategoryButtons.css';

const CategoryButtons = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="category-buttons">
      <button 
        className={`category-button ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onCategorySelect(null)}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons; 