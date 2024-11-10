import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';

const getTablePage = () => {
  const [tables, setTables] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const [searchParams] = useSearchParams();

  const tablename = searchParams.get('tablename');
  const searchText = searchParams.get('search') || '';

  const fetchTableContent = useCallback((tablename, page = 1, search = '') => {
    if (!tablename) return;

    setLoading(true);

    const query = `/parts-api/tables?tablename=${encodeURIComponent(tablename)}&page=${page}`;
    const finalUrl = search ? `${query}&textsearch=${encodeURIComponent(search)}` : query;

    api
      .get(finalUrl)
      .then((res) => res.data)
      .then((data) => {
        if (page === 1) {
          setTables(data.data);
        } else {
          setTables((prevTables) => [...prevTables, ...data.data]);
        }
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        alert(`Error fetching table content: ${err}`);
        setLoading(false);
      });
  }, []);

  const observeLastRow = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  // Fetch data when the table name or search text changes
  useEffect(() => {
    if (tablename) {
      setPage(1);
      fetchTableContent(tablename, 1, searchText);
    }
  }, [tablename, searchText, fetchTableContent]);

  // Load more data when the page changes
  useEffect(() => {
    if (page > 1 && tablename) {
      fetchTableContent(tablename, page, searchText);
    }
  }, [page, tablename, searchText, fetchTableContent]);

  return { tables, loading, observeLastRow };
};

export default getTablePage;
