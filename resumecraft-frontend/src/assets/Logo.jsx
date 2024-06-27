import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const LogoTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 'bold',
  fontSize: '1.5rem', // Smaller size
  color: theme.palette.primary.main, // Use primary color from the theme
  letterSpacing: '0.1em',
  padding: '10px', // Add padding
}));

const Logo = () => {
  return (
    <LogoTypography>
      ResumeCraft
    </LogoTypography>
  );
};

export default Logo;
