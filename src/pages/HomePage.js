import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';
import SearchBar from '../components/SearchBar';
import { dummyProducts } from '../DummyProducts';
import ListofProducts from '../components/ListofProducts';
import './HomePage.css';

function HomePage({ cartItems, addToCart, handleQuantityChange }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Kategorileri ürünlere göre düzenledik
  const categories = [
    { id: 'all', name: 'Tüm Ürünler' },
    { id: 'Electronics', name: 'Elektronik' }, // 4 ürün
    { id: 'Accessories', name: 'Aksesuarlar' }, // 3 ürün
    { id: 'Clothing', name: 'Giyim' } // 2 ürün
  ];

  // Ürünleri filtrele
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  useEffect(() => {
    let filtered = dummyProducts;
    
    // Kategori filtresi - kategori adları tam eşleşmeli
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };

  return (
    <div>
      <Header 
        cartItems={cartItems} 
        onCartClick={() => navigate('/payment')}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="home-container">
        <div className="categories-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
              <span className="category-count">
                {category.id === 'all' 
                  ? dummyProducts.length 
                  : dummyProducts.filter(p => p.category === category.id).length}
              </span>
            </button>
          ))}
        </div>
        <ListofProducts 
          products={filteredProducts} 
          cartItems={cartItems}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default HomePage;