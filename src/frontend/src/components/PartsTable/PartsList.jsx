// src/components/ComponentList.jsx
import React from 'react';

// Components
import getTablePage from '../../hooks/getTablePage';
import PartsRow from './PartsRow';

// Style
import '../../styles/Components.css';

const PartsList = () => {
  const { tables, loading, observeLastRow } = getTablePage();

  return (
    <div className="component-list">
      {tables.length > 0 ? (
        tables.map((partData, index) => {
          if (index === tables.length - 1) {
            return <PartsRow key={index} ref={observeLastRow} data={partData} />;
          } else {
            return <PartsRow key={index} data={partData} />;
          }
        })
      ) : (
        <p>Loading or no data available.</p>
      )}
      {loading && <p>Loading more data...</p>}
    </div>
  );
};

export default PartsList;
