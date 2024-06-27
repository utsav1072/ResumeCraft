import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Divider,
  Typography,
  MenuItem,
  Drawer,
  Link as MuiLink,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import Logout from './Logout';
import LoginButton from './LoginButton';
import { Link } from 'react-router-dom';
import AuthContext from '../context/authcontext'; // Adjust path as necessary
import Logo from '../assets/Logo';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const { authTokens } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Logo/>
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
                    to="/templates"
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
                    All Templates
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {authTokens ? <Logout /> : <LoginButton />}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem component={Link} to="/dashboard">
                    Dashboard
                  </MenuItem>
                  <MenuItem component={Link} to="/templates">
                    All Templates
                  </MenuItem>
                  <Divider />
                  {authTokens ? (
                    <MenuItem>
                      <Logout />
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <LoginButton />
                    </MenuItem>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
