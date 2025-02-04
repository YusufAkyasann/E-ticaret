import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';
import PaymentButtons from '../components/PaymentButtons';
import ProductList from '../components/ProductList';
import AddressForm from '../components/AddressForm';

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(() => {
        return location.state?.cartItems || JSON.parse(localStorage.getItem('cartItems') || '[]');
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const handleQuantityChange = (productId, delta) => {
        setCartItems(prevItems => {
            const newItems = prevItems.map(item => {
                if (item.product.id === productId) {
                    const newQuantity = item.quantity + delta;
                    if (newQuantity <= 0) {
                        return null; // Will be filtered out
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(Boolean); // Remove null items

            return newItems;
        });
    };

    return (
        <div className="App">
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back
            </button>
            <h1 className="main-title">E-Ticaret Ödeme Sistemi</h1>
            
            <div className="checkout-container">
                <div className="left-section">
                    <div className="product-section">
                        <h2>Sepetinizdeki Ürünler</h2>
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.product.id} className="cart-item">
                                    <img src={item.product.image} alt={item.product.name} />
                                    <div className="item-details">
                                        <h3>{item.product.name}</h3>
                                        <p>Fiyat: ${item.product.price}</p>
                                        <p>Toplam: ${(item.product.price * item.quantity).toFixed(2)}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => handleQuantityChange(item.product.id, -1)}>-</button>
                                            <span className="quantity-display">{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.product.id, 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="cart-total">
                                <h3>Toplam Tutar: ${calculateTotal().toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="address-section">
                        <h2>Teslimat Adresi</h2>
                        <AddressForm />
                    </div>
                </div>
                
                <div className="payment-section">
                    <h2>Ödeme Yöntemleri</h2>
                    <PaymentButtons />
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;



