import React, { useEffect, useState } from 'react';
import { fetchFeaturedPackages } from '../../api/packageTypeService';
import type { PackageType } from '../../types/packageTypeTypes';
import { Button } from 'react-bootstrap';
import './styles/FeaturedPackages.css';

const FeaturedPackages: React.FC = () => {
  const [featuredPackages, setFeaturedPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeaturedPackages();
        setFeaturedPackages(data);
      } catch (error) {
        console.error('Error fetching featured packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading Featured Packages...</div>;
  }

  if (featuredPackages.length === 0) {
    return <p>No featured packages available at the moment.</p>;
  }

  return (
    <div className="featured-packages-section">
      <h4 className="title-with-underline">Featured Packages</h4>
      <div className="featured-packages">
        {featuredPackages.map((pkg) => (
          <div key={pkg.id} className="package">
            <img src={pkg.image} alt={pkg.name} className="package-image" />
            <h5>{pkg.name}</h5>
            <p>
              🚌 {pkg.days}D/{pkg.nights}N - 📍 {pkg.location}
            </p>
            <p>
              {pkg.starting_price
                ? `Starting from ₹${pkg.starting_price.toFixed(2)}`
                : 'Contact for Pricing'}
            </p>
            <Button href={`/packages/${pkg.slug}`} variant="primary">
              Check Now 🚀
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPackages;
