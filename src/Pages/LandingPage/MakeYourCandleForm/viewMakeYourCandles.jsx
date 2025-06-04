import React, {useEffect, useState} from "react";
import axios from "axios";
import "./viewMakeYourCandles.css";
import {baseUrl} from "../../../Config/api.js";

const ViewMakeYourCandles = () => {
    const [candles, setCandles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all candle orders
    useEffect(() => {
        const fetchCandles = async () => {
            try {
                const response = await axios.get(`${baseUrl}/makeyourcandle/list`);
                setCandles(response.data);
            } catch (err) {
                setError("Failed to fetch candle orders. Please try again later.");
                console.error("Error fetching candle orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCandles();
    }, []);

    // Delete a candle order
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await axios.delete(`${baseUrl}/makeyourcandle/${id}`);
                setCandles((prevCandles) => prevCandles.filter((candle) => candle.id !== id));
                alert("Order deleted successfully!");
            } catch (err) {
                console.error("Error deleting order:", err);
                alert("Failed to delete order. Please try again.");
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="candles-container">
            <h2 align='center'>View Candle Orders</h2><br/>
            <table className="candles-table">
                <thead>
                    <tr>
                        <th>Purpose</th>
                        <th>Quantity</th>
                        <th>Scent</th>
                        <th>Jar Color</th>
                        <th>Special Labeling</th>
                        <th>Custom Message</th>
                        <th>Delivery Timeline</th>
                        <th>Additional Notes</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {candles.map((candle) => (
                        <tr key={candle.id}>
                            <td>{candle.purpose}</td>
                            <td>{candle.quantity}</td>
                            <td>{candle.scent}</td>
                            <td>{candle.jar_color}</td>
                            <td>{candle.special_labeling}</td>
                            <td>{candle.custom_message}</td>
                            <td>{candle.delivery_timeline}</td>
                            <td>{candle.additional_notes}</td>
                            <td>{candle.email}</td>
                            <td>{candle.phone_number}</td>
                            <td>{new Date(candle.created_at).toLocaleString()}</td>
                            <td>
                                <button
                                    style={{backgroundColor: 'red', color: 'white', height: 35}}
                                    className=""
                                    onClick={() => handleDelete(candle.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewMakeYourCandles;