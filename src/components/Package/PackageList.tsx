import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFeaturedPackages } from '../../api/packageTypeService';
import type { Package } from '../../types/packageTypes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FeaturedPackages from './FeaturedPackages';
import './styles/PackageList.css';

const PackageList: React.FC = () => {
  const { typeSlug } = useParams<{ typeSlug: string }>();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="package-list-container">
      <Row>
        {/* Package List Section */}
        <Col lg={8} className="package-list-section">
          <h2 className="title-with-underline">
            {typeSlug?.charAt(0).toUpperCase()}
            {typeSlug?.slice(1)} Packages
          </h2>
          <Row>
            {packages.map((pkg) => (
              <Col md={6} key={pkg.id} className="mb-4">
                <div className="package-card">
                  <a href={`/packages/${pkg.slug}`}>
                    <div className="package-image-wrapper">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="package-image"
                      />
                    </div>
                  </a>
                  <div className="package-details">
                    <a href={`/packages/${pkg.slug}`}>
                      <h5 className="package-name">{pkg.name}</h5>
                      <p className="package-price">
                        {pkg.starting_price
                          ? `₹ ${pkg.starting_price.toLocaleString()}`
                          : 'Contact us for pricing'}
                      </p>
                    </a>
                    <div className="package-actions">
                      <Button
                        variant="primary"
                        href={`tel:+917531887472`}
                        className="call-button"
                      >
                        <i className="fa fa-phone"></i> Call Now
                      </Button>
                      <Button
                        variant="light"
                        className="callback-button"
                        data-toggle="modal"
                        data-target="#callbackModal"
                      >
                        <i className="fa fa-envelope"></i> Request Callback
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
    </Container>
  );
};

export default PackageList;
