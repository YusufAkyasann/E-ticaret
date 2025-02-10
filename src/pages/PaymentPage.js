import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileSidebar from '../components/MobileSidebar';
import { FaCreditCard, FaLock, FaPaypal } from 'react-icons/fa';
import PaymentButtons from '../components/PaymentButtons';
import './PaymentPage.css';

const PaymentPage = ({ cartItems, handleQuantityChange, isAuthenticated, user, onLogout }) => {
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

  // Kullanıcı bilgilerini form'a doldurma
  useEffect(() => {
    if (isAuthenticated && user) {
      // console.log("Gelen user verisi:", user); // Debug için
      setFormData(prevData => ({
        ...prevData,
        firstName: user.name || '',           // name -> firstName eşleşmesi
        lastName: user.surname || '',         // surname -> lastName eşleşmesi
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || ''
      }));
    }
  }, [isAuthenticated, user]);

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Giriş yapmamış kullanıcılar için form değişikliklerini izleme
  const handleInputChange = (e) => {
    if (!isAuthenticated) {  // Sadece giriş yapmamış kullanıcılar için form değişikliğine izin ver
      const { name, value } = e.target;
      if (name === 'phone') {
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
        isAuthenticated={isAuthenticated}
        user={user}
      />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCategory="all"
        onCategoryClick={(categoryId) => navigate('/', { state: { selectedCategory: categoryId } })}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
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
                  readOnly={isAuthenticated}
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
                  readOnly={isAuthenticated}
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
                  readOnly={isAuthenticated}
                />
              </div>
              <div className="form-group">
                <label>Telefon*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength="11"
                  placeholder="05551234567"
                  pattern="[0-9]*"
                  required
                  readOnly={isAuthenticated}
                />
              </div>
              <div className="form-group full-width">
                <label>Adres*</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  readOnly={isAuthenticated}
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
                  readOnly={isAuthenticated}
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
                  readOnly={isAuthenticated}
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



