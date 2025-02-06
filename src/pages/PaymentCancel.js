import React from 'react';
import { Link } from 'react-router-dom';

function PaymentCancel() {
  return (
    <div className="payment-result-container">
      <h1>Ödeme İptal Edildi</h1>
      <p>Ödeme işlemi iptal edildi veya bir hata oluştu.</p>
      <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default PaymentCancel; 