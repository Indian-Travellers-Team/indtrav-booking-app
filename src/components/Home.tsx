import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import { fetchHomeData } from '../api/homeService';
import { HomeResponse, Section, Package } from '../types/packageTypes';
import CallbackModal from './CallbackModal'; // Import the CallbackModal component
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import internal from 'stream';

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
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* Banner Carousel */}
      <section id="bannerIndicators" className="mb-5">
        <Carousel>
          {homeData.banner_list.map((banner, index) => (
            <Carousel.Item key={index}>
              {banner.direct_to ? (
                <a
                  href={banner.direct_to}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="d-block w-100"
                    src={`${banner.image_url}`}
                    alt={`Slide ${index + 1}`}
                    style={{ borderRadius: '5%' }}
                  />
                </a>
              ) : (
                <img
                  className="d-block w-100"
                  src={`${banner.image_url}`}
                  alt={`Slide ${index + 1}`}
                  style={{ borderRadius: '5%' }}
                />
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Package Sections */}
      {homeData.sections.map((section: Section, index: number) => (
        <div key={index} className="mb-5">
          <h2 className="mb-3 section-title title-with-underline">
            {section.title}
          </h2>
          <Row>
            {section.packages.map((pkg: Package) => (
              <Col key={pkg.id} md={3} sm={6} xs={12} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={`${pkg.image}`} />
                  <Card.Body>
                    <Card.Title>{pkg.name}</Card.Title>
                    <Card.Text>
                      {pkg.location} - {pkg.days}D/{pkg.nights}N
                    </Card.Text>
                    <Card.Text>
                      <strong>
                        {pkg.starting_price
                          ? `₹${pkg.starting_price.toFixed(2)}`
                          : 'Contact for Pricing'}
                      </strong>
                    </Card.Text>

                    {/* Explore Button - Full Width */}
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/packages/${pkg.slug}/`)}
                      className="check-this-button"
                    >
                      Explore
                    </Button>

                    {/* Call Now & Request Callback in one row (50% width each) */}
                    <Row className="mt-2">
                      <Col xs={5}>
                        <Button
                          variant="custom"
                          href={`tel:+917531887472`}
                          className="w-100 call-now-btn"
                        >
                          📞 Call Now
                        </Button>
                      </Col>
                      <Col xs={7}>
                        <Button
                          variant="custom"
                          className="w-100 callback-btn"
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
          <div className="text-center mt-3">
            <Button
              variant="secondary"
              onClick={() => navigate(`/packages/type/${section.forward_to}`)}
            >
              View All
            </Button>
          </div>
        </div>
      ))}

      {/* Inline Video Testimonial Section */}
      <section className="client-testimonials mt-4">
        <h3 className="text-center mb-4 title-with-underline section-title">
          What Clients Say About Us?
        </h3>
        <div className="video-section text-center">
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
      </section>

      {/* Callback Modal */}
      <CallbackModal
        show={showModal}
        onHide={() => setShowModal(false)}
        packageName={selectedPackageName || ''}
        packageId={selectedPackageId || 0}
      />
    </Container>
  );
};

export default Home;
