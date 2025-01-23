import React from 'react';
import '../styles/AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <h2 className="about-us-title">About Indian Travellers Team 🌍</h2>
      <img
        src="https://indiantraveller-cms-staticfiles.s3.amazonaws.com/tourism/img/indian-travellers-team-logo.27f95d45db0e.png"
        alt="Indian Travellers Team Logo"
        className="about-us-banner"
      />
      <p>
        Welcome to <strong>Indian Travellers Team</strong> 🎒, where we turn
        your dream destinations into real journeys! As an emerging travel agency
        in India, we specialize in crafting unforgettable experiences for
        adventurers, explorers, and those seeking a touch of the unknown.
      </p>
      <blockquote className="travel-quote">
        "The world is a book, and those who do not travel read only one page."
        <span> – Saint Augustine</span>
      </blockquote>
      <h3>Our Journey 🚀</h3>
      <p>
        Founded in 2018 by <strong> Bhartendu Mehta</strong>, Indian Travellers
        Team began as a small startup with a big vision – to make travel
        accessible, affordable, and absolutely mesmerizing. Today, we are proud
        to have grown into a trusted travel partner for thousands of travelers
        across India.
      </p>
      <h3>What We Do 🗺️</h3>
      <ul className="service-list">
        <li>✅ Personalized Tour Packages 🏖️</li>
        <li>✅ Adventure and Trekking Trips ⛰️</li>
        <li>✅ Cultural and Heritage Tours 🏰</li>
        <li>✅ Corporate and Group Travel 🧑‍💼</li>
        <li>✅ Customized Itineraries ✍️</li>
      </ul>
      <h3>Our Commitment 💖</h3>
      <p>
        At Indian Travellers Team, we believe in more than just arranging trips;
        we're about creating memories. Our team of dedicated travel experts
        ensures that every aspect of your journey is well-planned and executed,
        offering a seamless and stress-free experience.
      </p>
      <h3>Why Choose Us? 🤔</h3>
      <p>
        We're passionate about travel and even more passionate about making your
        travel dreams come true. With our deep-rooted knowledge, extensive
        network, and commitment to responsible tourism, we guarantee an
        enriching travel experience tailored just for you.
      </p>
      <h3>Contact Us 📞</h3>
      <p>
        <li>✉️ booking.indiantravellersteam@gmail.com</li>
        <li>☎️ +91 7531887472</li>
      </p>
    </div>
  );
};

export default AboutUs;
