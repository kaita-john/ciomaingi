import {useLocation, useParams} from "react-router-dom";
import styles from './ProductDetails.module.css'; // Import CSS Module
import {useGetItems} from "../../../Hooks/useAPI.js";
import React, {useState} from "react";
import useSCrollToTopHook from "../../../Hooks/useScrollToTopHook.js";
import {useCart} from "../../../Hooks/cartContext.jsx";

const ProductDetails = () => {
    useSCrollToTopHook();
    const {addToCart} = useCart();

    const location = useLocation();
    const {productId} = useParams();
    const [quantity, setQuantity] = useState(1);

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
                        {/*<div className={styles.reviews}>
                              ⭐⭐⭐⭐⭐ <span className={styles.reviewsCount}>2 reviews</span>
                            </div>*/}
                        <h3 className={styles.productPrice}>KSh {product.price}</h3>
                        {/*<p className={styles.productTax}>
                              Tax included. Shipping calculated at checkout.
                            </p>*/}

                        {/* Quantity Selector */}
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

                        <div className={styles.descriptionCard}>
                            <p className={styles.productDescription}>{product.description}</p>
                        </div>

                    </div>


                    {/* Buttons */}
                    <div className={styles.buttonGroupCard}>
                        <div className={styles.productInfo}>
                            <button
                                className={styles.buyNow}
                                onClick={() => addToCart(product, quantity)}
                            >
                                🛒 Add to Cart
                            </button>
                            {/*<button className={styles.buyNow}>⚡ Buy Now</button>*/}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;