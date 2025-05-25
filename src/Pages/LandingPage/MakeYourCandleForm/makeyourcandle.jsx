import './makeyourcandle.css';
import React, { useState } from "react";
import axios from "axios";

const CandleForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        purpose: [],
        quantity: "",
        scent: "",
        jar_color: "",
        special_labeling: "",
        custom_message: "",
        delivery_timeline: "",
        additional_notes: "",
        email: "",
        phone_number: "",
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            // Handle checkboxes for purpose
            if (checked) {
                setFormData((prevData) => ({ ...prevData, purpose: [...prevData.purpose, value] }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    purpose: prevData.purpose.filter((item) => item !== value),
                }));
            }
        } else if (type === "radio" || type === "text" || type === "textarea" || type === "email" || type === "tel") {
            // Handle other inputs
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate all required fields
        const requiredFields = [
            "purpose",
            "quantity",
            "scent",
            "jar_color",
            "special_labeling",
            "delivery_timeline",
            "email",
            "phone_number",
        ];
        const isFormValid = requiredFields.every((field) => {
            if (field === "purpose") {
                return formData[field].length > 0;
            }
            return formData[field] !== "";
        });
        if (!isFormValid) {
            alert("Please fill out all required fields.");
            setLoading(false);
            return;
        }

        try {
            await axios.post(`http://ciomaingifarm.website/api/v1/makeyourcandle/create`, formData);
            alert("Item saved successfully!");
            // Reset the form after successful submission
            setFormData({
                purpose: [],
                quantity: "",
                scent: "",
                jar_color: "",
                special_labeling: "",
                custom_message: "",
                delivery_timeline: "",
                additional_notes: "",
                email: "",
                phone_number: "",
            });
        } catch (error) {
            console.error("Error saving item:", error);
            alert("Error saving item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h3 align='center'>Your Personalized Candle</h3>
            <p>Thank you for choosing our personalized candles! Please fill out the form below so we can create the perfect candles for you.</p>

            <form onSubmit={handleSubmit}>
                {/* Question 1 */}
                <div className="form-group">
                    <label>1. What is the purpose of your personalized candle? (Select one or more)</label>
                    <div className="options">
                        <label>
                            <input type="checkbox" name="purpose" value="Baby Shower" onChange={handleInputChange} />{" "}
                            Baby Shower
                        </label>
                        <label>
                            <input type="checkbox" name="purpose" value="Wedding Gift" onChange={handleInputChange} />{" "}
                            Wedding Gift
                        </label>
                        <label>
                            <input type="checkbox" name="purpose" value="Corporate Event" onChange={handleInputChange} />{" "}
                            Corporate Event
                        </label>
                        <label>
                            <input type="checkbox" name="purpose" value="Personalized Gift" onChange={handleInputChange} />{" "}
                            Personalized Gift
                        </label>
                        <label>
                            <input type="checkbox" name="purpose" value="Birthday Party" onChange={handleInputChange} />{" "}
                            Birthday Party
                        </label>
                        <label>
                            <input type="checkbox" name="purpose" value="Other" onChange={handleInputChange} />{" "}
                            Other (please specify):{" "}
                            <input type="text" name="otherPurpose" onChange={handleInputChange} />
                        </label>
                    </div>
                </div>

                {/* Question 2 */}
                <div className="form-group">
                    <label>2. How many candles would you like to order?</label>
                    <div className="options">
                        <label>
                            <input type="radio" name="quantity" value="1-10" onChange={handleInputChange} />{" "}
                            1-10 candles
                        </label>
                        <label>
                            <input type="radio" name="quantity" value="11-20" onChange={handleInputChange} />{" "}
                            11-20 candles
                        </label>
                        <label>
                            <input type="radio" name="quantity" value="21-30" onChange={handleInputChange} />{" "}
                            21-30 candles
                        </label>
                        <label>
                            <input type="radio" name="quantity" value="31+" onChange={handleInputChange} />{" "}
                            31+ candles
                        </label>
                    </div>
                </div>

                {/* Question 3 */}
                <div className="form-group">
                    <label>3. What is your preferred scent for the candle? (Select one)</label>
                    <div className="options">
                        <label>
                            <input type="radio" name="scent" value="Vanilla" onChange={handleInputChange} />{" "}
                            Vanilla
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Mango" onChange={handleInputChange} />{" "}
                            Mango
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Sweet Orange" onChange={handleInputChange} />{" "}
                            Sweet Orange
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Lavender" onChange={handleInputChange} />{" "}
                            Lavender
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Eucalyptus & Mint" onChange={handleInputChange} />{" "}
                            Eucalyptus & Mint
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Lemongrass" onChange={handleInputChange} />{" "}
                            Lemongrass
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Coffee" onChange={handleInputChange} />{" "}
                            Coffee
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Strawberry" onChange={handleInputChange} />{" "}
                            Strawberry
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Sandalwood" onChange={handleInputChange} />{" "}
                            Sandalwood
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Chocolate" onChange={handleInputChange} />{" "}
                            Chocolate
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Apple Cinnamon" onChange={handleInputChange} />{" "}
                            Apple Cinnamon
                        </label>
                        <label>
                            <input type="radio" name="scent" value="Blackberry & Rose" onChange={handleInputChange} />{" "}
                            Blackberry & Rose
                        </label>
                    </div>
                </div>

                {/* Question 4 */}
                <div className="form-group">
                    <label>4. What is your preferred candle jar color? (Select one)</label>
                    <div className="options">
                        <label>
                            <input type="radio" name="jar_color" value="Frosted Red" onChange={handleInputChange} />{" "}
                            Frosted Red
                        </label>
                        <label>
                            <input type="radio" name="jar_color" value="Frosted White" onChange={handleInputChange} />{" "}
                            Frosted White
                        </label>
                        <label>
                            <input type="radio" name="jar_color" value="Shiny Black" onChange={handleInputChange} />{" "}
                            Shiny Black
                        </label>
                        <label>
                            <input type="radio" name="jar_color" value="Frosted Pink" onChange={handleInputChange} />{" "}
                            Frosted Pink
                        </label>
                        <label>
                            <input type="radio" name="jar_color" value="Frosted Green" onChange={handleInputChange} />{" "}
                            Frosted Green
                        </label>
                        <label>
                            <input type="radio" name="jar_color" value="Amber" onChange={handleInputChange} />{" "}
                            Amber
                        </label>
                    </div>
                </div>

                {/* Question 5 */}
                <div className="form-group">
                    <label>5. Do you need any special labeling or messaging on the candle?</label>
                    <div className="options">
                        <label>
                            <input type="radio" name="special_labeling" value="Yes" onChange={handleInputChange} />{" "}
                            Yes (Please provide the message below)
                        </label>
                        <label>
                            <input type="radio" name="special_labeling" value="No" onChange={handleInputChange} />{" "}
                            No
                        </label>
                        <textarea
                            name="custom_message"
                            placeholder="Enter your message here..."
                            rows="3"
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>

                {/* Question 6 */}
                <div className="form-group">
                    <label>6. When do you need the candles by?</label>
                    <div className="options">
                        <label>
                            <input type="radio" name="delivery_timeline" value="Within a week" onChange={handleInputChange} />{" "}
                            Within a week
                        </label>
                        <label>
                            <input type="radio" name="delivery_timeline" value="1-2 weeks" onChange={handleInputChange} />{" "}
                            1-2 weeks
                        </label>
                        <label>
                            <input type="radio" name="delivery_timeline" value="2-3 weeks" onChange={handleInputChange} />{" "}
                            2-3 weeks
                        </label>
                        <label>
                            <input type="radio" name="delivery_timeline" value="Other" onChange={handleInputChange} />{" "}
                            Other (please specify):{" "}
                            <input type="text" name="otherTimeline" onChange={handleInputChange} />
                        </label>
                    </div>
                </div>

                {/* Question 7 */}
                <div className="form-group">
                    <label>7. Any additional notes or requests for your personalized candles?</label>
                    <textarea
                        name="additional_notes"
                        placeholder="Enter your notes here..."
                        rows="3"
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* Contact Details Section */}
                <div className="form-group">
                    <h3>Contact Details</h3>
                    <p align="left">
                        Please provide your contact information so we can get in touch with you regarding your order.
                    </p>
                    <label>Email Address:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        onChange={handleInputChange}
                    />
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phone_number"
                        placeholder="Enter your phone number"
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Order"}
                </button>
                {loading && <div className="loading">Please wait...</div>}
            </form>
        </div>
    );
};

export default CandleForm;