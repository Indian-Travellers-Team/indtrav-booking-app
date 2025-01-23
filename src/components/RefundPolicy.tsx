import React from 'react';
import '../styles/RefundPolicy.css';

const RefundPolicy: React.FC = () => {
  return (
    <div className="refund-policy-container">
      <h2 className="refund-policy-title">Cancellation and Refund Policy</h2>

      <h3 className="case-title">
        Case 1: Cancellation by Indian Travellers Team
      </h3>
      <p>
        In case the Weekend Getaway is canceled by Indian Travellers Team due to
        unavoidable circumstances like Bharat bandh, roadblocks, natural
        calamities, landslides, etc., we will provide a Gateway Coupon. You can
        opt for the same or a different getaway destination for a period of one
        year. If you choose a new getaway destination, the amount previously
        paid will be adjusted. If the new getaway destination cost is greater
        than the canceled destination cost, you'll need to pay the difference.
        If it's less, the remaining amount will be refunded.
      </p>

      <h3 className="case-title">Case 2: Cancellation by the Customer</h3>
      <ul className="refund-list">
        <li>
          If canceled prior to 30 days of the booking date - 90% of the amount
          will be refunded.
        </li>
        <li>
          If canceled between 7-10 days of the booking date - 50% of the amount
          will be refunded.
        </li>
        <li>
          If canceled between 1-6 days of the booking date - No amount will be
          refunded.
        </li>
      </ul>

      <h3 className="case-title">Note: In Case of Seat Transfer to a Friend</h3>
      <ul className="refund-list">
        <li>
          You can transfer your seat to a friend, but they must fulfill all
          formalities on the day of the event.
        </li>
        <li>
          Replacement would not be applicable to any public transport booked for
          the original participant. In such a case, new members have to make
          their booking again.
        </li>
      </ul>

      <p>
        Refunds are initiated and will reach your account between 1-14 working
        days of cancellation.
      </p>
    </div>
  );
};

export default RefundPolicy;
