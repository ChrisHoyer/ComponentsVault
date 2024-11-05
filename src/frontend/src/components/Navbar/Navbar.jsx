
import NavBarTableControl from './NavbarTableControl';
import NavBarSearch from './NavbarSearch';

//  Styles
import '../../styles/Navbar.css';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <div className="navbar-center-top">
          <NavBarSearch />
          <NavBarTableControl />
        </div>
      </div>
      <div className="navbar-right">
        <img
          src="https://placehold.co/40x40"
          alt="User"
          className="user-image"
        />
      </div>
    </nav>
  );
};

export default Navbar;
