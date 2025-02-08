import React, { useEffect, useState } from 'react';
import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  NavDropdown,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchPackages } from '../api/packageService';
import { PackageMin, PackageResponse } from '../types/packageTypes';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from '../AuthContext';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [packages, setPackages] = useState<PackageMin[]>([]);
  const [summerPackages, setSummerPackages] = useState<PackageMin[]>([]);
  const [winterPackages, setWinterPackages] = useState<PackageMin[]>([]);
  const [isExpanded, setIsExpanded] = useState(false); // Track navbar expansion

  const { user } = useAuth(); // Get user from Auth context

  useEffect(() => {
    const getPackages = async () => {
      try {
        const data: PackageResponse = await fetchPackages();
        setPackages(data.all_packages);
        setSummerPackages(data.summer_packages);
        setWinterPackages(data.winter_packages);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    };

    getPackages();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close navbar on link click (for mobile view)
  const handleNavItemClick = () => {
    setIsExpanded(false);
  };

  return (
    <BootstrapNavbar
      expand="lg"
      className="navbar-custom fixed-top"
      expanded={isExpanded}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" onClick={handleNavItemClick}>
          <img
            src="https://indiantraveller-cms-staticfiles.s3.amazonaws.com/tourism/img/logo.9325bd60d9bf.png"
            alt="Logo"
            height="30"
          />
          Indian Travellers Team
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleNavItemClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about-us" onClick={handleNavItemClick}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs/" onClick={handleNavItemClick}>
              Articles
            </Nav.Link>
            <NavDropdown title="Packages" id="packagesDropdown">
              {packages.map((pkg) => (
                <NavDropdown.Item
                  key={pkg.id}
                  as={Link}
                  to={`/packages/${pkg.slug}`}
                  onClick={handleNavItemClick}
                >
                  {pkg.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Summer Trips" id="summerTripsDropdown">
              {summerPackages.map((pkg) => (
                <NavDropdown.Item
                  key={pkg.id}
                  as={Link}
                  to={`/packages/${pkg.slug}`}
                  onClick={handleNavItemClick}
                >
                  {pkg.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Winter Trips" id="winterTripsDropdown">
              {winterPackages.map((pkg) => (
                <NavDropdown.Item
                  key={pkg.id}
                  as={Link}
                  to={`/packages/${pkg.slug}`}
                  onClick={handleNavItemClick}
                >
                  {pkg.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            {/* Logout button and user email display */}
            {user && (
              <div className="d-flex align-items-center">
                <span className="me-2 text-white">{user.email}</span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
