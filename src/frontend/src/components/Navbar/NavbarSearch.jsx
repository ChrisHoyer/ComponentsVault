import React from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// icons
import SearchIcon from '@mui/icons-material/Search';

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
    newParams.set('search', searchText);

    navigate({
      pathname: window.location.pathname,
      search: newParams.toString(), 
    });
  };

  return (
    <div className="search-bar">
      <input 
        type="text"
        className="search-bar-input"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon
        className="search-bar-button"
        onClick={(e) => {
          e.stopPropagation();
          handleSearchSubmit();
        }}
      />
    </div>
  );
};

export default NavBarSearch;
