import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Navbar.css"

const Navbar = ({ onSelectItem }) => {

    const [dropdownOptions, setDropdownOptions] = useState([]);
    
    useEffect(() => { getTables() }, []);
 
    // Get Tablenames
    const getTables = () => {
        api
            .get("/parts/tablelist")
            .then((res) => res.data)
            .then((data) => setDropdownOptions(data))
            .catch((err) => alert(err));
    };

    const handleSelectionChange = (event) => {
        const selectedValue = event.target.value;
        onSelectItem(selectedValue);
      };

  return (
    <nav className="navbar">
      {/* Left side: Menu button */}
      <div className="navbar-left">
        <button className="menu-button">
          <i className="fas fa-bars"></i> {/* Replace with an icon */}
        </button>
      </div>

      {/* Center: Search bar and dropdown */}
      <div className="navbar-center">
        <input type="text" className="search-bar" placeholder="Search..." />
        <button className="search-button">
          <i className="fas fa-search"></i> {/* Replace with an icon */}
        </button>
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

      {/* Right side: User image */}
      <div className="navbar-right">
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="user-image"
        />
      </div>
    </nav>
  );
};
    
export default Navbar;