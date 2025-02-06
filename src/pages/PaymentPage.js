import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaCcStripe, FaPaypal } from 'react-icons/fa';
import './PaymentPage.css';

const PaymentPage = ({ cartItems, handleQuantityChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    orderNote: '',
    paymentMethod: 'stripe'
  });

  const [totals, setTotals] = useState({
    subtotal: 199.99,
    shipping: 29.99,
    total: 229.98
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          items: cartItems
        })
      });

      if (response.ok) {
        window.location.href = '/payment-success';
      }
    } catch (error) {
      console.error('Sipariş oluşturulamadı:', error);
    }
  };

  // Toplam fiyatları hesapla
  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 29.99; // Sabit kargo ücreti
    setTotals({
      subtotal,
      shipping,
      total: subtotal + shipping
    });
  }, [cartItems]);

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="header-main">
            <Link to="/" className="logo">
              E-SHOP
            </Link>
            <div className="header-actions">
              <Link to="/account" className="header-action-item">
                <FaUser />
                <span>Hesabım</span>
              </Link>
              <Link to="/payment" className="header-action-item">
                <FaShoppingCart />
                <span>Sepetim</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="payment-page">
        <div className="delivery-info">
          <h2 className="section-title">Teslimat Bilgileri</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Ad</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Soyad</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Telefon Numarası</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Adres</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="orderNote">Sipariş Notu</label>
              <textarea
                id="orderNote"
                name="orderNote"
                value={formData.orderNote}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>

        <div className="order-summary">
          <h2 className="section-title">Sipariş Özeti</h2>
          
          <div className="product-list">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="product-item">
                  <div className="product-info">
                    <img src={item.image} alt={item.name} className="product-image" />
                    <div className="product-details">
                      <span className="product-name">{item.name}</span>
                      <div className="quantity-controls">
                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                  <span className="product-price">₺{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div className="empty-cart">
                Sepetinizde ürün bulunmamaktadır.
              </div>
            )}
          </div>

          <div className="order-totals">
            <div className="product-item">
              <span>Ara Toplam</span>
              <span>₺{totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="product-item">
              <span>Kargo</span>
              <span>₺{totals.shipping.toFixed(2)}</span>
            </div>
            <div className="product-item">
              <strong>Toplam</strong>
              <strong>₺{totals.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="payment-methods">
            <h2 className="section-title">Ödeme Yöntemi</h2>
            
            <div className={`payment-method-item ${formData.paymentMethod === 'stripe' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                id="stripe"
                value="stripe"
                checked={formData.paymentMethod === 'stripe'}
                onChange={handleInputChange}
              />
              <FaCcStripe className="payment-icon" />
              <label htmlFor="stripe">Stripe ile Öde</label>
            </div>
            
            <div className={`payment-method-item ${formData.paymentMethod === 'paypal' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleInputChange}
              />
              <FaPaypal className="payment-icon" />
              <label htmlFor="paypal">PayPal ile Öde</label>
            </div>
          </div>

          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Siparişi Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;



