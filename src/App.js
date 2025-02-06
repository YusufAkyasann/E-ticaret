import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import AccountPage from './pages/AccountPage';
import { AuthProvider } from './context/AuthContext';

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
      <BrowserRouter>
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
          <Route path="/account" element={
            <AccountPage cartItems={cartItems} />
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;