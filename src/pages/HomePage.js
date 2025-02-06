import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import { dummyProducts } from '../DummyProducts';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

function HomePage({ cartItems, onAddToCart, onQuantityChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || 'all'
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

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
    const filtered = selectedCategory === 'all'
      ? dummyProducts
      : dummyProducts.filter(product => product.category === selectedCategory);
    
    setFilteredProducts(filtered);
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <Header 
        cartItems={cartItems} 
        onCartClick={() => navigate('/payment')}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      <div className="home-container">
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
    </div>
  );
}

export default HomePage;