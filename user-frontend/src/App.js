import React, { useEffect, createContext, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { setLogin as setUser, setLogout as logout } from './reduxStore/authSlice';
import Home from './pages/HomePage/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './pages/Profile/Profile';
import CarDetail from './pages/CarDetail/CarDetail';
import TestDrive from './pages/TestDrive/TestDrive';
import Contacts from './pages/Contacts/Contacts';
import CarLoan from './pages/CarLoan/CarLoan';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import axios from './axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/user', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setUser(response.data);
            }).catch(error => {
                console.error('Error fetching user data:', error);
                localStorage.removeItem('token');
            });
        }
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function App() {
    const user = useSelector((state) => state.auth.user); // Use user from Redux store
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Các đường dẫn muốn ẩn Navbar
    const hideNavbarPaths = ['/login', '/register'];

    // Remove the useEffect that fetches user data

    return (
        <AuthProvider>
            <div>
                <Header />
                {/* Chỉ hiển thị Navbar nếu không phải trang login/register */}
                {!hideNavbarPaths.includes(location.pathname) && (
                    <>
                        <Navbar />
                    </>
                )}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/" />} // Use user to check login status
                    />
                    <Route
                        path="/register"
                        element={!user ? <Register /> : <Navigate to="/" />} // Use user to check login status
                    />
                    <Route
                        path="/profile"
                        element={user ? <UserProfile /> : <Navigate to="/" />} // Use user to check login status
                    />
                    <Route path="/car/detail/:id" element={<CarDetail />} />
                    <Route path="/test-drive" element={<TestDrive />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/car-loan" element={<CarLoan />} />
                    <Route path="/orders-confirmation/:orderId" element={<OrderConfirmation />} />

                    <Route path="*" element={<NotFound />} />
                    <Route path="/404" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
}
const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="not-found status">404</h1>
            <h2 className="not-found error">Page Not Found</h2>
        </div>
    );
};

export default App;