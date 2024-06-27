import React, { useState, useContext, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AuthContext from '../context/authcontext';

const TemplateSelector = ({ onSelect }) => {
  const { selectedTe, TemplateSel } = useContext(AuthContext);
  const [selectedTemplate, setSelectedTemplate] = useState(selectedTe);

  useEffect(() => {
    setSelectedTemplate(selectedTe);
  }, [selectedTe]);

  const handleTemplateChange = (event) => {
    const value = event.target.value;
    TemplateSel(value);
    setSelectedTemplate(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  const templateOptions = Array.from({ length: 24 }, (_, index) => index + 1);

  return (
    <div style={{ margin: '8px' }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="template-select-label">Choose a template</InputLabel>
        <Select
          labelId="template-select-label"
          id="template-select"
          value={selectedTemplate}
          onChange={handleTemplateChange}
          label="Choose a template"
        >
          {templateOptions.map((index) => (
            <MenuItem key={`Template${index}`} value={`Template${index}`}>
              {`Template ${index}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TemplateSelector;
