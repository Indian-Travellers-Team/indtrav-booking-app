// Navbar.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  NavDropdown,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPackages } from '../api/packageService';
import { PackageMin, PackageResponse } from '../types/packageTypes';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from '../AuthContext';
import '../styles/Navbar.css';

// Icons from lucide-react
import {
  User,
  ChevronDown,
  LogOut,
  Heart,
  Calendar,
  Bell,
  Settings,
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [packages, setPackages] = useState<PackageMin[]>([]);
  const [summerPackages, setSummerPackages] = useState<PackageMin[]>([]);
  const [winterPackages, setWinterPackages] = useState<PackageMin[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleUserMenu = () => setUserMenuOpen((open) => !open);
  const handleNavItemClick = () => setIsExpanded(false);

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
            <Nav.Link as={Link} to="/blogs" onClick={handleNavItemClick}>
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

            {user && (
              <div className="relative" ref={menuRef}>
                <button
                  className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white"
                  onClick={toggleUserMenu}
                >
                  <span className="hidden sm:inline truncate">
                    {user.email}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white text-gray-800 z-10">
                    <div className="py-1">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium">Signed in as</p>
                        <p className="text-sm font-bold truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 hover:bg-indigo-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/bookings"
                        className="flex items-center px-4 py-2 hover:bg-indigo-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>My Bookings</span>
                      </Link>

                      <Link
                        to="/wishlist"
                        className="flex items-center px-4 py-2 hover:bg-indigo-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Wishlist</span>
                      </Link>

                      <Link
                        to="/notifications"
                        className="flex items-center px-4 py-2 hover:bg-indigo-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                      </Link>

                      <Link
                        to="/account-settings"
                        className="flex items-center px-4 py-2 hover:bg-indigo-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>

                      <div className="border-t border-gray-200 mt-1"></div>

                      <button
                        className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
