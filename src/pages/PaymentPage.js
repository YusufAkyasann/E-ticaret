import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import { FaCreditCard, FaLock, FaPaypal } from 'react-icons/fa';
import PaymentButtons from '../components/PaymentButtons';
import './PaymentPage.css';

const PaymentPage = ({ cartItems, handleQuantityChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Telefon numarası için özel kontrol
    if (name === 'phone') {
      // Sadece rakamları al
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Toplam fiyat hesaplama
  const calculateTotal = () => {
    const total = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return total + (itemPrice * quantity);
    }, 0);
    
    return total.toFixed(2);
  };

  const handleCategoryClick = (categoryId) => {
    navigate('/', { 
      state: { selectedCategory: categoryId },
      replace: true 
    });
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
        selectedCategory="all"
        onCategoryClick={handleCategoryClick}
      />
      <div className="payment-page-container">
        <div className="payment-content">
          <div className="delivery-section">
            <h2>Teslimat Bilgileri</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Ad*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Soyad*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
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
                <label>Telefon*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength="11" // Maksimum 11 rakam (örn: 05551234567)
                  placeholder="05551234567"
                  pattern="[0-9]*" // Sadece rakam
                  required
                />
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
          </div>

          <div className="order-summary">
            <h2>Sipariş Özeti</h2>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <div className="item-price-qty">
                      <span className="price">₺{item.price}</span>
                      <div className="quantity-controls">
                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-details">
              <div className="summary-line">
                <span>Ara Toplam</span>
                <span>₺{calculateTotal()}</span>
              </div>
              <div className="summary-line">
                <span>Kargo</span>
                <span>Ücretsiz</span>
              </div>
              <div className="summary-line total">
                <span>Toplam</span>
                <span>₺{calculateTotal()}</span>
              </div>

              <PaymentButtons totalAmount={calculateTotal()} />
              <div className="secure-payment">
                <FaLock />
                <p>256-bit SSL güvenli ödeme</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;



