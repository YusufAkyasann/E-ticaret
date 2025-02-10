import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    district: ''
  });
  const { login, register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // In a real app, you'd validate credentials here
      login(formData);
    } else {
      register(formData);
    }
    onClose();
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Ad Soyad"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="İl"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="district"
                placeholder="İlçe"
                value={formData.district}
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="Adres"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button type="submit">
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>
        <button 
          className="switch-auth-mode" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten üye misiniz? Giriş yapın'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal; 