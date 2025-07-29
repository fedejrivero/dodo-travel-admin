import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

const NavBar = () => (
  <nav className="navbar">
    <Link to="/" className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
    </Link>
    <div className="nav-links">
      <Link to="/nosotros" className="nav-link"> Nosotros </Link>
      <Link to="/contacto" className="nav-link"> Contacto </Link>
      <Link to="/paquetes" className="nav-link"> Paquetes </Link>
      <Link to="/requisitos" className="nav-link"> Requisitos </Link>
    </div>
  </nav>
);

export default NavBar;
