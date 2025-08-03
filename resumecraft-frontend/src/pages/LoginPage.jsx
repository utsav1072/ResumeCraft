// LoginPage.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Avatar, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  FormControlLabel, 
  Checkbox, 
  CssBaseline,
  Paper,
  Container,
  Alert,
  Snackbar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../context/authcontext';
import ToggleColorMode from '../components/ToggleColorMode';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { loginUser, selectedMode, Modes } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = React.useState(selectedMode);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    Modes((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      setError('');
      try {
        await loginUser(email, password);
        navigate('/dashboard');
      } catch (err) {
        setError('Invalid email or password. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          p: 2,
        }}
      >
        <Container component="main" maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Paper
              elevation={24}
              sx={{
                p: 4,
                borderRadius: 4,
                background: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(30, 30, 30, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Avatar 
                    sx={{ 
                      m: 1, 
                      bgcolor: 'primary.main',
                      width: 64,
                      height: 64,
                      boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                    }}
                  >
                    <LockOutlinedIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Typography 
                    component="h1" 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textAlign: 'center',
                      mb: 1,
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ textAlign: 'center', mb: 3 }}
                  >
                    Sign in to your ResumeCraft account
                  </Typography>
                </motion.div>
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Box component="form" onSubmit={handleLogin} noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    variant="outlined"
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    variant="outlined"
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                      boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <Grid container sx={{ mt: 3 }}>
                    <Grid item xs>
                      <Link 
                        href="#" 
                        variant="body2"
                        style={{ 
                          color: '#1976d2',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link 
                        to="/register" 
                        style={{ 
                          color: '#1976d2',
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Paper>
          </motion.div>
        </Container>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
