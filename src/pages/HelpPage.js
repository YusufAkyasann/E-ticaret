import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import './HelpPage.css';

const HelpPage = ({ cartItems }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    problemCategory: '',
    problemDescription: ''
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
    // Handle form submission
    console.log(formData);
  };

  const problemCategories = [
    'Sipariş Durumu',
    'Ürün İadesi',
    'Ödeme Sorunu',
    'Teknik Problem',
    'Diğer'
  ];

  const handleCategoryClick = (categoryId) => {
    navigate('/', { 
      state: { selectedCategory: categoryId },
      replace: true 
    });
    setIsSidebarOpen(false);
  };

  const headerProps = {
    cartItems: cartItems,
    onCartClick: () => navigate('/payment'),
    onMenuClick: () => setIsSidebarOpen(true)
  };

  const sidebarProps = {
    isOpen: isSidebarOpen,
    onClose: () => setIsSidebarOpen(false),
    selectedCategory: 'all',
    onCategoryClick: handleCategoryClick
  };

  return (
    <div>
      <Header {...headerProps} />
      <MobileSidebar {...sidebarProps} />
      <div className="help-container">
        <div className="help-content">
          <div className="help-layout">
            {/* Left Column - Delivery Info */}
            <div className="help-section delivery-section">
              <h2>Teslimat Bilgileri</h2>
              <form onSubmit={handleSubmit} className="help-form">
                <div className="form-row">
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
                </div>
                <div className="form-row">
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
                    <label>Telefon*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Adres*</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Şehir*</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Posta Kodu*</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column - Problem Description */}
            <div className="help-section problem-section">
              <h2>Yardıma İhtiyacınız Olan Konuyu Açıklayınız</h2>
              <div className="form-group">
                <label>Sorun Kategorisi*</label>
                <select
                  name="problemCategory"
                  value={formData.problemCategory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Kategori Seçiniz</option>
                  {problemCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group problem-description-group">
                <label>Sorun Açıklaması*</label>
                <textarea
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  required
                  className="problem-description"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 