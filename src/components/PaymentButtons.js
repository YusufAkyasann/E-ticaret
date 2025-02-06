import React from 'react';
import './PaymentButtons.css';
import paypalLogo from '../images/png-transparent.png';
import stripeLogo from '../images/stripe_logo.png';

function PaymentButtons({ totalAmount }) {
    const handleStripePayment = async () => {
        try {
            const amount = parseFloat(totalAmount).toFixed(2);
            console.log('Sending amount to Stripe:', amount);
            
            const paymentData = {
                amount: amount,
                currency: 'USD'
            };
            
            const response = await fetch('http://localhost:8000/api/stripe-payment/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });
            
            const data = await response.json();
            console.log('Stripe response:', data);
            
            if (response.ok && data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                console.error('Ödeme başlatılamadı:', data.message);
                alert('Ödeme işlemi başlatılırken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Stripe payment error:', error);
            alert('Ödeme işlemi sırasında bir hata oluştu.');
        }
    };

    const handlePayPalPayment = async () => {
        try {
            // Sayısal değeri kontrol et ve formatla
            const amount = Number(totalAmount);
            if (isNaN(amount) || amount <= 0) {
                throw new Error('Geçersiz ödeme tutarı');
            }
            
            console.log('Sending amount to PayPal:', amount.toFixed(2));
            
            const paymentData = {
                amount: amount.toFixed(2),
                currency: 'USD'
            };
            
            console.log('PayPal request data:', paymentData);
            
            const response = await fetch('http://localhost:8000/api/paypal-payment/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });
            
            const data = await response.json();
            console.log('PayPal response:', data);
            
            if (response.ok && data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                console.error('PayPal error:', data);
                alert('Ödeme işlemi başlatılırken bir hata oluştu: ' + data.message);
            }
        } catch (error) {
            console.error('PayPal payment error:', error);
            alert(error.message || 'Ödeme işlemi sırasında bir hata oluştu.');
        }
    };

    return (
        <div className="payment-container">
            <button 
                className="payment-button stripe-button" 
                onClick={handleStripePayment}
            >
                <div className="button-content">
                    <img 
                        src={stripeLogo}
                        alt="Stripe" 
                        className="button-icon stripe-icon"
                    />
                    <span>Stripe ile Öde</span>
                </div>
            </button>
            
            <button 
                className="payment-button paypal-button" 
                onClick={handlePayPalPayment}
            >
                <div className="button-content">
                    <img 
                        src={paypalLogo}
                        alt="PayPal" 
                        className="button-icon paypal-icon"
                    />
                    <span>PayPal ile Öde</span>
                </div>
            </button>
        </div>
    );
}

export default PaymentButtons;