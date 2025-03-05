import './cartpage.css';
import {useCart} from "../../../Hooks/cartContext.jsx";
import product02 from '/src/assets/img/product02.png';
import {useNavigate} from "react-router-dom";


const CartPage = () => {

    const navigate = useNavigate();
    const {cart, addToCart, removeFromCart, reduceCart, clearCart} = useCart();

    // Calculate total price
    var totalPrice = 0
    try {
        totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    } catch (e) {
        totalPrice = 0
    }


    function redirectUser() {
        return navigate(`/`)
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>

            {
                cart && cart.length === 0 ? (<p className="empty-cart-message">Your cart is empty.</p>) : (
                    <>
                        <div className="cart-header">
                            <span className="header-product">PRODUCT</span>
                            <span className="header-quantity">QUANTITY</span>
                            <span className="header-total">TOTAL</span>
                        </div>

                        <div className="cart-items">
                            {
                                cart && cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-product">
                                            <img src={product02} alt={item.name} className="cart-item-image"/>
                                            <span className="cart-item-name">{item.name}</span>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <button className="quantity-button" onClick={() => reduceCart(item, 1)}>
                                                −
                                            </button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button className="quantity-button" onClick={() => addToCart(item, 1)}>
                                                +
                                            </button>
                                            <button
                                                className="remove-from-cart-button"
                                                onClick={() => removeFromCart(item)}>
                                                Remove
                                            </button>
                                        </div>
                                        <div className="cart-item-total">
                                            KSh {(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="cart-summary">
                            <div className="estimated-total">
                                <span>Estimated Total</span>
                                <span className="total-price">KSh {totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="cart-actions">
                                <button className="continue-shopping-button"
                                        onClick={redirectUser}>Continue Shopping
                                </button>
                                <button className="clear-cart-button" onClick={clearCart}>
                                    Clear Cart
                                </button>
                                <button className="checkout-button" onClick={() => {
                                    navigate(`/checkout`)
                                }}>Checkout</button>
                            </div>
                        </div>
                    </>
                )

            }
        </div>
    );
};

export default CartPage;