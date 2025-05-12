import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import { fetchHomeData } from '../api/homeService';
import { HomeResponse, Section, Package } from '../types/packageTypes';
import CallbackModal from './CallbackModal';
import '../styles/Home.css'; // We'll keep using this but add our mountain styles
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackageName, setSelectedPackageName] = useState<string | null>(
    null,
  );
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null,
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHomeData();
        setHomeData(data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (packageName: string, selectedPackageId: number) => {
    setSelectedPackageName(packageName);
    setSelectedPackageId(selectedPackageId);
    setShowModal(true);
  };

  if (!homeData) {
    return (
      <div className="loading-container">
        <div className="mountain-loading">
          <div className="mountain-shape"></div>
          <div className="loading-text">
            Loading your mountain adventures...
          </div>
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

      <Container>
        {/* Enhanced Banner Carousel */}
        <section id="bannerIndicators" className="banner-carousel mb-5">
          <div className="carousel-mountain-overlay">
            <div className="mountain-peak-left"></div>
            <div className="mountain-peak-right"></div>
          </div>

          <Carousel indicators={true} className="mountain-carousel">
            {homeData.banner_list.map((banner, index) => (
              <Carousel.Item key={index}>
                {banner.direct_to ? (
                  <a
                    href={banner.direct_to}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="carousel-image-container">
                      <img
                        className="d-block w-100 banner-image"
                        src={`${banner.image_url}`}
                        alt={`Slide ${index + 1}`}
                      />
                      <div className="carousel-mountain-gradient"></div>
                    </div>
                  </a>
                ) : (
                  <div className="carousel-image-container">
                    <img
                      className="d-block w-100 banner-image"
                      src={`${banner.image_url}`}
                      alt={`Slide ${index + 1}`}
                    />
                    <div className="carousel-mountain-gradient"></div>
                  </div>
                )}
                <Carousel.Caption className="mountain-caption">
                  <h3>Discover Mountain Wonders</h3>
                  <p>
                    Experience the thrill of adventure with Indian Travellers
                    Team
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

        {/* Package Sections with Mountain Theme */}
        {homeData.sections.map((section: Section, index: number) => (
          <div key={index} className="package-section mb-5">
            <div className="section-header">
              <h2 className="section-title mountain-title">
                <span className="mountain-title-inner">{section.title}</span>
              </h2>
              <div className="mountain-divider">
                <div className="mountain-peak"></div>
              </div>
            </div>

            <Row className="mt-4">
              {section.packages.map((pkg: Package) => (
                <Col key={pkg.id} md={3} sm={6} xs={12} className="mb-4">
                  <Card className="mountain-card">
                    <div className="card-image-container">
                      <Card.Img
                        variant="top"
                        src={`${pkg.image}`}
                        className="card-img"
                      />
                      <div className="mountain-overlay"></div>
                      <div className="location-badge">{pkg.location}</div>
                    </div>
                    <Card.Body className="mountain-card-body">
                      <Card.Title className="mountain-card-title">
                        {pkg.name}
                      </Card.Title>
                      <div className="mountain-card-info">
                        <span className="duration-badge">
                          <i className="duration-icon">🗓️</i> {pkg.days}D/
                          {pkg.nights}N
                        </span>
                        <span className="price-badge">
                          {pkg.starting_price
                            ? `₹${pkg.starting_price.toFixed(2)}`
                            : 'Contact for Pricing'}
                        </span>
                      </div>

                      {/* Explore Button - Full Width */}
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/packages/${pkg.slug}/`)}
                        className="explore-button"
                      >
                        Explore
                      </Button>

                      {/* Call Now & Request Callback in one row */}
                      <Row className="mt-2 action-buttons">
                        <Col xs={5} className="pe-1">
                          <Button
                            variant="primary"
                            href={`tel:+917531887472`}
                            className="call-now-btn"
                          >
                            📞 Call Now
                          </Button>
                        </Col>
                        <Col xs={7} className="ps-1">
                          <Button
                            variant="custom"
                            className="callback-btn"
                            onClick={() => handleOpenModal(pkg.name, pkg.id)}
                          >
                            📩 Request Callback
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* View All Button */}
            <div className="text-center mt-4">
              <Button
                variant="secondary"
                onClick={() => navigate(`/packages/type/${section.forward_to}`)}
                className="view-all-button"
              >
                View All
              </Button>
            </div>
          </div>
        ))}

        {/* Enhanced Testimonial Section */}
        <section className="client-testimonials mountain-testimonials">
          <div className="testimonial-mountain-bg">
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 1200 300"
              className="testimonial-mountain-svg"
            >
              <path
                d="M0,300 L0,100 L200,200 L400,50 L600,150 L800,50 L1000,150 L1200,100 L1200,300 Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <div className="testimonial-content">
            <h3 className="testimonial-title">
              <span className="testimonial-title-text">
                What Clients Say About Us?
              </span>
            </h3>

            <div className="video-section">
              <div className="video-wrapper">
                <video
                  ref={videoRef}
                  width="100%"
                  height="auto"
                  controls
                  poster="https://indiantravellersteam.s3.ap-south-1.amazonaws.com/Screenshot+2025-02-07+at+2.14.10%E2%80%AFPM.png"
                  className="video-player"
                >
                  <source
                    src="https://indiantravellersteam.s3.ap-south-1.amazonaws.com/client-testimonial1.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>
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

      {/* Callback Modal */}
      <CallbackModal
        show={showModal}
        onHide={() => setShowModal(false)}
        packageName={selectedPackageName || ''}
        packageId={selectedPackageId || 0}
      />
    </div>
  );
};

export default Home;
