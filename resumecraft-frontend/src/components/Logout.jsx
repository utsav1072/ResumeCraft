import React, { useContext } from 'react';
import { Button } from '@mui/material';
import AuthContext from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser();
    navigate('/login')
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
