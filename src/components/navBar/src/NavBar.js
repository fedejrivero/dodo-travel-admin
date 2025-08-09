import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import logo from '../../../images/logo.png';
import plumas from '../../../images/plumas.png';
import dodoTravelWhite from '../../../images/dodoTravelWhite.png';
import useIsMobile from '../../../hooks/useIsMobile';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking on a nav link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = () => (
    <div className={`nav-links ${isMobile ? 'active' : ''}`}>
      <Link to="/paquetes" className="nav-link" onClick={closeMenu}>
        Paquetes
      </Link>
      {user && (
        <button 
          className="logout-button" 
          onClick={handleLogout}
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      )}
    </div>
  );

  return (
    <nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`} 
      style={{ backgroundImage: `url(${plumas})`}}
    >
      <div className="navbar-header">
        <Link to="/" className="logo-container" onClick={closeMenu}>
          <img src={dodoTravelWhite} alt="Dodo Travel" className="dodo-travel" />
        </Link>
        
        {isMobile ? (
          <button 
            className="menu-button" 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        ) : (
          navLinks()
        ) 
        }
      </div>
      
      {isMobile && isMenuOpen && navLinks()}
    </nav>
  );
};

export default NavBar;
