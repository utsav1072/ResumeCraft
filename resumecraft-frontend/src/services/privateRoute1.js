import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAxios from './api';
import { CircularProgress } from '@mui/material';

const PrivateRoute = ({ children }) => {
    const api = useAxios();
    const [loading, setLoading] = useState(true);
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('resume/');
                setResumeData(response.data);
            } catch (error) {
                setResumeData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress/></div>; // or a spinner, etc.
    }

    return resumeData ? children : <Navigate to="/dashboard" />;
};

export default PrivateRoute;
