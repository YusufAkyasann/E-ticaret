import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaCreditCard, FaMoneyBill, FaLock, FaPaypal, FaStripe } from 'react-icons/fa';
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toplam fiyat hesaplama
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div>
      <Header cartItems={cartItems} onCartClick={() => navigate('/')} />
      <div className="payment-page-container">
        <div className="checkout-steps">
          <div className="step active">1. Sepet</div>
          <div className="step active">2. Teslimat</div>
          <div className="step">3. Ödeme</div>
        </div>

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

            <div className="payment-methods-section">
              <h4>Ödeme Yöntemi</h4>
              <div className="payment-methods">
                <div 
                  className={`payment-method ${paymentMethod === 'stripe' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <FaCreditCard />
                  <span>Stripe ile Öde</span>
                </div>
                <div 
                  className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <FaPaypal />
                  <span>PayPal ile Öde</span>
                </div>
              </div>
            </div>

            <div className="summary-details">
              <div className="summary-line">
                <span>Ara Toplam</span>
                <span>₺{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Kargo</span>
                <span>Ücretsiz</span>
              </div>
              <div className="summary-line total">
                <span>Toplam</span>
                <span>₺{calculateTotal().toFixed(2)}</span>
              </div>

              <button 
                className="checkout-button"
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0 || !paymentMethod}
              >
                <FaLock /> Güvenli Ödeme
              </button>
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



