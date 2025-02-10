import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sayfa yüklendiğinde localStorage'dan kullanıcı verilerini al
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setUser(userData);
    }
  }, []);

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

  const handleLogin = (loginData) => {
    // localStorage'dan kayıtlı kullanıcı verilerini al
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      // Login formundan gelen email ile kayıtlı email eşleşiyorsa
      if (userData.email === loginData.email) {
        setIsAuthenticated(true);
        setUser(userData);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Ana sayfaya yönlendir
    window.location.href = '/';  // Tam sayfa yenileme için
    // Alternatif olarak: navigate('/'); kullanılabilir
  };

  const handleUpdateUser = async (userData) => {
    try {
      // Backend'e güncelleme isteği atılacak
      // await updateUser(userData);
      
      // localStorage'daki kullanıcı verilerini güncelle
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <HomePage 
            cartItems={cartItems} 
            onAddToCart={handleAddToCart}
            onQuantityChange={handleQuantityChange}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        } />
        <Route path="/payment" element={
          <PaymentPage 
            cartItems={cartItems} 
            handleQuantityChange={handleQuantityChange}
            isAuthenticated={isAuthenticated}
            user={user}
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
        <Route path="/signup" element={
          <SignupPage cartItems={cartItems} />
        } />
        <Route path="/login" element={
          <LoginPage 
            cartItems={cartItems}
            onLogin={handleLogin}
          />
        } />
        <Route path="/account" element={
          <AccountPage 
            cartItems={cartItems}
            user={user}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;