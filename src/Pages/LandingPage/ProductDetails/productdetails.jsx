import {useLocation, useParams} from "react-router-dom";
import styles from './ProductDetails.module.css'; // Import CSS Module
import {useGetItems} from "../../../Hooks/useAPI.js";
import React, {useState} from "react";
import useSCrollToTopHook from "../../../Hooks/useScrollToTopHook.js";
import {useCart} from "../../../Hooks/cartContext.jsx";
import axios from 'axios';

const ProductDetails = () => {
    useSCrollToTopHook();
    const {addToCart} = useCart();

    const location = useLocation();
    const {productId} = useParams();
    const [quantity, setQuantity] = useState(1);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogData, setDialogData] = useState({
        name: '',
        email: '',
    });

    let product = location.state;
    const [mainImage, setMainImage] = useState("");

    const {product: fetchedProduct, loading, error} = useGetItems(productId, setMainImage);

    if (!product) {
        product = fetchedProduct;
        if (!fetchedProduct) {
            if (error) {
                return <p className={styles.error}>{error}</p>;
            }
            return <p className={styles.error}>Product details not found.</p>;
        }
    }

    const handleAddToCart = () => {
        if (product.inStock) {
            addToCart(product, quantity);
        } else {
            setShowDialog(true); // Show dialog if out of stock
        }
    };

    const handleDialogChange = (e) => {
        const {name, value} = e.target;
        setDialogData({...dialogData, [name]: value});
    };

    const handleDialogSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!dialogData.name.trim() || !dialogData.email.trim()) {
            alert('Please fill in both name and email.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(dialogData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Prepare data to send
        const notifyData = {
            name: dialogData.name,
            email: dialogData.email,
            productName: product.name,
        };

        try {
            const response = await axios.post('http://ciomaingifarm.website/api/v1/items/notify-out-of-stock', notifyData);
            if (response.data.status === 'success') {
                alert(response.data.message);
                setDialogData({name: '', email: ''}); // Reset form
                setShowDialog(false); // Close dialog
            } else {
                alert(response.data.message || 'An error occurred while submitting your request.');
            }
        } catch (error) {
            console.error('Error submitting notification request:', error);
            alert('There was an error submitting your request. Please try again.');
        }
    };

    const handleDialogClose = () => {
        setShowDialog(false);
        setDialogData({name: '', email: ''}); // Reset form on close
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageSection}>
                    {/* Main Image */}
                    <div className={styles.mainImageContainer}>
                        <img
                            src={mainImage}
                            alt={product.name}
                            className={styles.mainImage}
                        />
                    </div>

                    {/* Other Images */}
                    <div className={styles.otherImagesContainer}>
                        <h3 className={styles.otherImagesTitle}>More Images</h3>
                        <div className={styles.otherImagesPreview}>
                            {product.itemimages &&
                                product.itemimages.map((itemimage, index) => (
                                    <div
                                        key={index}
                                        className={styles.imagePreview}
                                        onClick={() => setMainImage(itemimage.image)}
                                    >
                                        <img
                                            src={itemimage.image}
                                            alt={`Other ${index}`}
                                            className={styles.previewImage}
                                        />
                                    </div>
                                ))}

                            <div
                                className={styles.imagePreview}
                                onClick={() => setMainImage(product.mainimage)}
                            >
                                <img
                                    src={product.mainimage}
                                    className={styles.previewImage}
                                    alt={product.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Product Info */}
                <div className={styles.productInfo}>
                    <div className={styles.productInfoCard}>
                        <h1 className={styles.productTitle}>{product.name}</h1>
                        <h3 className={styles.productPrice}>KSh {product.price}</h3>

                        {/* Stock Status */}

                        <div align='start'>
                            <p className={`${styles.stockStatus} ${!product.inStock ? styles.outOfStock : ''}`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </p>
                        </div>

                        {/* Quantity Selector (only if in stock) */}
                        {product.inStock && (
                            <div className={styles.quantityCard}>
                                <div className={styles.quantity}>
                                    <button
                                        className={styles.qtyBtn}
                                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                    >
                                        −
                                    </button>
                                    <span className={styles.qtyValue}>{quantity}</span>
                                    <button
                                        className={styles.qtyBtn}
                                        onClick={() => setQuantity((prev) => prev + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className={styles.descriptionCard}>
                            <p className={styles.productDescription}>{product.description}</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className={styles.buttonGroupCard}>
                        <div className={styles.productInfo}>
                            <button
                                className={styles.buyNow}
                                onClick={handleAddToCart}
                            >
                                🛒 {product.inStock ? 'Add to Cart' : 'Notify Me When Available'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Dialog for Out of Stock */}
            {showDialog && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialog}>
                        <h3>Notify Me When Available</h3>
                        <p>
                            Sorry, <strong>{product.name}</strong> is currently out of stock. Enter your details below,
                            and we'll notify you when it's back!
                        </p>
                        <form onSubmit={handleDialogSubmit}>
                            <div className={styles.dialogField}>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={dialogData.name}
                                    onChange={handleDialogChange}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className={styles.dialogField}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={dialogData.email}
                                    onChange={handleDialogChange}
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className={styles.dialogButtons}>
                                <button type="submit" className={styles.dialogSubmit}>
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className={styles.dialogCancel}
                                    onClick={handleDialogClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;