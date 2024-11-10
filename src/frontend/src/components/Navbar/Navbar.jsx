import React, { useState } from 'react';

import NavBarTableControl from './NavbarTableControl';
import NavBarSearch from './NavbarSearch';
import AddDialog from '../PartsAdd/PartsAdd';

// Material UI
import IconButton from '@mui/material/IconButton';
import PostAddIcon from '@mui/icons-material/PostAdd';

//  Styles
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <NavBarSearch />
        <NavBarTableControl />
        <div className="add">
          <IconButton
              size="large"
              className="post-add-button"
              title="Add New" 
              onClick={handleOpenDialog}
              color="primary"
            >
              <PostAddIcon fontSize='inherit'/>
            </IconButton>
            <AddDialog open={isDialogOpen} onClose={handleCloseDialog} />
        </div>
      </div>
      <div className="navbar-right">
        <img
          src="https://placehold.co/60x60"
          alt="User"
          className="user-image"
        />
      </div>
    </nav>
  );
};

export default Navbar;
