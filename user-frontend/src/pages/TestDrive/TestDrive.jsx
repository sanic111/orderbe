import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import './TestDrive.css';
import { useSelector } from 'react-redux';

const TestDrive = () => {
    const navigate = useNavigate();
    const [carInfo, setCarInfo] = useState(null);
    const [testDriveDate, setTestDriveDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const user = useSelector((state) => state.auth.user); // Use user from Redux store

    useEffect(() => {
        const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
        if (selectedCar) {
            setCarInfo(selectedCar);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const validateTestDriveDate = () => {
        const currentDate = new Date();
        const selectedDate = new Date(testDriveDate);
        const differenceInTime = selectedDate.getTime() - currentDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return differenceInDays >= 2;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateTestDriveDate()) {
            setError('Test drive date must be at least 2 days from today.');
            return;
        }

        try {
            const response = await axios.post('/test-drive-request', {
                customer_id: user.id, // Use user from Redux store
                car_id: carInfo.id,
                test_drive_date: testDriveDate
            });
            setSuccess('Test drive request successfully submitted!');
            setError('');
            navigate('/');
        } catch (err) {
            setError('Failed to submit test drive request. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="test-drive-container">
            <h2>Request a Test Drive</h2>
            {carInfo && (
                <div className="car-details">
                    <h1>{carInfo.brand.name} {carInfo.model}</h1>
                    <img src={carInfo.images[0].image_url} alt={carInfo.model} />
                </div>
            )}

            <form onSubmit={handleSubmit} className="test-drive-form">
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        id="name"
                        value={user.fullname} // Use user from Redux store
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={user.email} // Use user from Redux store
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={user.phone_number} // Use user from Redux store
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="testDriveDate">Test Drive Date</label>
                    <input
                        type="date"
                        id="testDriveDate"
                        value={testDriveDate}
                        onChange={(e) => setTestDriveDate(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
};

export default TestDrive;