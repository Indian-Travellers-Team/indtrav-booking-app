import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar as BootstrapNavbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchPackages } from '../api/packageService'; // Ensure this imports the API service
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [summerPackages, setSummerPackages] = useState<any[]>([]);
  const [winterPackages, setWinterPackages] = useState<any[]>([]);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data.all_packages);
        setSummerPackages(data.summer_packages);
        setWinterPackages(data.winter_packages);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    getPackages();
  }, []);

  return (
    <BootstrapNavbar expand="lg" className="navbar-custom fixed-top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src="https://indiantraveller-cms-staticfiles.s3.amazonaws.com/tourism/img/logo.9325bd60d9bf.png"
            alt="Logo"
            height="30"
          />
          Indian Travellers Team
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto"> {/* Aligns the nav items to the right */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
            <Nav.Link as={Link} to="/blogs/">Articles</Nav.Link>

            <NavDropdown title="Packages" id="packagesDropdown">
              {packages.map(pkg => (
                <NavDropdown.Item key={pkg.id} as={Link} to={`/packages/${pkg.slug}`}>
                  {pkg.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="Summer Trips" id="summerTripsDropdown">
              {summerPackages.map(pkg => (
                <NavDropdown.Item key={pkg.id} as={Link} to={`/packages/${pkg.slug}`}>
                  {pkg.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="Winter Trips" id="winterTripsDropdown">
              {winterPackages.map(pkg => (
                <NavDropdown.Item key={pkg.id} as={Link} to={`/packages/${pkg.slug}`}>
                  {pkg.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
