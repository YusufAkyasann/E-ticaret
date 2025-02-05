import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import PaymentPage from './pages/PaymentPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCartClick = () => {
    window.location.href = '/payment';
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/about" element={<AboutPage cartItems={cartItems} onCartClick={handleCartClick} />} />
          <Route path="/contact" element={<ContactPage cartItems={cartItems} onCartClick={handleCartClick} />} />
          <Route path="/help" element={<HelpPage cartItems={cartItems} onCartClick={handleCartClick} />} />
          <Route path="/payment" element={<PaymentPage cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;