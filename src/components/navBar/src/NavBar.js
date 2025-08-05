import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import plumas from '../../../images/plumas.png';
import dodoTravel from '../../../images/dodoTravel.png';
import useIsMobile from '../../../hooks/useIsMobile';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

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
      <Link to="/nosotros" className="nav-link" onClick={closeMenu}>
        Nosotros
      </Link>
      {/* Uncomment and add more links as needed */}
      {/*
      <Link to="/contacto" className="nav-link" onClick={closeMenu}>
        Contacto
      </Link>
      <Link to="/requisitos" className="nav-link" onClick={closeMenu}>
        Requisitos
      </Link> */}
    </div>
  );

  return (
    <nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`} 
      style={{ backgroundImage: `url(${plumas})`}}
    >
      <div className="navbar-header">
        <Link to="/" className="logo-container" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo" />
          <img src={dodoTravel} alt="Dodo Travel" className="dodo-travel" />
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
