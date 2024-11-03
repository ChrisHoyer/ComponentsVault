import React, { useEffect, useRef, useCallback, useState } from 'react';
import Row from './ComponentRow';
import api from '../api';
import '../styles/Components.css';

const ComponentList = ({ selectedTable, searchText }) => {
  const [tables, setTables] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const getTableContent = useCallback((tablename, page = 1, search = '') => {
    if (!tablename) return;

    setLoading(true);
 
    const query = `/parts/table?tablename=${encodeURIComponent(tablename)}&page=${page}`;
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

  useEffect(() => {
    if (selectedTable) {
      setPage(1);
      getTableContent(selectedTable, 1, searchText);
    }
  }, [selectedTable, searchText, getTableContent]);

  const lastRowRef = useCallback(
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

  useEffect(() => {
    if (page > 1 && selectedTable) {
      getTableContent(selectedTable, page, searchText);
    }
  }, [page, selectedTable, searchText, getTableContent]);

  return (
    <div>
      {tables.length > 0 ? (
        tables.map((partData, index) => {
          if (index === tables.length - 1) {
            return <Row key={index} ref={lastRowRef} data={partData} />;
          } else {
            return <Row key={index} data={partData} />;
          }
        })
      ) : (
        <p>Loading or no data available.</p>
      )}
      {loading && <p>Loading more data...</p>}
    </div>
  );
};

export default ComponentList;
