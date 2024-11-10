import React, { useState, useRef } from 'react';
import { TextField, IconButton, InputAdornment, Menu, MenuItem, Chip, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TextFieldWithMultiSelect = ({ 
  label, name, value, onChange, predefinedValues = [],
  required = false, fullWidth = true, margin = 'dense' 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValues, setSelectedValues] = useState(value ? value.split(', ') : []);
  const [inputValue, setInputValue] = useState(''); // For user input
  const inputRef = useRef(null);

  // Open the dropdown menu
  const handleMenuOpen = (event) => { 
    setAnchorEl(event.currentTarget); 
  };

  // Close the dropdown menu
  const handleMenuClose = () => { 
    setAnchorEl(null); 
  };

  // Handle selecting a predefined comment and adding it to the selected values
  const handleSelectValue = (text) => {
    const updatedValues = [...selectedValues, text];
    setSelectedValues(updatedValues);
    onChange({ target: { name, value: updatedValues.join(', ') } }); // Pass the selected values as comma-separated string
    setInputValue(''); 
    handleMenuClose();
  };

  // Handle removing selected value from the list
  const handleRemoveValue = (valueToRemove) => {
    const updatedValues = selectedValues.filter((val) => val !== valueToRemove);
    setSelectedValues(updatedValues);
    onChange({ target: { name, value: updatedValues.join(', ') } });
  };

  // Handle user input in the text field
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update input field value
  };

  // Handle adding custom input as a chip when Enter is pressed
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const updatedValues = [...selectedValues, inputValue.trim()];
      setSelectedValues(updatedValues);
      onChange({ target: { name, value: updatedValues.join(', ') } });
      setInputValue(''); // Reset input value after adding
    }
  };

  return (
    <div>
      <TextField
        label={label}
        name={name}
        value={inputValue} 
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        required={required}
        fullWidth={fullWidth}
        margin={margin}
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <Box display="flex" flexWrap="wrap" flexDirection="row" 
                style={{ maxWidth: '100%', paddingRight: '20px'}}
            >
              {selectedValues.map((value, index) => (
                <Chip
                  key={index}
                  label={value}
                  onDelete={() => handleRemoveValue(value)}
                  size="small"
                  style={{ marginRight: 4, marginBottom: 4 }}
                />
              ))}
            </Box>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Dropdown Menu */}
      {predefinedValues.length > 0 && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {predefinedValues.map((item, index) => (
            <MenuItem key={index} onClick={() => handleSelectValue(item)}>
              {item}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default TextFieldWithMultiSelect;
