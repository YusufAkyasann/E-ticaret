import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import { AuthProvider } from './context/AuthContext';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (productId, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <HomePage 
              cartItems={cartItems} 
              onAddToCart={handleAddToCart}
              onQuantityChange={handleQuantityChange}
            />
          } />
          <Route path="/payment" element={
            <PaymentPage 
              cartItems={cartItems} 
              handleQuantityChange={handleQuantityChange}
            />
          } />
          <Route path="/about" element={
            <AboutPage cartItems={cartItems} />
          } />
          <Route path="/contact" element={
            <ContactPage cartItems={cartItems} />
          } />
          <Route path="/help" element={
            <HelpPage cartItems={cartItems} />
          } />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;