import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';

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
            const response = await axios.post('http://localhost:8000/api/token/', userData);
            const { data } = response;
            setAuthTokens(data);
            localStorage.setItem("authTokens", JSON.stringify(data));
            setUser(jwtDecode(data.access)); // Decode token after it's stored
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const registerUser = async (email, username, password, password2) => {
        const userData = {
            email,
            username,
            password,
            password2
        };
        
        try {
            const response = await axios.post(`http://localhost:8000/api/register/`, userData);
            console.log('User registered:', response.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
    };

    const [selectedTe, setSelectedTe] = useState('Template1');

    const TemplateSel =  (current) => {
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
        <AuthContext.Provider value= {contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
