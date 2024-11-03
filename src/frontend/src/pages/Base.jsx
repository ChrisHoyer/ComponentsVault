import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import ComponentList from '../components/ComponentList';
import "../styles/global.css"

const App = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div  className="navbar-container"> 
        <Navbar 
          onSelectItem={setSelectedItem}
          onSearchSubmit={setSearchText}
        /> 
      </div>
      <div  className="content-container">
          {selectedItem ? (
            <div className="component-list">
              <ComponentList
                selectedTable={selectedItem}
                searchText={searchText}
              />
            </div>
          ) : (
            <h2 className="placeholder-message">Select a table from the dropdown menu to view its content</h2>
          )}
      </div >
      <ToastContainer position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"></ToastContainer>
    </>
  );
};

export default App;
