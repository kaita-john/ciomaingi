import React, {useEffect, useState} from 'react';
import './category.css'
import axios from "axios";
import {baseUrl} from "../../../Config/api.js";

const CategoryPage = () => {

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");

    // Fetch all categories
    useEffect(() => {
        fetchCategories();
    }, [categories]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("${baseUrl}/categories/list");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Add a new category
    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;

        try {
            const response = await axios.post("${baseUrl}/categories/create", {
                name: newCategory,
            });
            setCategories([...categories, response.data]);
            setNewCategory("");
        } catch (error) {
            console.error("Error adding category:", error);
        }

    };

    // Edit a category
    const handleEditCategory = (category) => {
        setEditCategoryId(category.id);
        setEditCategoryName(category.name);
    };

    // Update a category
    const handleUpdateCategory = async () => {
        if (!editCategoryName.trim()) return;

        try {
            await axios.put(`${baseUrl}/categories/${editCategoryId}`, {
                name: editCategoryName,
            });
            const updatedCategories = categories.map((cat) =>
                cat.id === editCategoryId ? {...cat, name: editCategoryName} : cat
            );
            setCategories(updatedCategories);
            setEditCategoryId(null);
            setEditCategoryName("");
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    // Delete a category
    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`${baseUrl}/categories/${id}`);
            const updatedCategories = categories.filter((cat) => cat.id !== id);
            setCategories(updatedCategories);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="category-page">
            <h2>Category Management</h2>

            {/* Add Category Section */}
            <div className="add-category-section">
                <input
                    type="text"
                    placeholder="Enter category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>

            {/* Category List */}
            <div className="category-list">
                {/* Header Row */}
                <div className="category-header">
                    <span className="header-name">Name</span>
                    <span className="header-actions">Actions</span>
                </div>

                {/* Category Items */}
                {categories.map((category) => (
                    <div key={category.id} className="category-item">
                        {editCategoryId === category.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                />
                                <button onClick={handleUpdateCategory}>Update</button>
                            </>
                        ) : (
                            <>
                                <span className="category-name">{category.name}</span>
                                <button onClick={() => handleEditCategory(category)}>Edit</button>
                            </>
                        )}
                        <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                    </div>
                ))}
            </div>

        </div>
    );

};

export default CategoryPage;