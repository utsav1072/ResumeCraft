import React, { useContext } from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authcontext';
import { Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8 } from '../assets/Constant';

const Templates = () => {
  const { TemplateSel } = useContext(AuthContext);
  const totalTemplates = 8; // We are using only 8 templates as mentioned
  const navigate = useNavigate();

  const handleTemplateClick = (templateIndex) => {
    TemplateSel(`Template${templateIndex}`);
    navigate('/templates');
  };

  const templateImages = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8];

  return (
    <Box
      id="templates"
      sx={(theme) => ({
        mt: { xs: 8, sm: 10 },
        p: 3, // Increase padding for more spacing
        alignSelf: 'center',
        width: '100%',
        backgroundSize: 'cover',
        borderRadius: '10px',
        outline: '1px solid',
        outlineColor:
          theme.palette.mode === 'light'
            ? alpha('#BFCCD9', 0.5)
            : alpha('#9CCCFC', 0.1),
        boxShadow:
          theme.palette.mode === 'light'
            ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
            : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: theme.spacing(4), // Add bottom margin for separation
      })}
    >
      <Typography variant='h5' sx={{ marginBottom: "20px" }}>Templates</Typography>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: { xs: 2, sm: 4 },
          pb: 2,
        }}
      >
        {templateImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              flex: '0 0 auto',
              width: { xs: '180px', sm: '240px' }, // Increase width for larger templates
              height: 'auto', // Adjust height as needed
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              cursor: 'pointer',
              scrollSnapAlign: 'center',
            }}
            onClick={() => handleTemplateClick(index + 1)}
          >
            <img
              src={image}
              alt={`Template ${index + 1}`}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Templates;
