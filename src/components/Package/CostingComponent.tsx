import React from 'react';
import type { PackageDetail } from '../../types/packageDetailTypes';
import './styles/CostingComponent.css';

const CostingComponent: React.FC<{ costings: PackageDetail['costings'] }> = ({
  costings,
}) => {
  return (
    <div className="costing-section">
      <h3 className="title-with-underline">Costing (Per Person)</h3>
      <ul>
        <li>
          Quad Sharing: ₹<b>{costings.quad_sharing_cost.toFixed(2)}</b>
        </li>
        <li>
          Triple Sharing: ₹<b>{costings.triple_sharing_cost.toFixed(2)}</b>
        </li>
        <li>
          Double Sharing: ₹<b>{costings.double_sharing_cost.toFixed(2)}</b>
        </li>
      </ul>
    </div>
  );
};

export default CostingComponent;
