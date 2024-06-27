import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  ThemeProvider
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import useAxios from '../services/api';
import ProfilePic from '../components/ProfilPic';
import AuthContext from '../context/authcontext';
import {CssBaseline} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ToggleColorMode from '../components/ToggleColorMode'
import { useContext } from 'react';
import Sidebar from '../components/SideBar';

const Dashboard = () => {
  const { selectedMode, Modes } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState(selectedMode);
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

  const [message, setMessage] = useState('');
  const api = useAxios();

  useEffect(() => {
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
      })
      .catch(error => {
        console.error('There was an error fetching the resume!', error);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('resume/', resume)
      .then(response => {
        setMessage('Information updated successfully!');
      })
      .catch(error => {
        console.error('There was an error updating the resume!', error);
        setMessage('Failed to update information.');
      });
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
    sections[section].current.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
    <Box sx={{ display: 'flex', flexDirection: 'row', padding: 2 }}>
      <Sidebar mode={mode} toggleColorMode={toggleColorMode} scrollToSection={scrollToSection}/>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Dashboard</Typography>
        <form onSubmit={handleSubmit}>
        <ProfilePic/>
          <TextField
            label="Full Name"
            name="full_name"
            value={resume.full_name}
            onChange={(e) => handleChange(e)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Info"
            name="contact_info"
            value={resume.contact_info}
            onChange={(e) => handleChange(e)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email_user"
            value={resume.email_user}
            onChange={(e) => handleChange(e)}
            fullWidth
            margin="normal"
          />

          <Typography ref={sections.important_links} variant="h5">Important Links</Typography>
          {resume.important_links.map((link, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={5}>
                <TextField
                  label="URL"
                  name={`important_links[${index}].url`}
                  value={link.url}
                  onChange={(e) => handleChange(e, 'important_links', index, undefined, 'url')}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Link Name"
                  name={`important_links[${index}].link_name`}
                  value={link.link_name}
                  onChange={(e) => handleChange(e, 'important_links', index, undefined, 'link_name')}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemove('important_links', index)}>
                  <RemoveCircleOutline />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAdd('important_links')}
            startIcon={<AddCircleOutline />}
            sx={{ margin: 2 }}
          >
            Add Link
          </Button>

          <Typography ref={sections.educations} variant="h5">Education</Typography>
          {resume.educations.map((education, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                label="School Name"
                name={`educations[${index}].school_name`}
                value={education.school_name}
                onChange={(e) => handleChange(e, 'educations', index, undefined, 'school_name')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Degree"
                name={`educations[${index}].degree`}
                value={education.degree}
                onChange={(e) => handleChange(e, 'educations', index, undefined, 'degree')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Start Date"
                name={`educations[${index}].start_date`}
                value={education.start_date}
                onChange={(e) => handleChange(e, 'educations', index, undefined, 'start_date')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="End Date"
                name={`educations[${index}].end_date`}
                value={education.end_date}
                onChange={(e) => handleChange(e, 'educations', index, undefined, 'end_date')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name={`educations[${index}].address`}
                value={education.address}
                onChange={(e) => handleChange(e, 'educations', index, undefined, 'address')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Marks"
                name={`educations[${index}].marks`}
                value={education.marks}
                onChange={(e) => handleChange(e, 'educations', index, undefined, 'marks')}
                fullWidth
                margin="normal"
              />
              <IconButton onClick={() => handleRemove('educations', index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAdd('educations')}
            startIcon={<AddCircleOutline />}
            sx={{ margin: 2 }}
          >
            Add Education
          </Button>

          <Typography ref={sections.skills} variant="h5">Skills</Typography>
          {resume.skills.map((skill, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                label="Skill Name"
                name={`skills[${index}].name`}
                value={skill.name}
                onChange={(e) => handleChange(e, 'skills', index, undefined, 'name')}
                fullWidth
                margin="normal"
              />
              <IconButton onClick={() => handleRemove('skills', index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAdd('skills')}
            startIcon={<AddCircleOutline />}
            sx={{ margin: 2 }}
          >
            Add Skill
          </Button>

          <Typography ref={sections.courseworks} variant="h5">Coursework</Typography>
          {resume.courseworks.map((coursework, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                label="Coursework Title"
                name={`courseworks[${index}].title`}
                value={coursework.title}
                onChange={(e) => handleChange(e, 'courseworks', index, undefined, 'title')}
                fullWidth
                margin="normal"
              />
              <IconButton onClick={() => handleRemove('courseworks', index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAdd('courseworks')}
            startIcon={<AddCircleOutline />}
            sx={{ margin: 2 }}
          >
            Add Coursework
          </Button>

          <Typography ref={sections.projects} variant="h5">Projects</Typography>
          {resume.projects.map((project, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                label="Project Name"
                name={`projects[${index}].name`}
                value={project.name}
                onChange={(e) => handleChange(e, 'projects', index, undefined, 'name')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Project Description"
                name={`projects[${index}].description`}
                value={project.description}
                onChange={(e) => handleChange(e, 'projects', index, undefined, 'description')}
                fullWidth
                margin="normal"
              />
              {project.bullet_points.map((bullet, subIndex) => (
                <Box key={subIndex} sx={{ marginBottom: 1, marginLeft: 2 }}>
                  <TextField
                    label="Bullet Point"
                    name={`projects[${index}].bullet_points[${subIndex}].point`}
                    value={bullet.point}
                    onChange={(e) => handleChange(e, 'projects', index, subIndex, 'point')}
                    fullWidth
                    margin="normal"
                  />
                  <IconButton onClick={() => handleRemove('projects', index, subIndex)}>
                    <RemoveCircleOutline />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAdd('projects', index, 'bullet_points')}
                startIcon={<AddCircleOutline />}
                sx={{ margin: 2 }}
              >
                Add Bullet Point
              </Button>
              <IconButton onClick={() => handleRemove('projects', index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAdd('projects')}
            startIcon={<AddCircleOutline />}
            sx={{ margin: 2 }}
          >
            Add Project
          </Button>

          {/*Custom Fields*/ }
          <Typography ref={sections.custom_fields} variant="h5">Custom Fields</Typography>
          {resume.custom_fields.map((custom_field, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                label="Custom Feild Heading"
                name={`custom_fields[${index}].heading`}
                value={custom_field.heading}
                onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'heading')}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Sub Heading"
                name={`custom_fields[${index}].subheading`}
                value={custom_field.subheading}
                onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'subheading')}
                fullWidth
                margin="normal"
              />
              <Grid container spacing={2} key={index}>
              <Grid item xs={5}>
                <TextField
                  label="URL"
                  name={`custom_fields[${index}].url`}
                  value={custom_field.url}
                  onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'url')}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Link Name"
                  name={`custom_fields[${index}].link_name`}
                  value={custom_field.link_name}
                  onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'link_name')}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
              <TextField
                label="Description"
                name={`custom_fields[${index}].description`}
                value={custom_field.description}
                onChange={(e) => handleChange(e, 'custom_fields', index, undefined, 'description')}
                fullWidth
                margin="normal"
              />
              <IconButton onClick={() => handleRemove('custom_fields', index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAdd('custom_fields')}
            startIcon={<AddCircleOutline />}
            sx={{ margin: 2 }}
          >
            Add Custom Field
          </Button>

          {/*custom Fields*/}
          <Button variant="contained" color="primary" type="submit" sx={{ margin: 2 }}>
            Save
          </Button>
          {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
        </form>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
