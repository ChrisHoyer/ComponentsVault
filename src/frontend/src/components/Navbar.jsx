import { useState, useEffect } from "react";
import api from "../api";
import "../styles/global.css"
import "../styles/Navbar.css"

// Google Materials Icons
import Search from '@mui/icons-material/Search';


const Navbar = ({ onSelectItem, onSearchSubmit}) => {

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [searchText, setSearchText] = useState("");
    
    useEffect(() => { getTables() }, []);
 
    const getTables = async () => {
      try {
          const res = await api.get("/parts/tablelist");
          setDropdownOptions(res.data);
      } catch (err) {
          alert(err);
      }
    };

    const handleSelectionChange = (event) => {
        setSearchText("");
        const selectedValue = event.target.value;
        onSelectItem(selectedValue);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          event.preventDefault();
          handleSearchSubmit();
      }
      if (searchText.length === 1 && event.key === 'Backspace') {
          handleSearchSubmit();
      }
    };
    // Store temporary the search text as soon as it is changed before submit
    const handleSearchChange = (event) => { setSearchText(event.target.value); };
    const handleSearchSubmit = (event) => { onSearchSubmit(searchText); };

  return (
    <nav className="navbar">
      <div className="navbar-center">
      <div className="search-bar">
          <input
              type="text"
              className="search-bar-input"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
          />
          <Search className="search-bar-button" 
                  onClick={(e) => { e.stopPropagation(); handleSearchSubmit(); }} 
          />
      </div>
        <select className="dropdown-menu" onChange={handleSelectionChange}>
          {dropdownOptions.length > 0 ? (
            dropdownOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </div>
      <div className="navbar-right">
        <img
          src="https://via.placeholder.com/50"
          alt="User"
          className="user-image"
        />
      </div>
    </nav>
  );
};
    
export default Navbar;