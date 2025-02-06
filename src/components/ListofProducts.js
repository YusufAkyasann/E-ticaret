import React from 'react';
import './ProductList.css';
import ProductCard from './ProductCard';

const ListofProducts = ({ products, onQuantityChange, cartItems, onAddToCart }) => {
  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onQuantityChange={onQuantityChange}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
        />
      ))}
    </div>
  );
};

export default ListofProducts;