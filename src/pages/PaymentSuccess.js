import React from 'react';
import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <div className="payment-result-container">
      <h1>Ödeme Başarılı!</h1>
      <p>Siparişiniz başarıyla tamamlandı.</p>
      <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default PaymentSuccess; 