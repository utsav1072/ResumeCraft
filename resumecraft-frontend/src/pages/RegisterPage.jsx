import { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AuthContext from '../context/authcontext';
import ToggleColorMode from '../components/ToggleColorMode';
import { motion } from 'framer-motion';
import { Paper, Alert, Snackbar } from '@mui/material';

const RegisterPage = () => {
    const { registerUser, selectedMode, Modes } = useContext(AuthContext);
    const [mode, setMode] = useState(selectedMode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        Modes((prev) => (prev === 'dark' ? 'light' : 'dark'));
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        
        if (!email || !username || !password || !password2) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== password2) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        
        try {
            await registerUser(email, username, password, password2);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
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
                                        Create Account
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        color="text.secondary"
                                        sx={{ textAlign: 'center', mb: 3 }}
                                    >
                                        Join ResumeCraft and build your perfect resume
                                    </Typography>
                                </motion.div>
                            </Box>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <Box component="form" onSubmit={handleRegister} noValidate>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                        name="password2"
                                        label="Confirm Password"
                                        type="password"
                                        id="password2"
                                        autoComplete="new-password"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
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
                                            label="I agree to the terms and conditions"
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
                                        {loading ? 'Creating Account...' : 'Sign Up'}
                                    </Button>

                                    <Grid 
                                        container
                                        spacing={0}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{ mt: 3 }}
                                    >
                                        <Grid item>
                                            <Link 
                                                to="/login" 
                                                style={{ 
                                                    color: '#1976d2',
                                                    textDecoration: 'none',
                                                    fontWeight: 600,
                                                    '&:hover': { textDecoration: 'underline' }
                                                }}
                                            >
                                                Already have an account? Login
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

                <Snackbar
                    open={!!success}
                    autoHideDuration={6000}
                    onClose={() => setSuccess('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default RegisterPage;
