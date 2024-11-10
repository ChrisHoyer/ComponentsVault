import React from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Material UI
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const NavBarSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const  searchtextFromURL= searchParams.get("search");
  const [searchText, setSearchText] = useState(searchtextFromURL || '');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchSubmit();
    }
    if (searchText.length === 1 && event.key === 'Backspace') {
      handleSearchSubmit();
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    const newParams = new URLSearchParams(searchParams);

    if (searchText.trim()) {
      newParams.set('search', searchText);
    } else {
        newParams.delete('search');
    }

    navigate({
      pathname: window.location.pathname,
      search: newParams.toString(), 
    });
  };

  const handleClearSearch = () => {
    setSearchText('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search'); 

    navigate({
      pathname: window.location.pathname,
      search: newParams.toString(),
    });
  };

  return (
    <div className="search">
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        fullWidth
        color="primary"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearchSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: searchText && (
            <InputAdornment position="end">
              <IconButton onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default NavBarSearch;
