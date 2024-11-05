import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// internal functions
import api from '../../api';

// icons
import PostAddIcon from '@mui/icons-material/PostAdd';


const NavBarTableControl = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [dropdownOptions, setDropdownOptions] = useState([]);
  const tablenameFromURL = searchParams.get("tablename");
  const [selectedItem, setSelectedItem] = useState(tablenameFromURL || '');

  useEffect(() => { getTables(); }, []);

  const getTables = async () => {
    try {
      const res = await api.get('/parts/tablelist');
      setDropdownOptions(res.data);
    } catch (err) {
      alert(`Error fetching table list: ${err}`);
    }
};

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedItem(selectedValue);
    navigate(`/table?tablename=${encodeURIComponent(selectedValue)}`);
  };

  return (
    <div className="table-control-container">
      <select className="dropdown-menu" value={selectedItem} onChange={handleSelectionChange}>
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
      <button className="post-add-button" title="Add New">
        <PostAddIcon />
      </button>
    </div>
  );
};

export default NavBarTableControl;
