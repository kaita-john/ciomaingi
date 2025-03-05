import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './adminpage.module.css';
import {useAuth} from "../../../Components/authContext.jsx"; // Import CSS module

const AdminPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleLogout = () => {
        // Replace with your actual logout logic (e.g., clear auth token, redirect)
        console.log('User logged out');
        logout(); // Use logout from useAuth
        navigate("/login", {replace: true})
    }

    return (
        <div className={styles.adminPage}>
            <header className={styles.adminHeader}>
                <h1>Admin Dashboard</h1>
                <p>Manage Your Candle Empire</p>
            </header>

            <div className={styles.cardContainer}>
                <div className={styles.card} onClick={() => navigate('/items')}>
                    <i className="fa fa-upload"></i>
                    <h3>Upload</h3>
                    <p>Add new items to your store</p>
                </div>

                <div className={styles.card} onClick={() => navigate('/items/list')}>
                    <i className="fa fa-list"></i>
                    <h3>Items</h3>
                    <p>View and manage your inventory</p>
                </div>

                <div className={styles.card} onClick={() => navigate('/viewpurchases')}>
                    <i className="fa fa-shopping-bag"></i>
                    <h3>Purchases</h3>
                    <p>Track customer orders</p>
                </div>

                <div className={styles.card} onClick={() => navigate('/classbookings')}>
                    <i className="fa fa-list"></i>
                    <h3>Class Bookings</h3>
                    <p>Manage candle-making classes</p>
                </div>

                <div className={styles.card} onClick={() => navigate('/viewmakecandles')}>
                    <i className="fa fa-lightbulb-o"></i>
                    <h3>Candle Requests</h3>
                    <p>Review custom candle requests</p>
                </div>

                <div className={styles.card} onClick={() => navigate('/account')}>
                    <i className="fa fa-user"></i>
                    <h3>Account</h3>
                    <p>Update your profile</p>
                </div>

                <div className={`${styles.card} ${styles.logoutCard}`} onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i>
                    <h3>Logout</h3>
                    <p>End your session</p>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

