import './items.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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

    // Handle marking an item as out of stock
    const handleMarkOutOfStock = async (item) => {
        if (window.confirm(`Are you sure you want to mark "${item.name}" as out of stock?`)) {
            try {
                await axios.patch(`http://127.0.0.1:8000/api/v1/items/out/${item.id}`, {
                    inStock: false,
                    amount: 0,
                });
                // Update the item in the state to reflect the new stock status
                setItems(
                    items.map((i) =>
                        i.id === item.id ? {...i, inStock: false, amount: 0} : i
                    )
                );
                alert("Item marked as out of stock successfully!");
            } catch (error) {
                console.error("Error marking item as out of stock:", error);
                alert("Failed to mark item as out of stock. Please try again.");
            }
        }
    };

    // Handle marking an item as in stock (restock)
    const handleRestock = async (item) => {
        if (window.confirm("Are you sure you have restocked this item?")) {
            try {
                await axios.patch(`http://127.0.0.1:8000/api/v1/items/restock/${item.id}`, {
                    inStock: true,
                    amount: 1, // Default to 1, you can adjust this as needed
                });
                // Update the item in the state to reflect the new stock status
                setItems(
                    items.map((i) =>
                        i.id === item.id ? {...i, inStock: true, amount: 1} : i
                    )
                );
                alert("Item restocked successfully!");
            } catch (error) {
                console.error("Error restocking item:", error);
                alert("Failed to restock item. Please try again.");
            }
        }
    };

    // Handle navigation to edit page
    const handleEdit = (item) => {
        navigate("/items/edit", {state: {item}}); // Pass the selected item to the edit page
    };

    // Truncate description to a maximum length
    const truncateDescription = (description, maxLength = 50) => {
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + "...";
    };

    if (loading) return <p>Loading items...</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <div className="item-list-container">
            <h2>Item List</h2>
            <table className="item-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Stock Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>KSh {item.price}</td>
                        <td>{truncateDescription(item.description)}</td>
                        <td>
                <span className={item.inStock ? "in-stock" : "out-of-stock"}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
                        </td>
                        <td>
                            <div className="actions">
                                <button className="edit-button" onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                                {item.inStock ? (
                                    <button
                                        className="out-of-stock-button"
                                        onClick={() => handleMarkOutOfStock(item)}
                                        disabled={!item.inStock}
                                    >
                                        Out of Stock
                                    </button>
                                ) : (
                                    <button
                                        className="restock-button"
                                        onClick={() => handleRestock(item)}
                                    >
                                        Restock Now
                                    </button>
                                )}
                                <button
                                    style={{backgroundColor: "red"}}
                                    className="edit-button"
                                    onClick={() => handleDelete(item.id)}
                                >
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