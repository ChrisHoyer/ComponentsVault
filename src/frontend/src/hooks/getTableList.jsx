import { useState, useEffect } from 'react';
import api from '../api';

const getTableList = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTableList = async () => {
    try {
      const res = await api.get('/parts-api/tables/list');
      setDropdownOptions(res.data);
    } catch (err) {
      alert(`Error fetching table list: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableList();
  }, []);

  return { dropdownOptions, loading };
};

export default getTableList;
