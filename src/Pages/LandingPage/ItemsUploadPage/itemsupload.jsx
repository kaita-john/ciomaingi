import styles from './itemupload.module.css'; // Import CSS Module
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../../../firebase.js";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {useGetCategories} from "../../../Hooks/useAPI.js";

const ItemUploadPage = () => {

    const location = useLocation();
    const item = location.state?.item;

    const [name, setName] = useState(item?.name || "");
    const [price, setPrice] = useState(item?.price || "");
    const [amount, setAmount] = useState(item?.amount || "");
    const [description, setDescription] = useState(item?.description || "");
    const [mainImage, setMainImage] = useState(item?.mainimage || null);
    const [otherImages, setOtherImages] = useState(item?.itemimages || []);
    const [loading, setLoading] = useState(false);

    const {categories, categoryloading, error} = useGetCategories();
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (item) setSelectedCategory(item?.category_details?.id);
    }, [item]);

    const handleMainImageUpload = async (file) => {
        setLoading(true);
        const storageRef = ref(storage, `items/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setMainImage(url);
        setLoading(false);
    };

    const handleOtherImagesUpload = async (files) => {
        setLoading(true);
        const itemImageList = [];
        for (const file of files) {
            const storageRef = ref(storage, `items/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            itemImageList.push({image: url});
        }
        setOtherImages([...otherImages, ...itemImageList]);
        setLoading(false);
    };

    const handleDeleteImage = (index) => {
        setOtherImages(otherImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            name,
            price,
            amount,
            description,
            category: selectedCategory,
            mainimage: mainImage,
            itemimages: otherImages
        };
        try {
            if (item) {
                await axios.put(`http://ciomaingifarm.website/api/v1/items/${item.id}`, payload);
            } else {
                await axios.post("http://ciomaingifarm.website/api/v1/items/create", payload);
            }
            alert("Item saved successfully!");
        } catch (error) {
            console.error("Error saving item:", error);
            alert("Error saving item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{item ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit} className={styles.formLayout}>
                <div className={styles.inputSection}>
                    <div className={styles.formCard}>
                        <label className={styles.label}>Name</label>
                        <input className={styles.input} type="text" value={name}
                               onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className={styles.formCard}>
                        <label className={styles.label}>Price (KES)</label>
                        <input className={styles.input} type="number" value={price}
                               onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    {/*<div className={styles.formCard}>
                        <label className={styles.label}>Stock</label>
                        <input className={styles.input} type="number" value={amount}
                               onChange={(e) => setAmount(e.target.value)} required/>
                    </div>*/}
                    <div className={styles.formCard}>
                        <label className={styles.label}>Description</label>
                        <textarea className={styles.textarea} value={description}
                                  onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                </div>

                <div className={styles.imageSection}>
                    <div className={`${styles.formCard} ${styles.mainImageCard}`}>
                        <label className={styles.label}>Main Image</label>
                        <input className={styles.input} type="file"
                               onChange={(e) => handleMainImageUpload(e.target.files[0])} accept="image/*"/>
                        {mainImage && <img src={mainImage} alt="Main" className={styles.imagePreview}/>}
                    </div>
                    <div className={styles.formCard}>
                        <label className={styles.label}>Additional Images</label>
                        <input className={styles.input} type="file"
                               onChange={(e) => handleOtherImagesUpload([...e.target.files])} accept="image/*"
                               multiple/>
                        <div className={styles.otherImagesPreview}>
                            {otherImages.map((itemimage, index) => (
                                <div key={index} className={styles.imageWrapper}>
                                    <img src={itemimage.image} alt={`Other ${index}`} className={styles.imagePreview}/>
                                    <button type="button" onClick={() => handleDeleteImage(index)}
                                            className={styles.deleteButton}>×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.formCard}>
                        <label className={styles.label}>Category</label>
                        <select className={styles.select} value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)} disabled={categoryloading}>
                            <option value="">Select Category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {categoryloading && <span className={styles.loadingText}>Loading...</span>}
                        {error && <span className={styles.error}>{error}</span>}
                    </div>
                </div>

                <button type="submit" disabled={loading} className={styles.submitButton}>
                    {loading ? "Saving..." : "Save Item"}
                </button>
            </form>
        </div>
    );
};

export default ItemUploadPage;