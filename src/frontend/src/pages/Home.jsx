import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Row from '../components/ComponentRow';
import api from '../api';

const App = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [tables, setTables] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const getTableContent = useCallback((tablename, page = 1) => {
    if (!tablename) return;

    setLoading(true);
    api
      .get(`/parts/table?tablename=${encodeURIComponent(tablename)}&page=${page}`)
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
    if (selectedItem) {
      setPage(1);
      getTableContent(selectedItem, 1);
    }
  }, [selectedItem, getTableContent]);

  const lastRowRef = useCallback(
    (node) => {
      if (loading) return; // Prevent observer from firing if loading
      if (observer.current) observer.current.disconnect(); // Clean up previous observer

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          console.log('Loading next page:', page + 1);
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node); // Attach observer to last row
    },
    [loading, page, totalPages]
  );

  // Effect to load new page content when the page state changes
  useEffect(() => {
    if (page > 1 && selectedItem) {
      getTableContent(selectedItem, page);
    }
  }, [page, selectedItem, getTableContent]);

  return (
    <div>
      <Navbar onSelectItem={setSelectedItem} />
      <main>
        {selectedItem ? (
          <div>
            <h2>Content for: {selectedItem}</h2>
            <div>
              {tables.length > 0 ? (
                tables.map((partData, index) => {
                  // Attach the ref to the last item only
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
          </div>
        ) : (
          <h2>Select an item from the dropdown menu to view its content</h2>
        )}
      </main>
    </div>
  );
};

export default App;
