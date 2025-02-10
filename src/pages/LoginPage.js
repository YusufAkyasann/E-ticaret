import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import './LoginPage.css';

const LoginPage = ({ cartItems, onLogin }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada backend'e login isteği atılacak
    onLogin({ ...formData });
    navigate('/');
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
        selectedCategory="all"
        onCategoryClick={() => {}}
      />
      <div className="login-container">
        <div className="login-content">
          <h1>Giriş Yap</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>E-posta*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Şifre*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Giriş Yap
            </button>
          </form>
          <div className="login-footer">
            <p>Hesabınız yok mu? <button onClick={() => navigate('/signup')} className="signup-link">Üye Ol</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 