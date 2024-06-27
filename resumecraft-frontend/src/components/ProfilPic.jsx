import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import useAxios from '../services/api';

const ProfilePic = () => {
  const api = useAxios();
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  const fetchProfilePicture = () => {
    api.get('image/')
      .then((response) => {
        setProfilePicUrl(response.data.data.image);
      })
      .catch((error) => {
        setError('Error fetching profile picture');
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    api.post('image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      setProfilePicUrl(response.data.data.image);
      setIsUploading(false);
    })
    .catch((error) => {
      setError('Error uploading image');
      setIsUploading(false);
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'filter 0.3s ease-in-out',
    filter: isHovered ? 'brightness(50%)' : 'none',
  };

  const editIconStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '100px',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor="profilePicInput">
        <Avatar
          alt="Profile Picture"
          src={profilePicUrl ? `http://127.0.0.1:8000${profilePicUrl}` : ''}
          style={avatarStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {isHovered && (
          <IconButton
            style={editIconStyle}
            component="span"
            size="small"
          >
            <EditIcon />
          </IconButton>
        )}
      </label>
      <input
        id="profilePicInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      {isUploading && <p>Uploading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProfilePic;
