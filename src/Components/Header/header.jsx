import {useEffect, useRef, useState} from "react";
import {useCart} from "../../Hooks/cartContext.jsx";
import {useNavigate} from "react-router-dom";
import './header.css'
import {useAuth} from "../authContext.jsx";

const Header = () => {
    const [menu, setMenu] = useState("shop");
    const {cart} = useCart();
    const {isAuthenticated, isLoading} = useAuth();
    const navigate = useNavigate();

    const cartQuantity = () => {
        if (cart && cart.length > 0) {
            return <div className="cart-count">{cart.length}</div>;
        }
        return null;
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                console.log("Clicked outside, closing dropdown");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar">
            <header>
                {/* TOP HEADER */}
                <div className="top-header">
                    <div className="container">
                        <div className="top-header-content">
                            <ul className="contact-info">
                                <li><a href="tel:+254727237104"><i className="fa fa-phone"></i> +254 727 237 104 </a>
                                </li>
                                <li><a href="mailto:maingiciocandles@gmail.com"><i
                                    className="fa fa-envelope"></i>ciomaingicandles@gmail.com</a></li>
                            </ul>
                            <ul className="nav-links">
                                <li><a href="#" onClick={() => navigate('/')}><i className="fa fa-home"></i> Home</a>
                                </li>
                                <li><a href="#" onClick={() => navigate('/aboutus')}><i className="fa fa-address-book"></i> About Us</a>
                                </li>
                                <li className="dropdown" ref={dropdownRef}>

                                    {!isLoading && isAuthenticated && (
                                        <button
                                            className="dropbtn"
                                            onClick={() => window.history.back()}>
                                            <i className="fa fa-arrow-left"></i> Back
                                        </button>
                                    )}

                                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                                        <a href="#" onClick={() => {
                                            navigate('/items');
                                            setIsDropdownOpen(false);
                                        }}><i className="fa fa-upload"></i> Upload</a>
                                        <a href="#" onClick={() => {
                                            navigate('/items/list');
                                            setIsDropdownOpen(false);
                                        }}><i className="fa fa-list"></i> Items</a>
                                        <a href="#" onClick={() => {
                                            navigate('/viewpurchases');
                                            setIsDropdownOpen(false);
                                        }}><i className="fa fa-shopping-bag"></i> Purchases</a>
                                        <a href="#" onClick={() => {
                                            navigate('/classbookings');
                                            setIsDropdownOpen(false);
                                        }}><i className="fa fa-list"></i> Class Bookings</a>
                                        <a href="#" onClick={() => {
                                            navigate('/viewmakecandles');
                                            setIsDropdownOpen(false);
                                        }}><i className="fa fa-lightbulb-o"></i> Candle Requests</a>
                                        <a href="#" onClick={() => setIsDropdownOpen(false)}><i
                                            className="fa fa-user"></i> Account</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* MAIN HEADER */}
                <div className="main-header">
                    <div className="container">
                        <div className="header-row">
                            {/* LOGO */}
                            <div className="header-logo">
                                <a href="#" className="logo" onClick={() => navigate('/')}>
                                    <h1 className="logo-text">Cio Maingi</h1>
                                </a>
                            </div>

                            {/* Featured Action (Large Central Element) */}
                            <div className="header-center">
                                <a href="/makeyourcandle" className="featured-action">
                                    Candle Making Classes
                                </a>
                            </div>

                            {/* CART */}
                            <div className="header-cart">
                                <a className="cart-toggle" onClick={() => navigate('/cart')}>
                                    <i className="fa fa-shopping-cart"></i>
                                    <span className="cart-text">Cart</span>
                                    {cartQuantity()}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;