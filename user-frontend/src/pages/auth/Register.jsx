import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import './auth.css'; // Importing the same CSS used for the Login page
import { toast } from 'react-toastify';

function Register() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        const phoneRegex = /^[0-9]{10,11}$/;

        if (!stringRegex.test(fullname)) {
            setError('Invalid Fullname');
            setShowError(true);
            return false;
        } else if (!emailRegex.test(email)) {
            setError('Invalid Email Address');
            setShowError(true);
            return false;
        } else if (!phoneRegex.test(phoneNumber)) {
            setError('Invalid Phone Number');
            setShowError(true);
            return false;
        } else if (!passwordRegex.test(password)) {
            setError('Invalid Password! Must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
            setShowError(true);
            return false;
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
            setShowError(true);
            return false;
        }

        setIsLoading(true);

        try {
            console.log({
                fullname,
                password,
                email,
                phoneNumber,
                address,
                dob: formatDate(dob),
            });
            axios
                .post('/auth/register', {
                    fullname,
                    password,
                    email,
                    phone_number: phoneNumber,
                    address,
                    dob: formatDate(dob),
                })
                .then((response) => {
                    navigate('/login');
                    toast('Successfully created user');
                })
                .catch((error) => {
                    console.error(error.response.data);
                    setError(
                        error.response?.data.error || 'Something went wrong...'
                    );
                    setShowError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (err) {
            console.error(err);
            setError('Something went wrong');
            setShowError(true);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            showError && setShowError(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [showError]);

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Create a new account</h2>

                {showError && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            id="fullname"
                            className="form-input"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="form-input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="form-input"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            className="form-input"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating new account...' : 'Register'}
                    </button>
                </form>

                <div className="signup-redirect">
                    <span>Already have an account? </span>
                    <Link to="/login" className="signup-link">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
