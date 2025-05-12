import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFeaturedPackages } from '../../api/packageTypeService';
import type { Package } from '../../types/packageTypes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FeaturedPackages from './FeaturedPackages';
import CallbackModal from '../CallbackModal'; // Import the CallbackModal component
import './styles/PackageList.css';

const PackageList: React.FC = () => {
  const { typeSlug } = useParams<{ typeSlug: string }>();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    id: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeaturedPackages(typeSlug);
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [typeSlug]);

  const handleOpenModal = (pkg: Package) => {
    setSelectedPackage({ name: pkg.name, id: pkg.id });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="mountain-theme-wrapper">
        <div className="mountain-loading">
          <div className="mountain-shape"></div>
          <div className="loading-text">Loading your adventures...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mountain-theme-wrapper">
      {/* Mountain silhouette header overlay */}
      <div className="mountain-header-overlay">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          className="mountain-svg"
        >
          <path d="M0,0 L0,120 L1200,120 L1200,0 L1110,60 L1020,0 L930,60 L840,0 L750,60 L660,0 L570,60 L480,0 L390,60 L300,0 L210,60 L120,0 L30,60 L0,0 Z"></path>
        </svg>
      </div>

      <Container className="package-list-container">
        <Row>
          {/* Package List Section */}
          <Col lg={8} className="package-list-section">
            <div className="section-header">
              <h2 className="mountain-title">
                <span className="mountain-title-inner">
                  {typeSlug?.charAt(0).toUpperCase()}
                  {typeSlug?.slice(1)} Packages
                </span>
              </h2>
              <div className="mountain-divider">
                <div className="mountain-peak"></div>
              </div>
            </div>

            <Row>
              {packages.map((pkg) => (
                <Col md={6} key={pkg.id} className="mb-4">
                  <div className="mountain-package-card">
                    <div className="package-image-container">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="package-image"
                      />
                      <div className="mountain-overlay"></div>
                      <div className="package-location-badge">
                        <i className="location-icon">📍</i> {pkg.location}
                      </div>
                    </div>
                    <div className="package-details">
                      <h5 className="mountain-package-name">{pkg.name}</h5>
                      <div className="package-info">
                        <span className="package-duration">
                          <i className="duration-icon">🗓️</i> {pkg.days}D/
                          {pkg.nights}N
                        </span>
                        <p className="package-price">
                          {pkg.starting_price
                            ? `₹${pkg.starting_price.toLocaleString()}`
                            : 'Contact for pricing'}
                        </p>
                      </div>
                      <Button
                        variant="custom"
                        onClick={() => navigate(`/packages/${pkg.slug}`)}
                        className="mountain-explore-button"
                      >
                        Explore Package
                      </Button>
                      <div className="package-actions">
                        <Button
                          variant="primary"
                          href={`tel:+917531887472`}
                          className="mountain-call-button"
                        >
                          📞 Call Now
                        </Button>
                        <Button
                          variant="light"
                          className="mountain-callback-button"
                          onClick={() => handleOpenModal(pkg)}
                        >
                          📩 Request Callback
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Featured Packages Section */}
          <Col lg={4} className="featured-packages-section">
            <FeaturedPackages />
          </Col>
        </Row>

        {/* Callback Modal */}
        {selectedPackage && (
          <CallbackModal
            show={showModal}
            onHide={() => setShowModal(false)}
            packageName={selectedPackage.name}
            packageId={selectedPackage.id}
          />
        )}
      </Container>

      {/* Mountain-themed footer overlay */}
      <div className="mountain-footer-overlay">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          className="mountain-svg"
        >
          <path d="M0,0 L0,120 L1200,120 L1200,0 L1110,60 L1020,0 L930,60 L840,0 L750,60 L660,0 L570,60 L480,0 L390,60 L300,0 L210,60 L120,0 L30,60 L0,0 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default PackageList;
