import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar/Navbar';
import ComponentList from '../components/ComponentList';

import "../styles/global.css"

const Base = () => {

  return (
    <>
      <div className="navbar-container"> 
        <Navbar /> 
      </div>
      <div className="content-container">
          <ComponentList />
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
