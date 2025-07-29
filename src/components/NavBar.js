import { Link } from 'react-router-dom';
import logo from '../logo.png';

const NavBar = () => (
  <nav className="navbar">
    <Link to="/" className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
    </Link>
    <div className="nav-links">
      <Link to="/a" className="nav-link">A</Link>
      <Link to="/b" className="nav-link">B</Link>
      <Link to="/c" className="nav-link">C</Link>
    </div>
  </nav>
);

export default NavBar;
