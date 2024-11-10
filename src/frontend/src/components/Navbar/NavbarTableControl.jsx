import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Components
import getTableList from '../../hooks/getTableList';

const NavBarTableControl = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { dropdownOptions, loading } = getTableList();

  const tablenameFromURL = searchParams.get('tablename');
  const [selectedItem, setSelectedItem] = useState(tablenameFromURL || '');

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedItem(selectedValue);

    // Update URL parameters
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('tablename', selectedValue);
    navigate({
      pathname: window.location.pathname,
      search: newParams.toString(),
    });
  };

  return (
    <div className="tableselect">
      <FormControl fullWidth>
        <InputLabel>Table</InputLabel>
        <Select
          value={selectedItem}
          color="primary"
          onChange={handleSelectionChange}
          label="Select an option"
        >
          {!loading && dropdownOptions.length > 0 ? (
            dropdownOptions.map((option, index) => (
              <MenuItem key={index} value={option} className="dropdown-menu-item">
                {option}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled className="dropdown-menu-item">Loading...</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default NavBarTableControl;
