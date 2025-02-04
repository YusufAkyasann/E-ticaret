import React from 'react';
import './PaymentButtons.css';
import axios from 'axios';
import paypalLogo from '../images/png-transparent.png';
import stripeLogo from '../images/stripe_logo.png';

function PaymentButtons() {
    const handleStripePayment = async () => {
        try {
            const paymentData = {
                amount: "100.00",
                currency: 'USD'  // or 'TRY' if you're using Turkish Lira
            };
            
            // Using fetch with explicit POST method
            const response = await fetch('http://localhost:8000/api/stripe-payment/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });
            
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            }
        } catch (error) {
            console.error('Stripe payment error:', error);
        }
    };

    const handlePayPalPayment = async () => {
        try {
            const paymentData = {
                amount: "100.00",
                currency: 'USD'
            };
            
            const response = await fetch('http://localhost:8000/api/paypal-payment/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });
            
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            }
        } catch (error) {
            console.error('PayPal payment error:', error);
        }
    };

    return (
        <div className="payment-container">
            <button className="payment-button stripe-button" onClick={handleStripePayment}>
                <div className="button-content">
                    <img src={stripeLogo} alt="Stripe" className="button-icon stripe-icon" />
                    <span>Stripe ile Öde</span>
                </div>
            </button>
            <button className="payment-button paypal-button" onClick={handlePayPalPayment}>
                <div className="button-content">
                    <img src={paypalLogo} alt="PayPal" className="button-icon paypal-icon" />
                    <span>PayPal ile Öde</span>
                </div>
            </button>
        </div>
    );
}

export default PaymentButtons;