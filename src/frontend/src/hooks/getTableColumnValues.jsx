import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';

const getTableColumnValues = () => {
  const [searchParams] = useSearchParams();
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const tablename = searchParams.get('tablename');

  const fetchTableColumns = useCallback(async (columnname) => {
    if (!tablename) {
      setError('No table name provided');
      return;
    }

    setLoading(true);
    const query = `/parts-api/tables/column?tablename=${encodeURIComponent(tablename)}&column=${encodeURIComponent(columnname)}`;

    try {
      const res = await api.get(query);
      setColumns(res.data); 
    } catch (err) {
      setError(`Error fetching table columns: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [tablename]);


  return { columns, loading, error, fetchTableColumns }; 
};

export default getTableColumnValues;
