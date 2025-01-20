import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPackageDetail } from '../../api/packageDetailService';
import { fetchUpcomingTrips } from '../../api/upcomingTripsService';
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
          {/* Costing Section */}
          <div className="costing-section">
            <h3 className="title-with-underline">Costing (Per Person)</h3>
            <ul>
              <li>
                Quad Sharing: ₹
                <b>{packageDetail.costings.quad_sharing_cost.toFixed(2)}</b>
              </li>
              <li>
                Triple Sharing: ₹
                <b>{packageDetail.costings.triple_sharing_cost.toFixed(2)}</b>
              </li>
              <li>
                Double Sharing: ₹
                <b>{packageDetail.costings.double_sharing_cost.toFixed(2)}</b>
              </li>
            </ul>
          </div>

          {/* Upcoming Trips Section */}
          <div className="upcoming-trips-section">
            <h3 className="title-with-underline">
              Upcoming Trips - Hurry Up Book Now
            </h3>
            <div className="upcoming-trips-list">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="upcoming-trip">
                  <span>
                    {new Date(trip.start_date).toLocaleDateString()} -{' '}
                    {new Date(trip.end_date).toLocaleDateString()}
                  </span>
                  <a
                    href={`/booking/single?trip_id=${trip.id}`}
                    className="book-now-button"
                  >
                    Book Now
                  </a>
                </div>
              ))}
            </div>
          </div>
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
