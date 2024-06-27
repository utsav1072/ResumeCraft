import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../services/api';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Box, CircularProgress, Grid, Button, CssBaseline, ThemeProvider, createTheme, alpha } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import HomeIcon from '@mui/icons-material/Home';
import AuthContext from '../context/authcontext';
import TemplateSelector from './TemplateSelector';
import ToggleColorMode from './ToggleColorMode';

// Import all your templates here
import {
  Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8, Template9,
  Template10, Template11, Template12, Template13, Template14, Template15, Template16, Template17,
  Template18, Template19, Template20, Template21, Template22, Template23, Template24
} from '../assets/Constant';

const ResumePDF = () => {
  const { selectedTe, Modes, selectedMode } = useContext(AuthContext);
  const [resumeData, setResumeData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(selectedTe);
  const api = useAxios();
  const navigate = useNavigate();
  const [mode, setMode] = useState(selectedMode);

  const defaultTheme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleColorMode = () => {
    Modes((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'))
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/resume');
        setResumeData(response.data);
      } catch (error) {
        console.error('Error fetching the resume data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDat = async () => {
      try {
        const response = await api.get('/image');
        setImage(response.data.data.image);
      } catch (error) {
        console.error('Error fetching the resume data:', error);
      }
    };

    fetchDat();
  }, []);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'Template1':
        return <Template1 data={resumeData} />;
      case 'Template2':
        return <Template2 data={resumeData} />;
      case 'Template3':
        return <Template3 data={resumeData} />;
      case 'Template4':
        return <Template4 resumeData={resumeData} />;
      case 'Template5':
        return <Template5 resumeData={resumeData} />;
      case 'Template6':
        return <Template6 resumeData={resumeData} />;
      case 'Template7':
        return <Template7 resumeData={resumeData} />;
      case 'Template8':
        return <Template8 resumeData={resumeData} />;
      case 'Template9':
        return <Template9 resumeData={resumeData} />;
      case 'Template10':
        return <Template10 data={resumeData} />;
      case 'Template11':
        return <Template11 data={resumeData} />;
      case 'Template12':
        return <Template12 resumeData={resumeData} />;
      case 'Template13':
        return <Template13 resumeData={resumeData} />;
      case 'Template14':
        return <Template14 resumeData={resumeData} />;
      case 'Template15':
        return <Template15 resumeData={resumeData} />;
      case 'Template16':
        return <Template16 resumeData={resumeData} />;
      case 'Template17':
        return <Template17 data={resumeData} profilePicUrl={image} />;
      case 'Template18':
        return <Template18 data={resumeData} profilePicUrl={image} />;
      case 'Template19':
        return <Template19 data={resumeData} profilePicUrl={image} />;
      case 'Template20':
        return <Template20 data={resumeData} profilePicUrl={image} />;
      case 'Template21':
        return <Template21 data={resumeData} profilePicUrl={image} />;
      case 'Template22':
        return <Template22 data={resumeData} profilePicUrl={image} />;
      case 'Template23':
        return <Template23 data={resumeData} profilePicUrl={image} />;
      case 'Template24':
        return <Template24 data={resumeData} profilePicUrl={image} />;
      default:
        return <Template1 data={resumeData} />;
    }
  };

  if (!resumeData) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box padding={2}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TemplateSelector onSelect={setSelectedTemplate} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PDFDownloadLink document={renderTemplate()} fileName="resume.pdf">
              {({ loading }) => (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudDownloadIcon />}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? 'Loading document...' : 'Download Resume'}
                </Button>
              )}
            </PDFDownloadLink>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              fullWidth
            >
              Home
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" alignItems="center" marginTop={2}>
        <Box
  width="100%"
  maxWidth="100%"
  height={{ xs: '400px', sm: '600px', md: '800px' }}
  border={1}
  borderColor="grey.300"
  sx={(theme) => ({
    alignSelf: 'center',
    borderRadius: '10px',
    outline: '1px solid',
    outlineColor:
      theme.palette.mode === 'light'
        ? alpha('#BFCCD9', 0.5)
        : alpha('#9CCCFC', 0.4),
    boxShadow:
      theme.palette.mode === 'light'
        ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
        : `0 0 24px 12px ${alpha('#033363', 0.6)}`,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none', // Remove box shadow on smaller screens
    },
  })}
>
  <PDFViewer width="100%" height="100%">
    {renderTemplate()}
  </PDFViewer>
</Box>

        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default ResumePDF;
