import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './viewClassBookings.css';

const ClassBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://ciomaingifarm.website/api/v1/candleclasses/list');
                setBookings(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load bookings. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleDelete = async (bookingId) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) {
            return;
        }

        try {
            await axios.delete(`http://ciomaingifarm.website/api/v1/candleclasses/${bookingId}`);
            setBookings(bookings.filter((booking) => booking.id !== bookingId));
            alert('Booking deleted successfully!');
        } catch (err) {
            console.error('Error deleting booking:', err);
            alert('Failed to delete booking. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading bookings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="bookings-container">
            <header className="bookings-header">
                <br/>
                <h3>Candle Making Class Bookings</h3>
            </header>

            <section className="bookings-list">
                {bookings.length === 0 ? (
                    <p className="no-bookings">No bookings found.</p>
                ) : (
                    <div className="bookings-grid">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="booking-card">
                                <div className="card-header">
                                    <h2 style={{'color': ''}}>{booking.fullName}</h2>
                                    <span
                                        className={`status-badge ${booking.classType.toLowerCase().replace(' ', '-')}`}>
                    {booking.classType}
                  </span>
                                </div>
                                <div className="card-content">
                                    <div className="info-row">
                                        <span className="label">Phone:</span>
                                        <span className="value">{booking.phoneNumber}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">Email:</span>
                                        <span className="value">{booking.email}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">Date/Time:</span>
                                        <span className="value">{booking.availableDateTime}</span>
                                    </div>
                                    {booking.classType === 'Private In-Person Class' && (
                                        <>
                                            <div className="info-row">
                                                <span className="label">Participants:</span>
                                                <span className="value">{booking.participants}</span>
                                            </div>
                                            <div className="info-row">
                                                <span className="label">Event Type:</span>
                                                <span className="value">{booking.eventType}</span>
                                            </div>
                                            <div className="info-row">
                                                <span className="label">Address:</span>
                                                <span className="value">{booking.address}</span>
                                            </div>
                                        </>
                                    )}
                                    <div className="info-row">
                                        <span className="label">Amount:</span>
                                        <span className="value">{booking.amount} KES</span>
                                    </div>
                                    {booking.specialRequests && (
                                        <div className="info-row special-requests">
                                            <span className="label">Special Requests:</span>
                                            <span className="value">{booking.specialRequests}</span>
                                        </div>
                                    )}
                                    <div className="">
                                        <button style={{width: 100}}
                                            className=""
                                            onClick={() => handleDelete(booking.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ClassBookings;