import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import SearchBar from '../components/SearchBar';
import { dummyProducts } from '../DummyProducts';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

function HomePage({ cartItems, onAddToCart, onQuantityChange, isAuthenticated, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || 'all'
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [searchTerm, setSearchTerm] = useState('');

  // Kategorileri ürünlere göre düzenledik
  const categories = [
    { id: 'all', name: 'Tüm Ürünler' },
    { id: 'Electronics', name: 'Elektronik' },
    { id: 'Accessories', name: 'Aksesuarlar' },
    { id: 'Clothing', name: 'Giyim' }
  ];

  useEffect(() => {
    // Location state'den gelen kategoriyi kontrol et
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      // State'i temizle
      navigate('/', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    let filtered = selectedCategory === 'all'
      ? dummyProducts
      : dummyProducts.filter(product => product.category === selectedCategory);

    // Add search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Header 
        cartItems={cartItems} 
        onCartClick={() => navigate('/payment')}
        onMenuClick={() => setIsSidebarOpen(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />
      <div className="home-container">
        <SearchBar onSearch={handleSearch} />
        <div className="categories-container desktop-only">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              cartItems={cartItems}
              onAddToCart={onAddToCart}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      </div>
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />
    </div>
  );
}

export default HomePage;