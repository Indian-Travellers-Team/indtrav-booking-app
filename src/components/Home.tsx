import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import { fetchHomeData } from '../api/homeService';
import { HomeResponse, Section, Package } from '../types/packageTypes';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Home: React.FC = () => {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null); // State to store home data
  const navigate = useNavigate(); // Initialize navigate hook for redirection

  useEffect(() => {
    // Fetch home data when the component is mounted
    const fetchData = async () => {
      try {
        const data = await fetchHomeData(); // API call to get home page data
        setHomeData(data); // Store the data in state
      } catch (error) {
        console.error('Error fetching home data:', error); // Log error in case of failure
      }
    };
    fetchData();
  }, []);

  if (!homeData) {
    // Show loading spinner or message while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* Banner Carousel */}
      <section id="bannerIndicators" className="mb-5">
        <Carousel>
          {homeData.banner_list.map((banner, index) => (
            <Carousel.Item key={index}>
              {/* If the banner has a direct link, wrap the image with an anchor tag */}
              {banner.direct_to ? (
                <a
                  href={banner.direct_to}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="d-block w-100"
                    src={`http://localhost:8000${banner.image_url}`}
                    alt={`Slide ${index + 1}`}
                    style={{ borderRadius: '5%' }}
                  />
                </a>
              ) : (
                <img
                  className="d-block w-100"
                  src={`http://localhost:8000${banner.image_url}`}
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
          {/* Section Title */}
          <h2 className="mb-3 section-title">{section.title}</h2>
          <Row>
            {/* Iterate through packages in each section */}
            {section.packages.map((pkg: Package) => (
              <Col key={pkg.id} md={3} sm={6} xs={12} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000${pkg.image}`} // Package image
                  />
                  <Card.Body>
                    <Card.Title>{pkg.name}</Card.Title> {/* Package name */}
                    <Card.Text>
                      {pkg.location} - {pkg.days}D/{pkg.nights}N{' '}
                      {/* Location and duration */}
                    </Card.Text>
                    <Card.Text>
                      <strong>
                        {pkg.starting_price
                          ? `₹${pkg.starting_price.toFixed(2)}` // Show starting price if available
                          : 'Contact for Pricing'}
                      </strong>
                    </Card.Text>
                    {/* Redirect to package detail page when the Explore button is clicked */}
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/packages/${pkg.slug}/`)}
                    >
                      Explore
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* Client Testimonials Section */}
      <section className="client-testimonials mt-4">
        <h3 className="text-center mb-4 title-with-underline">
          What Clients Say About Us?
        </h3>
        <Carousel>
          {homeData.testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <div className="review-card text-center">
                {/* Display client comments */}
                <p
                  dangerouslySetInnerHTML={{ __html: testimonial.comment }}
                ></p>
                <h5>- {testimonial.client_name}</h5> {/* Client name */}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </Container>
  );
};

export default Home;
