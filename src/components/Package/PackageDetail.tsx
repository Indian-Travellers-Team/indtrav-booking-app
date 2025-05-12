import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPackageDetail } from '../../api/packageDetailService';
import { fetchUpcomingTrips } from '../../api/upcomingTripsService';
import CostingComponent from './CostingComponent';
import UpcomingTripsComponent from './UpcomingTripsComponent';
import type { PackageDetail } from '../../types/packageDetailTypes';
import type { UpcomingTrip } from '../../types/upcomingTripTypes';
import { Container } from 'react-bootstrap';
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
    return (
      <div className="mountain-theme-wrapper">
        <div className="mountain-loading">
          <div className="mountain-shape"></div>
          <div className="loading-text">Loading your adventure...</div>
        </div>
      </div>
    );
  }

  if (!packageDetail) {
    return (
      <div className="mountain-theme-wrapper">
        <div className="not-found-message">
          Package not found. Try exploring another trail.
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

      <Container className="package-detail-container">
        {/* Banner Section */}
        <div className="package-banner">
          <div className="mountain-banner-container">
            <img
              src={packageDetail.image}
              alt={packageDetail.name}
              className="package-banner-image"
            />
            <div className="mountain-overlay"></div>
            <div className="banner-info">
              <span className="package-days-badge">
                {packageDetail.days}D/{packageDetail.nights}N
              </span>
            </div>
          </div>
        </div>

        {/* Package Title Section */}
        <div className="package-title">
          <div className="section-header">
            <h1 className="mountain-title">
              <span className="mountain-title-inner">{packageDetail.name}</span>
            </h1>
            <div className="mountain-divider">
              <div className="mountain-peak"></div>
            </div>
          </div>
          <p className="package-subtitle">
            <span className="location-badge">
              <i className="location-icon">📍</i> {packageDetail.location}
            </span>
          </p>
        </div>

        {/* Row for Itinerary, Costing, and Upcoming Trips */}
        <div className="package-detail-row">
          {/* Itinerary Section */}
          <div className="itinerary-section mountain-card">
            <div className="section-header">
              <h3 className="mountain-section-title">
                <span className="mountain-title-inner">Itinerary</span>
              </h3>
              <div className="mountain-divider small-divider">
                <div className="mountain-peak"></div>
              </div>
            </div>
            <div
              className="itinerary-content"
              dangerouslySetInnerHTML={{
                __html: packageDetail.itinerary,
              }}
            />
          </div>

          {/* Costing and Upcoming Trips Column */}
          <div className="costing-trips-column">
            <div className="package-side-card">
              <CostingComponent costings={packageDetail.costings} />
            </div>
            <div className="package-side-card">
              <UpcomingTripsComponent trips={upcomingTrips} />
            </div>
          </div>
        </div>

        {/* Inclusions and Exclusions Section */}
        <div className="inclusions-exclusions-row">
          {/* Inclusions */}
          <div className="package-section inclusion-section mountain-card">
            <div className="section-header">
              <h3 className="mountain-section-title">
                <span className="mountain-title-inner">Inclusions</span>
              </h3>
              <div className="mountain-divider small-divider">
                <div className="mountain-peak"></div>
              </div>
            </div>
            <div
              className="inclusion-content"
              dangerouslySetInnerHTML={{ __html: packageDetail.inclusion }}
            />
          </div>

          {/* Exclusions */}
          <div className="package-section exclusion-section mountain-card">
            <div className="section-header">
              <h3 className="mountain-section-title">
                <span className="mountain-title-inner">Exclusions</span>
              </h3>
              <div className="mountain-divider small-divider">
                <div className="mountain-peak"></div>
              </div>
            </div>
            <div
              className="exclusion-content"
              dangerouslySetInnerHTML={{ __html: packageDetail.exclusion }}
            />
          </div>
        </div>
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

export default PackageDetailPage;
