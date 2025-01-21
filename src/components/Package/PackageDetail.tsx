import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPackageDetail } from '../../api/packageDetailService';
import { fetchUpcomingTrips } from '../../api/upcomingTripsService';
import CostingComponent from './CostingComponent';
import UpcomingTripsComponent from './UpcomingTripsComponent';
import type { PackageDetail } from '../../types/PackageDetailTypes';
import type { UpcomingTrip } from '../../types/UpcomingTripTypes';
import './styles/PackageDetail.css';

const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [packageDetail, setPackageDetail] = useState<PackageDetail | null>(
    null,
  );
  const [upcomingTrips, setUpcomingTrips] = useState<UpcomingTrip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const data = await fetchPackageDetail(slug);
          setPackageDetail(data);

          // Fetch upcoming trips using the package ID
          if (data.id) {
            const trips = await fetchUpcomingTrips(data.id);
            setUpcomingTrips(trips);
          }
        }
      } catch (error) {
        console.error(
          'Error fetching package details or upcoming trips:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!packageDetail) {
    return <div>Package not found.</div>;
  }

  return (
    <div className="package-detail-container">
      {/* Banner Section */}
      <div className="package-banner">
        <img
          src={packageDetail.image}
          alt={packageDetail.name}
          className="package-banner-image"
        />
      </div>

      {/* Package Title Section */}
      <div className="package-title">
        <h1>{packageDetail.name}</h1>
        <p>
          {packageDetail.days}D/{packageDetail.nights}N -{' '}
          {packageDetail.location}
        </p>
      </div>

      {/* Row for Itinerary, Costing, and Upcoming Trips */}
      <div className="package-detail-row">
        {/* Itinerary Section */}
        <div className="itinerary-section">
          <h3 className="title-with-underline">Itinerary</h3>
          <div
            className="itinerary-content"
            dangerouslySetInnerHTML={{
              __html: packageDetail.itinerary,
            }}
          />
        </div>

        {/* Costing and Upcoming Trips Column */}
        <div className="costing-trips-column">
          <CostingComponent costings={packageDetail.costings} />
          <UpcomingTripsComponent trips={upcomingTrips} />
        </div>
      </div>

      {/* Inclusions and Exclusions Section */}
      <div className="inclusions-exclusions-row">
        {/* Inclusions */}
        <div className="package-section inclusion-section">
          <h3 className="title-with-underline">Inclusions</h3>
          <div
            className="inclusion-content"
            dangerouslySetInnerHTML={{ __html: packageDetail.inclusion }}
          />
        </div>

        {/* Exclusions */}
        <div className="package-section exclusion-section">
          <h3 className="title-with-underline">Exclusions</h3>
          <div
            className="exclusion-content"
            dangerouslySetInnerHTML={{ __html: packageDetail.exclusion }}
          />
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
