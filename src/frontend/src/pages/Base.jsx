import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar/Navbar';
import PartsList from '../components/PartsTable/PartsList';

import "../styles/global.css"

const Base = () => {

  return (
    <>
      <div className="navbar-container"> 
        <Navbar /> 
      </div>
      <div className="content-container">
          <PartsList />
      </div >
      <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </>
  );
};

export default Base;
