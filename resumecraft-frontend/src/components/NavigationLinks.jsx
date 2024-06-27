import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationLinks = () => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      <Typography variant="body2" color="text.primary">
        <MuiLink
          component={Link}
          to="/dashboard"
          underline="none"
          color="inherit"
          sx={{
            padding: '0.5rem 1rem',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
            },
          }}
        >
          Dashboard
        </MuiLink>
      </Typography>
      <Typography variant="body2" color="text.primary">
        <MuiLink
          component={Link}
          to="#"
          underline="none"
          color="inherit"
          sx={{
            padding: '0.5rem 1rem',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
            },
          }}
        >
          Projects
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default NavigationLinks;
