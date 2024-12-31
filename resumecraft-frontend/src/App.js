// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Loginpage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AnalyzeResume from './pages/AnalyzeResume'
import PrivateRoute from './services/privateRoute';
import PrivateRoute1 from './services/privateRoute1';
import DashBoard from './pages/DashBoard';
import MyProjects from './pages/MyProjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze-resume" element={<AnalyzeResume />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/templates" 
          element={
            <PrivateRoute1>
              <MyProjects />
            </PrivateRoute1>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
