import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriesDrawer from '../components/CategoriesDrawer';
import CartComponent from '../components/CartComponent';
import SearchBar from '../components/SearchBar';
import { dummyProducts } from '../DummyProducts';
import ListofProducts from '../components/ListofProducts';
import './HomePage.css';


function HomePage() {
  const navigate = useNavigate();
  const categories = ['Electronics', 'Clothing', 'Accessories'];
  const products = dummyProducts;
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  // Load cart items from localStorage on initial render
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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
      <h1 className="main-title">E-Ticaret Websitesi</h1>
      <div className="home-container">
        <CategoriesDrawer categories={categories} onCategorySelect={handleCategorySelect} />
        <SearchBar onSearch={handleSearch} />
        <CartComponent cartItems={cartItems} onCartClick={handleCartClick} />
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