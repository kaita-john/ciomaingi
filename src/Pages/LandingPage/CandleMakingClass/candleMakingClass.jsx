import './CandleMakingClass.css';
import React, {useState} from "react";
import axios from 'axios';

const CandleMakingClass = () => {


    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        classType: '',
        availableDateTime: '',
        participants: '',
        eventType: '',
        address: '',
        specialRequests: '',
        amount: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        let newFormData = {...formData, [name]: value}
        // Set amount when classType changes
        if (name === 'classType') {
            if (value === 'Online Class') {
                newFormData.amount = '10';
            } else if (value === 'Private In-Person Class') {
                newFormData.amount = '10';
            } else {
                newFormData.amount = '';
            }
        }
        setFormData(newFormData);
    };

    const getButtonText = () => {
        if (isLoading) return 'Creating...';
        if (formData.classType === 'Online Class') {
            return 'Book at 2,000 KES';
        }
        if (formData.classType === 'Private In-Person Class') {
            return 'Book at 4,500 KES';
        }
        return 'Book Now';
    };

    const validateForm = () => {
        const requiredFields = ['fullName', 'phoneNumber', 'email', 'classType', 'availableDateTime'];
        const inPersonRequiredFields = ['participants', 'eventType', 'address'];

        // Check common required fields
        for (const field of requiredFields) {
            if (!formData[field].trim()) {
                return `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
            }
        }

        // Additional validation for Private In-Person Class
        if (formData.classType === 'Private In-Person Class') {
            for (const field of inPersonRequiredFields) {
                if (!formData[field].trim()) {
                    return `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} for in-person classes`;
                }
            }
            if (parseInt(formData.participants) < 1) {
                return 'Number of participants must be at least 1';
            }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return 'Please enter a valid email address';
        }

        // Basic phone number validation (adjust as needed)
        const phoneRegex = /^\+?[\d\s-]{9,}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            return 'Please enter a valid phone number';
        }

        return null; // No validation errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            alert(validationError);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/candleclasses/create', formData);
            console.log('Booking Response:', response.data);
            alert('Thank you! Your booking request has been successfully submitted.');
            // Reset form
            setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
                classType: '',
                availableDateTime: '',
                participants: '',
                eventType: '',
                address: '',
                specialRequests: '',
                amount: ''
            });
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('There was an error submitting your booking. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Rest of the component remains the same...
    return (
        <div className="page-container">
            <header className="header">
                <h1>CandleMaking Classes</h1><br/>
            </header>

            <section className="section">
                <div className="card">
                    <h2 align='center'>Online Classes</h2>
                    <p>Join our <strong>Online Candle Making Classes</strong> to learn the basics of eco-friendly candle
                        making...</p>
                </div>
                <div className="card">
                    <h2 align='center'>Private In-Person Classes</h2>
                    <p>For a more personalized experience, enjoy our <strong>Private In-Person Classes</strong> within
                        Nairobi or Kiambu counties...</p>
                </div>
            </section>

            <section className="form-section">
                <h2>Book Your Class</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="input-field" disabled={isLoading}
                    />
                    <input type="tel" name="phoneNumber" placeholder="254" value={formData.phoneNumber} onChange={handleChange} className="input-field" disabled={isLoading}/>
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="input-field" disabled={isLoading}/>
                    <select name="classType" value={formData.classType} onChange={handleChange} className="select-field" disabled={isLoading}>
                        <option value="">Select Class Type</option>
                        <option value="Online Class">Online Class</option>
                        <option value="Private In-Person Class">Private In-Person Class</option>
                    </select>
                    <input type="text" name="availableDateTime" placeholder="Available Dates and Times (from August 2025)" value={formData.availableDateTime} onChange={handleChange} className="input-field" disabled={isLoading}/>
                    {formData.classType === 'Private In-Person Class' && (
                        <>
                            <input type="number" name="participants" placeholder="Number of Participants" value={formData.participants} onChange={handleChange} className="input-field" min="1" disabled={isLoading}/>
                            <input type="text" name="eventType" placeholder="Type of Event (e.g., Birthday, Corporate Event)" value={formData.eventType} onChange={handleChange} className="input-field" disabled={isLoading}/>
                            <input type="text" name="address" placeholder="Address – Location and Town" value={formData.address} onChange={handleChange} className="input-field" disabled={isLoading}/>
                        </>
                    )}
                    <textarea name="specialRequests" placeholder="Any Special Requests or Questions?" value={formData.specialRequests} onChange={handleChange} className="textarea-field" disabled={isLoading}/>
                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading && <span className="loading-indicator">⌛ </span>}
                        {getButtonText()}
                    </button>
                </form>
            </section>
        </div>
    );

};

export default CandleMakingClass;