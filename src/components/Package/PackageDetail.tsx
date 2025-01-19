import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPackageDetail } from '../../api/packageDetailService';
import type { PackageDetail } from '../../types/PackageDetailTypes';
import '../../components/Package/styles/PackageDetail.css';

const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [packageDetail, setPackageDetail] = useState<PackageDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const data = await fetchPackageDetail(slug);
          setPackageDetail(data);
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
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

      <div className="package-content">
        {/* Itinerary Section */}
        <div className="package-section">
          <h3>Itinerary</h3>
          <div dangerouslySetInnerHTML={{ __html: packageDetail.itinerary }} />
        </div>

        {/* Costing Section */}
        <div className="package-section">
          <h3>Costing (Per Person)</h3>
          <ul>
            <li>
              Quad Sharing: ₹
              {packageDetail.costings.quad_sharing_cost.toFixed(2)}
            </li>
            <li>
              Triple Sharing: ₹
              {packageDetail.costings.triple_sharing_cost.toFixed(2)}
            </li>
            <li>
              Double Sharing: ₹
              {packageDetail.costings.double_sharing_cost.toFixed(2)}
            </li>
          </ul>
        </div>

        {/* Inclusions and Exclusions */}
        <div className="package-section">
          <h3>Inclusions</h3>
          <div dangerouslySetInnerHTML={{ __html: packageDetail.inclusion }} />
          <h3>Exclusions</h3>
          <div dangerouslySetInnerHTML={{ __html: packageDetail.exclusion }} />
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
