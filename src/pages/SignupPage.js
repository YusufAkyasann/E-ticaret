import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import KVKKModal from '../components/KVKKModal';
import './SignupPage.css';

const SignupPage = ({ cartItems }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isKVKKModalOpen, setIsKVKKModalOpen] = useState(false);
  const [isAcikRizaModalOpen, setIsAcikRizaModalOpen] = useState(false);
  const [hasReadKVKK, setHasReadKVKK] = useState(false);
  const [hasReadAcikRiza, setHasReadAcikRiza] = useState(false);
  const kvkkContentRef = useRef(null);
  const acikRizaContentRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    kvkkAccepted: false,
    acikRizaAccepted: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleScroll = (ref, type) => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (type === 'kvkk') {
          setHasReadKVKK(true);
        } else {
          setHasReadAcikRiza(true);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    if (!formData.kvkkAccepted || !formData.acikRizaAccepted) {
      alert('Lütfen KVKK ve Açık Rıza metinlerini kabul ediniz.');
      return;
    }
    
    try {
      // Backend'e kayıt isteği atılacak
      // await registerUser(formData);

      // Kullanıcı verilerini localStorage'a kaydet
      const userData = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      navigate('/login');
    } catch (error) {
      alert('Kayıt sırasında bir hata oluştu!');
    }
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
      <div className="signup-container">
        <div className="signup-content">
          <h1>Üye Ol</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>Ad*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Soyad*</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
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
                minLength="8"
              />
            </div>
            <div className="form-group">
              <label>Şifre Tekrar*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                minLength="8"
              />
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="kvkkAccepted"
                  checked={formData.kvkkAccepted}
                  onChange={handleInputChange}
                  disabled={!hasReadKVKK}
                />
                <span className="checkbox-text">
                  <button 
                    type="button" 
                    className="modal-link"
                    onClick={() => setIsKVKKModalOpen(true)}
                  >
                    KVKK Aydınlatma Metni
                  </button>
                  'ni okudum ve kabul ediyorum
                </span>
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="acikRizaAccepted"
                  checked={formData.acikRizaAccepted}
                  onChange={handleInputChange}
                  disabled={!hasReadAcikRiza}
                />
                <span className="checkbox-text">
                  <button 
                    type="button" 
                    className="modal-link"
                    onClick={() => setIsAcikRizaModalOpen(true)}
                  >
                    Açık Rıza Metni
                  </button>
                  'ni okudum ve kabul ediyorum
                </span>
              </label>
            </div>
            <button type="submit" className="signup-button">
              Üye Ol
            </button>
          </form>
        </div>
      </div>

      <KVKKModal
        isOpen={isKVKKModalOpen}
        onClose={() => setIsKVKKModalOpen(false)}
        contentRef={kvkkContentRef}
        onScroll={() => handleScroll(kvkkContentRef, 'kvkk')}
        type="kvkk"
      />

      <KVKKModal
        isOpen={isAcikRizaModalOpen}
        onClose={() => setIsAcikRizaModalOpen(false)}
        contentRef={acikRizaContentRef}
        onScroll={() => handleScroll(acikRizaContentRef, 'acikRiza')}
        type="acikRiza"
      />
    </div>
  );
};

export default SignupPage; 