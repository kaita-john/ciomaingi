import styles from './viewpurchases.module.css'; // Import CSS Module
import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../Config/api.js";

const PurchasesPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get(`${baseUrl}/purchases/list`);
                setPurchases(response.data);
            } catch (error) {
                setError(error.message || "An error occurred while fetching purchases.");
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={styles.page}>
            <h2 className={styles.header}>Purchase History</h2>
            <br/>
            {purchases.map((purchase) => (
                <div key={purchase.id} className={styles.card}>
                    {/* User Information */}
                    <div className={styles.userInfo}>
                        <div className={styles.userInfoHeader}>
                            <h4>{purchase.name}</h4>
                            <div className={styles.purchaseDate}>
                                <p><strong>Date:</strong> {purchase.dated}</p>
                            </div>
                        </div>
                        <p style={{textAlign: 'left'}}><strong>Email:</strong> {purchase.email}</p>
                        <p style={{textAlign: 'left'}}><strong>Mobile:</strong> {purchase.mobile}</p>
                        <p style={{textAlign: 'left'}}><strong>Location:</strong> {purchase.location}</p>
                        <p style={{textAlign: 'left'}}><strong>Total Price:</strong> KSh {purchase.total_price}</p>
                    </div>

                    {/* Purchase Items */}
                    <div className={styles.purchaseItems}>
                        {purchase.purchaseitems.map((item) => (
                            <div key={item.id} className={styles.itemCard}>
                                <div className={styles.itemImage}>
                                    <img src={item.item_details.mainimage} alt={item.item_details.name}/>
                                </div>
                                <div className={styles.itemDetails}>
                                    <h4>{item.item_details.name}</h4>
                                    <p><strong>Price:</strong> KSh {item.price}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Total:</strong> KSh {item.total}</p>
                                    <p><strong>Description:</strong> {item.item_details.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PurchasesPage;