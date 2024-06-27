import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Box>
      <Button
        color="primary"
        variant="text"
        size="small"
        component={Link}
        to="/login"
      >
        Login
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="small"
        component={Link}
        to="/register"
      >
        Register
      </Button>
    </Box>
  );
};

export default LoginButton;
