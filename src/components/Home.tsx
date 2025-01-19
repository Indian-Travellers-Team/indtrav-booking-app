import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import { fetchHomeData } from '../api/homeService';
import { HomeResponse, Section, Package } from '../types/packageTypes';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);

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

  if (!homeData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {homeData.sections.map((section: Section, index: number) => (
        <div key={index} className="mb-5">
          <h2 className="mb-3 section-title">{section.title}</h2>
          <Row>
            {section.packages.map((pkg: Package) => (
              <Col key={pkg.id} md={3} sm={6} xs={12} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={pkg.image} />
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
                    <Button variant="primary">Explore</Button>
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
                <p
                  dangerouslySetInnerHTML={{ __html: testimonial.comment }}
                ></p>
                <h5>- {testimonial.client_name}</h5>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </Container>
  );
};

export default Home;
