// LoginPage.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Avatar, Typography, TextField, Button, Grid, FormControlLabel, Checkbox, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../context/authcontext';
import ToggleColorMode from '../components/ToggleColorMode'

const defaultTheme = createTheme();

const LoginPage = () => {
  const { loginUser, selectedMode, Modes } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = React.useState(selectedMode);
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
      await loginUser(email, password);
      navigate('/dashboard');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" style={{ color: "#393f81" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
