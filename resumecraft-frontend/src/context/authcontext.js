import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Swal from 'sweetalert2';


const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        const userData = { 
            email,
            password 
        };

        try {
            const response = await axios.post('https://utsav10721.pythonanywhere.com/api/token/', userData);
            const { data } = response;
            setAuthTokens(data);
            localStorage.setItem("authTokens", JSON.stringify(data));
            setUser(jwtDecode(data.access)); // Decode token after it's stored

            Swal.fire({
                icon: 'success',
                title: 'Logged in successfully!',
                showConfirmButton: false,
                timer: 1000 // Automatically close after 1.5 seconds
            });
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'Credentials are not correct' // Display message for incorrect credentials
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'An unexpected error occurred. Please try again.' // General error message
                });
            }
        }
    };

    const registerUser = async (email, username, password, password2) => {
        // Check if password length is less than 8 characters
        if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: 'Password must be at least 8 characters long.'
            });
            return;
        }
    
        // Check if passwords do not match
        if (password !== password2) {
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: 'Passwords do not match.'
            });
            return;
        }
    
        const userData = {
            email,
            username,
            password,
            password2
        };
    
        try {
            const response = await axios.post(`https://utsav10721.pythonanywhere.com/api/register/`, userData);
            console.log('User registered:', response.data);
    
            Swal.fire({
                icon: 'success',
                title: 'Registration successful!',
                showConfirmButton: false,
                timer: 1000 // Automatically close after 1.5 seconds
            });
        } catch (error) {
            console.error('Error registering user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: error.response ? error.response.data.detail : 'An unexpected error occurred. Please try again.'
            });
        }
    };
    
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        Swal.fire({
            icon: 'info',
            title: 'Logged out',
            text: 'You have been logged out.',
            showConfirmButton: false,
            timer: 1000 // Automatically close after 1.5 seconds
        });
    };

    const [selectedTe, setSelectedTe] = useState('Template1');
    const TemplateSel = (current) => {
        setSelectedTe(current);
    };

    const [selectedMode, setSelectedMode] = useState('light');
    const Modes = (current) => {
        setSelectedMode(current);
    };

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        loginUser,
        registerUser,
        logoutUser,
        TemplateSel,
        selectedTe,
        setSelectedTe,
        Modes,
        selectedMode,
        setSelectedMode
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
