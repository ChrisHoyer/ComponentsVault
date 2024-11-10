import React, { useState, useRef } from 'react';
import { TextField, IconButton, InputAdornment, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TextFieldWithDropdown = ({
  label,
  name,
  value,
  onChange,
  predefinedValues = [],
  required = false,
  fullWidth = true,
  margin = 'dense',
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  // Open the dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle selecting a predefined comment
  const handleSelectValue = (text) => {
    onChange({ target: { name, value: text } });
    handleMenuClose();
  };

  return (
    <>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        fullWidth={fullWidth}
        margin={margin}
        inputRef={inputRef}
        InputProps={{
          endAdornment: (
            predefinedValues.length > 0 && (
              <InputAdornment position="end">
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              </InputAdornment>
            )
          ),
        }}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {predefinedValues.map((item, index) => (
          <MenuItem key={index} onClick={() => handleSelectValue(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TextFieldWithDropdown;
