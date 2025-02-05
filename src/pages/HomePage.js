import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';
import SearchBar from '../components/SearchBar';
import { dummyProducts } from '../DummyProducts';
import ListofProducts from '../components/ListofProducts';
import './HomePage.css';

function HomePage({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const categories = ['Electronics', 'Clothing', 'Accessories'];
  const products = dummyProducts;
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter products based on category and search term
  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle search input change
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Handle quantity change
  const handleQuantityChange = (productId, delta) => {
    const existingItem = cartItems.find(item => item.product.id === productId);
    if (existingItem) {
      const newQuantity = existingItem.quantity + delta;
      if (newQuantity <= 0) {
        setCartItems(cartItems.filter(item => item.product.id !== productId));
      } else {
        setCartItems(cartItems.map(item =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        ));
      }
    } else if (delta > 0) {
      const product = products.find(p => p.id === productId);
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const handleCartClick = () => {
    navigate('/payment', { state: { cartItems } });
  };

  return (
    <div>
      <Header cartItems={cartItems} onCartClick={handleCartClick} />
      <div className="home-container">
        <SearchBar onSearch={handleSearch} />
        <CategoryButtons 
          categories={categories} 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect} 
        />
        <ListofProducts 
          products={filteredProducts} 
          onQuantityChange={handleQuantityChange}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
}

export default HomePage;