import React from 'react';
import type { PackageDetail } from '../../types/packageDetailTypes';
import './styles/CostingComponent.css';

const CostingComponent: React.FC<{ costings: PackageDetail['costings'] }> = ({
  costings,
}) => {
  // Find the best value option (lowest cost per person for best comfort)
  // Usually triple sharing offers the best value
  const bestValue = 'triple';

  return (
    <div className="costing-section">
      <h3>Costing (Per Person)</h3>
      <ul>
        <li>
          <span className="sharing-type">Quad Sharing</span>
          <b>₹{costings.quad_sharing_cost.toLocaleString()}</b>
        </li>
        <li className={bestValue === 'triple' ? 'best-value' : ''}>
          <span className="sharing-type">Triple Sharing</span>
          <b>₹{costings.triple_sharing_cost.toLocaleString()}</b>
        </li>
        <li>
          <span className="sharing-type">Double Sharing</span>
          <b>₹{costings.double_sharing_cost.toLocaleString()}</b>
        </li>
      </ul>
    </div>
  );
};

export default CostingComponent;
