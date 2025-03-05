import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCart} from '../../../Hooks/cartContext.jsx';
import './checkout.css'
import {postPurchase} from "../../../Hooks/useAPI.js";

const CheckoutPage = () => {

    const navigate = useNavigate();
    const {cart, clearCart} = useCart();
    const {createPurchase, loading, error, purchaseSuccess, setPurchaseSuccess} = postPurchase();

    useEffect(() => {
        if (purchaseSuccess) {
            alert("Order placed successfully!");
            clearCart();
            setPurchaseSuccess(false);
            //navigate('/');
        } else if (error) {
            alert(error);
        }
    }, [purchaseSuccess, error]);


    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = 250; // Fixed shipping cost
    const totalWithShipping = totalPrice + shippingCost;

    // State for user information
    const [userInfo, setUserInfo] = useState({
            name: '',
            email: '',
            mobile: '',
            location: '',
        }
    );

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserInfo({...userInfo, [name]: value});
    };


    const handleCheckout = async () => {
        // Validate user information
        if (!userInfo.name || !userInfo.email || !userInfo.mobile || !userInfo.location) {
            alert('Please fill in all fields.');
            return;
        }
        const payload = {
            name: userInfo.name,
            email: userInfo.email,
            mobile: userInfo.mobile,
            location: userInfo.location,
            purchaseitems: cart.map(item => ({
                item: item.id, // Assuming item.id is the correct ID for your Item model
                price: item.price,
                quantity: item.quantity,
            })),
        };

        const response = await createPurchase(payload)
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout</h2>

            <div className="checkout-form">
                <h3>Contact Information</h3>
                <input type="text" name="name" placeholder="First name" value={userInfo.name}
                       onChange={handleInputChange}/>
                <input type="email" name="email" placeholder="Email" value={userInfo.email}
                       onChange={handleInputChange}/>
                <input type="tel" name="mobile" placeholder="254" value={userInfo.mobile}
                       onChange={handleInputChange}/>
                <input type="text" name="location" placeholder="Location" value={userInfo.location}
                       onChange={handleInputChange}/>
            </div>

            <div className="product-list">
                <h3>Your Order</h3>
                {cart.map((item) => (
                    <div key={item.id} className="product-item">
                        <span className="product-name">{item.name}</span>
                        <span className="product-quantity">Quantity: {item.quantity}</span>
                        <span className="product-price">KSh {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className="order-summary">
                <br/>
                <h3>Order Summary</h3>
                <div className="summary-row">
                    {/*<span>Subtotal</span>
                    <span>KSh {totalPrice.toFixed(2)}</span>*/}
                    <span><strong>Total</strong></span>
                    <span>
                        <strong>KSh {totalWithShipping.toFixed(2)}</strong>
                    </span>
                </div>
                {/*<div className="summary-row">
                    <span>Shipping</span>
                    <span>KSh {shippingCost.toFixed(2)}</span>
                </div>*/}
                {/*<div className="summary-row total">
                    <span>Total</span>
                    <span>KSh {totalWithShipping.toFixed(2)}</span>
                </div>*/}
            </div>

            <button className="checkout-button" onClick={handleCheckout} disabled={loading}>
                {loading ? "Placing Order..." : "Place Order"} {/* Show loading state */}
            </button>
            {/*{error && <p style={{ color: 'red' }}>{error}</p>} /!* Display error if any *!/*/}

        </div>
    );
};

export default CheckoutPage;