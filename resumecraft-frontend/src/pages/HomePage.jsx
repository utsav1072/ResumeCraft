import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthContext from '../context/authcontext';




const HomePage = () => {
  const {selectedMode, Modes} = React.useContext(AuthContext)
  const [mode, setMode] = React.useState(selectedMode);
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    Modes((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  
  return (
    <ThemeProvider theme= {defaultTheme} >
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default' , minHeight: '100vh'}}>
        <Hero/>
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default HomePage