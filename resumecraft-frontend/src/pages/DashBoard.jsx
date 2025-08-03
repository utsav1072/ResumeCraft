import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  ThemeProvider,
  Paper,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Skeleton,
  Chip,
  Divider,
  Fade,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, Save, Edit, Check } from '@mui/icons-material';
import useAxios from '../services/api';
import ProfilePic from '../components/ProfilPic';
import AuthContext from '../context/authcontext';
import {CssBaseline} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useContext } from 'react';
import Sidebar from '../components/SideBar';

const Dashboard = () => {
  const { selectedMode, Modes } = useContext(AuthContext);
  const [mode, setMode] = useState(selectedMode);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    Modes((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [resume, setResume] = useState({
    full_name: '',
    contact_info: '',
    display_contact_info: true,
    email_user: '',
    important_links: [{ url: '', link_name: '', display: true }],
    educations: [{ school_name: '', degree: '', start_date: '', end_date: '', address: '', marks: '', display: true }],
    skills: [{ name: '', display: true }],
    courseworks: [{ title: '', display: true }],
    projects: [{ name: '', description: '', display: true, bullet_points: [{ point: '', display: true }] }],
    custom_fields: [{ heading: '', url: '', link_name: '', subheading: '', description: '', display: true }]
  });

  const api = useAxios();

  useEffect(() => {
    setLoading(true);
    api.get('resume/')
      .then(response => {
        const fetchedResume = {
          full_name: response.data.full_name || '',
          contact_info: response.data.contact_info || '',
          display_contact_info: response.data.display_contact_info !== undefined ? response.data.display_contact_info : true,
          email_user: response.data.email_user || '',
          important_links: response.data.important_links.length ? response.data.important_links : [{ url: '', link_name: '', display: true }],
          educations: response.data.educations.length ? response.data.educations : [{ school_name: '', degree: '', start_date: '', end_date: '', address: '', marks: '', display: true }],
          skills: response.data.skills.length ? response.data.skills : [{ name: '', display: true }],
          courseworks: response.data.courseworks.length ? response.data.courseworks : [{ title: '', display: true }],
          custom_fields: response.data.custom_fields.length ? response.data.custom_fields : [{ heading: '', subheading: '', url: '', link_name: '', description: '', display: true }],
          projects: response.data.projects.length ? response.data.projects.map(project => ({
            ...project,
            bullet_points: project.bullet_points.length ? project.bullet_points : [{ point: '', display: true }]
          })) : [{ name: '', description: '', display: true, bullet_points: [{ point: '', display: true }] }]
        };
        setResume(fetchedResume);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the resume!', error);
        setLoading(false);
        setSnackbar({ open: true, message: 'Failed to load resume data', severity: 'error' });
      });
  }, []);

  const handleChange = (e, section, index, subIndex, field) => {
    if (section) {
      if (subIndex !== undefined) {
        const updatedSection = resume[section].map((item, idx) => {
          if (idx === index) {
            const updatedSubSection = item.bullet_points.map((subItem, subIdx) =>
              subIdx === subIndex ? { ...subItem, [field]: e.target.value } : subItem
            );
            return { ...item, bullet_points: updatedSubSection };
          }
          return item;
        });
        setResume({ ...resume, [section]: updatedSection });
      } else if (index !== undefined) {
        const updatedSection = resume[section].map((item, idx) =>
          idx === index ? { ...item, [field]: e.target.value } : item
        );
        setResume({ ...resume, [section]: updatedSection });
      }
    } else {
      setResume({ ...resume, [e.target.name]: e.target.value });
    }
  };

  const handleAdd = (section, index, subSection) => {
    if (subSection !== undefined) {
      const updatedSection = resume[section].map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            [subSection]: [...item[subSection], { point: '', display: true }]
          };
        }
        return item;
      });
      setResume({ ...resume, [section]: updatedSection });
    } else {
      setResume({
        ...resume,
        [section]: [
          ...resume[section],
          section === 'important_links'
            ? { url: '', link_name: '', display: true }
            : section === 'educations'
              ? { school_name: '', degree: '', start_date: '', end_date: '', address: '', marks: '', display: true }
              : section === 'skills'
                ? { name: '', display: true }
                : section === 'courseworks'
                  ? { title: '', display: true }
                  : section === 'custom_fields'
                    ? { heading: '', subheading: '', url: '', link_name: '', description: '', display: true }
                    : { name: '', description: '', display: true, bullet_points: [{ point: '', display: true }] }
        ]
      });
    }
  };

  const handleRemove = (section, index, subIndex) => {
    if (subIndex !== undefined) {
      const updatedSection = resume[section].map((item, idx) => {
        if (idx === index) {
          const updatedSubSection = item.bullet_points.filter((_, subIdx) => subIdx !== subIndex);
          return { ...item, bullet_points: updatedSubSection };
        }
        return item;
      });
      setResume({ ...resume, [section]: updatedSection });
    } else {
      const updatedSection = resume[section].filter((_, idx) => idx !== index);
      setResume({ ...resume, [section]: updatedSection });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('resume/', resume);
      setSnackbar({ open: true, message: 'Resume saved successfully!', severity: 'success' });
    } catch (error) {
      console.error('There was an error updating the resume!', error);
      setSnackbar({ open: true, message: 'Failed to save resume', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const sections = {
    important_links: useRef(null),
    educations: useRef(null),
    skills: useRef(null),
    courseworks: useRef(null),
    projects: useRef(null),
    custom_fields: useRef(null)
  };

  const scrollToSection = (section) => {
    sections[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'row', padding: 2 }}>
          <Sidebar mode={mode} toggleColorMode={toggleColorMode} scrollToSection={scrollToSection}/>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Skeleton variant="text" width="60%" height={60} />
            <Skeleton variant="rectangular" width="100%" height={400} sx={{ mt: 2 }} />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
        <Sidebar mode={mode} toggleColorMode={toggleColorMode} scrollToSection={scrollToSection}/>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Fade in={true} timeout={800}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Resume Builder
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={saving}
                  startIcon={saving ? <Check /> : <Save />}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {saving ? 'Saving...' : 'Save Resume'}
                </Button>
              </Box>

              <form onSubmit={handleSubmit}>
                <ProfilePic/>
                
                <Card sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
                      Personal Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Full Name"
                          name="full_name"
                          value={resume.full_name}
                          onChange={(e) => handleChange(e)}
                          fullWidth
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Email"
                          name="email_user"
                          value={resume.email_user}
                          onChange={(e) => handleChange(e)}
                          fullWidth
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Contact Info"
                          name="contact_info"
                          value={resume.contact_info}
                          onChange={(e) => handleChange(e)}
                          fullWidth
                          variant="outlined"
                          multiline
                          rows={2}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card ref={sections.important_links} sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Important Links
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                        onClick={() => handleAdd('important_links')}
                        sx={{ borderRadius: '50px' }}
                      >
                        Add Link
                      </Button>
                    </Box>
                    {resume.important_links.map((link, index) => (
                      <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={5}>
                            <TextField
                              label="URL"
                              value={link.url}
                              onChange={(e) => handleChange(e, 'important_links', index, undefined, 'url')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <TextField
                              label="Link Name"
                              value={link.link_name}
                              onChange={(e) => handleChange(e, 'important_links', index, undefined, 'link_name')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <IconButton 
                              onClick={() => handleRemove('important_links', index)}
                              color="error"
                              sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                            >
                              <RemoveCircleOutline />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>

                <Card ref={sections.educations} sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Education
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                        onClick={() => handleAdd('educations')}
                        sx={{ borderRadius: '50px' }}
                      >
                        Add Education
                      </Button>
                    </Box>
                    {resume.educations.map((education, index) => (
                      <Paper key={index} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="School Name"
                              value={education.school_name}
                              onChange={(e) => handleChange(e, 'educations', index, undefined, 'school_name')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Degree"
                              value={education.degree}
                              onChange={(e) => handleChange(e, 'educations', index, undefined, 'degree')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Start Date"
                              value={education.start_date}
                              onChange={(e) => handleChange(e, 'educations', index, undefined, 'start_date')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="End Date"
                              value={education.end_date}
                              onChange={(e) => handleChange(e, 'educations', index, undefined, 'end_date')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Address"
                              value={education.address}
                              onChange={(e) => handleChange(e, 'educations', index, undefined, 'address')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Marks"
                              value={education.marks}
                              onChange={(e) => handleChange(e, 'educations', index, undefined, 'marks')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <IconButton 
                                onClick={() => handleRemove('educations', index)}
                                color="error"
                                sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                              >
                                <RemoveCircleOutline />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>

                <Card ref={sections.skills} sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Skills
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                        onClick={() => handleAdd('skills')}
                        sx={{ borderRadius: '50px' }}
                      >
                        Add Skill
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {resume.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill.name || 'New Skill'}
                          onDelete={() => handleRemove('skills', index)}
                          sx={{ 
                            '&:hover': { transform: 'scale(1.05)' },
                            transition: 'all 0.2s ease'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card ref={sections.courseworks} sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Coursework
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                        onClick={() => handleAdd('courseworks')}
                        sx={{ borderRadius: '50px' }}
                      >
                        Add Coursework
                      </Button>
                    </Box>
                    {resume.courseworks.map((coursework, index) => (
                      <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <TextField
                            label="Coursework Title"
                            value={coursework.title}
                            onChange={(e) => handleChange(e, 'courseworks', index, undefined, 'title')}
                            fullWidth
                            variant="outlined"
                          />
                          <IconButton 
                            onClick={() => handleRemove('courseworks', index)}
                            color="error"
                            sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                          >
                            <RemoveCircleOutline />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>

                <Card ref={sections.projects} sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Projects
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                        onClick={() => handleAdd('projects')}
                        sx={{ borderRadius: '50px' }}
                      >
                        Add Project
                      </Button>
                    </Box>
                    {resume.projects.map((project, index) => (
                      <Paper key={index} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              label="Project Name"
                              value={project.name}
                              onChange={(e) => handleChange(e, 'projects', index, undefined, 'name')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Project Description"
                              value={project.description}
                              onChange={(e) => handleChange(e, 'projects', index, undefined, 'description')}
                              fullWidth
                              variant="outlined"
                              multiline
                              rows={3}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                              Bullet Points
                            </Typography>
                            {project.bullet_points.map((bullet, subIndex) => (
                              <Box key={subIndex} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <TextField
                                  label="Bullet Point"
                                  value={bullet.point}
                                  onChange={(e) => handleChange(e, 'projects', index, subIndex, 'point')}
                                  fullWidth
                                  variant="outlined"
                                />
                                <IconButton 
                                  onClick={() => handleRemove('projects', index, subIndex)}
                                  color="error"
                                  sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                                >
                                  <RemoveCircleOutline />
                                </IconButton>
                              </Box>
                            ))}
                            <Button
                              variant="outlined"
                              startIcon={<AddCircleOutline />}
                              onClick={() => handleAdd('projects', index, 'bullet_points')}
                              sx={{ borderRadius: '50px' }}
                            >
                              Add Bullet Point
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <IconButton 
                                onClick={() => handleRemove('projects', index)}
                                color="error"
                                sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                              >
                                <RemoveCircleOutline />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>

                <Card ref={sections.custom_fields} sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Custom Fields
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                        onClick={() => handleAdd('custom_fields')}
                        sx={{ borderRadius: '50px' }}
                      >
                        Add Custom Field
                      </Button>
                    </Box>
                    {resume.custom_fields.map((custom_field, index) => (
                      <Paper key={index} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Custom Field Heading"
                              value={custom_field.heading}
                              onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'heading')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Sub Heading"
                              value={custom_field.subheading}
                              onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'subheading')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="URL"
                              value={custom_field.url}
                              onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'url')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Link Name"
                              value={custom_field.link_name}
                              onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'link_name')}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Description"
                              value={custom_field.description}
                              onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'description')}
                              fullWidth
                              variant="outlined"
                              multiline
                              rows={3}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <IconButton 
                                onClick={() => handleRemove('custom_fields', index)}
                                color="error"
                                sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                              >
                                <RemoveCircleOutline />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>
              </form>
            </Box>
          </Fade>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Dashboard;
