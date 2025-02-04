import React from 'react';
import './ProductList.css';
import ProductCard from './ProductCard';

const ListofProducts = ({ products, onQuantityChange, cartItems }) => {
  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onQuantityChange={onQuantityChange}
          cartItems={cartItems}
        />
      ))}
    </div>
  );
};

export default ListofProducts;