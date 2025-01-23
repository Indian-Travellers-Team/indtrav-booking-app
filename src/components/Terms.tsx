import React from 'react';
import '../styles/Terms.css';

const Terms: React.FC = () => {
  return (
    <div className="terms-container">
      <h2 className="terms-title">Terms and Conditions</h2>
      <ul className="terms-list">
        <li>All bookings are strictly subject to confirmation of payments.</li>
        <li>No boarding without a valid govt approved ID.</li>
        <li>
          We do not have any insurance policy covering the expenses for
          accident, sickness, loss due to theft, or any other reason. Guests are
          advised to seek such insurance in advance.
        </li>
        <li>
          Management shall not be responsible for any missing items during the
          trip.
        </li>
        <li>We request not to travel with heavy luggage.</li>
        <li>
          Factors such as weather, road conditions, physical abilities of the
          participants, etc., may dictate itinerary changes. We reserve the
          right to change any schedule in the interest of safety, comfort, and
          general well-being.
        </li>
        <li>We do not allow smoking on the bus during travel.</li>
        <li>
          Indian Travellers Team reserves the right to discontinue your trip at
          any point on the grounds of misconduct, and no refund shall be made
          under such circumstances.
        </li>
        <li>
          Departure time is fixed as given, and it’s on you to update your
          status to the trip coordinator. The trip coordinator will also try to
          contact you at least two times, but the Indian Travellers Team is not
          responsible for the phone not getting connected.
        </li>
        <li>
          The person making the reservation is responsible for any damage caused
          to room/camp/resort furnishing and is liable to pay for the same.
        </li>
        <li>
          Please note that after the finalization of tour/service cost, if there
          are any hikes in entrance fees of monuments/museums, taxes, fuel
          costs, or guide charges by the Govt of India, the same would be
          charged as extra.
        </li>
        <li>
          In the hilly terrain, it will be the discretion of the driver to put
          off the systems of the vehicle, like the air conditioner and sound
          system. The focus will always be on safety.
        </li>
        <li>
          In case of any injuries/illness during the trip/activity, Indian
          Travellers Team, as a tour operator or any of our local staff, will
          not be responsible.
        </li>
        <li>
          It is understood that any expenses (e.g., hotel, meals, transport,
          telephone calls, repairing of vehicle, etc.) relating to unscheduled
          extensions like natural calamity, vehicle breakdown, or other delays
          beyond our control will be borne by the passengers, and no refund will
          be given in any scenario.
        </li>
        <li>
          We reserve the right to cancel any particular person not following the
          instructions of our guide during any activity.
        </li>
      </ul>
    </div>
  );
};

export default Terms;
