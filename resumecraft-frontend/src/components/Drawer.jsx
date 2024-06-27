import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import ToggleColorMode from './ToggleColorMode'; // Adjust import as per your file structure

const MobileDrawer = ({ open, onClose, navigate, toggleColorMode, mode, scrollToSection }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        <ListItem>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<HomeIcon />}
            onClick={() => {
              navigate('/');
              onClose();
            }}
          >
            Home
          </Button>
        </ListItem>
        <ListItem>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </ListItem>
        <ListItem button onClick={() => {
          scrollToSection('important_links');
          onClose();
        }}>
          <ListItemText primary="Important Links" />
        </ListItem>
        <ListItem button onClick={() => {
          scrollToSection('educations');
          onClose();
        }}>
          <ListItemText primary="Education" />
        </ListItem>
        <ListItem button onClick={() => {
          scrollToSection('skills');
          onClose();
        }}>
          <ListItemText primary="Skills" />
        </ListItem>
        <ListItem button onClick={() => {
          scrollToSection('courseworks');
          onClose();
        }}>
          <ListItemText primary="Coursework" />
        </ListItem>
        <ListItem button onClick={() => {
          scrollToSection('projects');
          onClose();
        }}>
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button onClick={() => {
          scrollToSection('custom_fields');
          onClose();
        }}>
          <ListItemText primary="Custom fields" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MobileDrawer;
