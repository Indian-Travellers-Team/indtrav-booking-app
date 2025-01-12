import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
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
              <Col key={pkg.id} md={4} className="mb-4">
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
    </Container>
  );
};

export default Home;
