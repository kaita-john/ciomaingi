import './items.css';


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemListPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch all items
    useEffect(() => {

        const fetchItems = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/v1/items/list");
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
                setError("Failed to load items. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    // Handle item deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/v1/items/${id}`);
                setItems(items.filter((item) => item.id !== id)); // Remove the deleted item from the list
                alert("Item deleted successfully!");
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("Failed to delete item. Please try again.");
            }
        }
    };

    // Handle navigation to edit page
    const handleEdit = (item) => {
        navigate("/items/edit", { state: { item } }); // Pass the selected item to the edit page
    };

    if (loading) return <p>Loading items...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="item-list-container">
            <h2>Item List</h2>
            <table className="item-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>KSh {item.price}</td>
                            <td>{item.description}</td>
                            <td>
                                <div className="actions">
                                    <button className="edit-button" onClick={() => handleEdit(item)}>
                                        Edit
                                    </button>

                                    <button style={{backgroundColor: "red"}} className="edit-button" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemListPage;