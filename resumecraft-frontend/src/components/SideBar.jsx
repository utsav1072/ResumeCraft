import React from 'react';
import {
  Paper,
  List,
  ListItem,
  Button,
  ListItemText,
  useTheme,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode'; // Adjust import as per your file structure
import MobileDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ mode, toggleColorMode, scrollToSection }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Sidebar for larger screens */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', sm: 'auto' }, // Full width on small screens, auto on larger screens
          maxWidth: 280, // Limit width on larger screens if needed
          padding: 2,
          marginRight: 2,
          position: 'sticky',
          top: 16, // Adjust the top value as needed
          height: 'calc(100vh - 32px)', // Adjust the height as needed
          overflowY: 'auto',
          display: { xs: 'none', sm: 'block' }, // Hide on small screens, show on larger screens
        }}
      >
        <List component="nav">
          <ListItem>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')} // Replace with your navigation function
            >
              Home
            </Button>
          </ListItem>
          <ListItem>
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('important_links')}>
            <ListItemText primary="Important Links" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('educations')}>
            <ListItemText primary="Education" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('skills')}>
            <ListItemText primary="Skills" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('courseworks')}>
            <ListItemText primary="Coursework" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('projects')}>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('custom_fields')}>
            <ListItemText primary="Custom fields" />
          </ListItem>
        </List>
      </Paper>

      {/* MobileDrawer button for small screens */}
      <IconButton
        sx={{
          display: { xs: 'block', sm: 'none' }, // Show on small screens, hide on larger screens
          position: 'fixed',
          top: theme.spacing(2),
          right: theme.spacing(2),
          zIndex: theme.zIndex.drawer + 1,
        }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>

      {/* MobileDrawer for small screens */}
      <MobileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        navigate={navigate}
        toggleColorMode={toggleColorMode}
        mode={mode}
        scrollToSection={scrollToSection}
      />
    </ThemeProvider>
  );
};

export default Sidebar;
