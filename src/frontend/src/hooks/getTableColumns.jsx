import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';

const useGetTableColumns = () => {
  const [searchParams] = useSearchParams();
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const tablename = searchParams.get('tablename');

  const fetchTableColumns = useCallback(async () => {
    if (!tablename) return;

    setLoading(true);
    const query = `/parts-api/tables/columns?tablename=${encodeURIComponent(tablename)}`;

    try {
      const res = await api.get(query);
      setColumns(res.data);
    } catch (err) {
      alert(`Error fetching table columns: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [tablename]);

  useEffect(() => {
    if (tablename) fetchTableColumns();
  }, [tablename, fetchTableColumns]);

  return { columns, loading, fetchTableColumns };
};

export default useGetTableColumns;
