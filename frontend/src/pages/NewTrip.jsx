import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./NewTrip.css";
import { FaPlus } from "react-icons/fa";

const places = [
  { name: "Jaipur", img: "/places/Jaipur/jaipur1.jpeg" },
  { name: "Goa", img: "/places/Goa/goa.jpeg" },
  { name: "Himachal Pradesh", img: "/places/HP/HP.jpeg" },
  { name: "Udaipur", img: "/places/Udaipur/udaipur1.jpeg" },
  { name: "Leh", img: "public/places/Leh/leh.jpg" },
  { name: "Kerala", img: "/places/Kerela/kerela.jpeg" },
  { name: "Rishikesh", img: "/places/Rishikesh/rishikesh.jpeg" },
  { name: "Mumbai", img: "/places/Mumbai/mumbai.jpeg" },
  { name: "Delhi", img: "/places/Delhi/delhi.jpeg" },
  { name: "Kashmir", img: "/places/Kashmir/kashmir.jpeg" },
  { name: "Agra", img: "/places/Agra/agra.jpeg" },
  { name: "Andaman", img: "/places/Andaman/andman.jpeg" },
];

function NewTrip() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    place: "",
    days: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form:");

    try {
      const res = await fetch("https://safar-za5m.onrender.com/submit-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Trip planned! Check your email 📩");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="newtrip-container">

      {/* 🔥 NAVBAR FIRST */}
      <Navbar />

      {/* 🔥 BUTTON */}
      <button
        className="open-form-btn"
        onClick={() => {
          console.log("Button clicked");
          setShowForm(!showForm);
        }}
      >
        <FaPlus /> Plan Your Own Trip
      </button>

      {/* 🔥 FORM */}
      {showForm && (
        <form className="trip-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
          <input type="text" name="place" placeholder="Destination" onChange={handleChange} required />
          <input type="number" name="days" placeholder="Days" onChange={handleChange} required />
          <input type="number" name="budget" placeholder="Budget" onChange={handleChange} required />

          <button type="submit">Plan Trip ✈️</button>
        </form>
      )}

      {/* TITLE */}
      <h2 className="section-title">
        Recommended Destinations in India
      </h2>

      {/* GRID */}
      <div className="trip-container">
        {places.map((place) => (
          <div
            key={place.name}
            className="card"
            onClick={() => navigate(`/destination/${place.name}`)}
          >
            <img src={place.img} alt={place.name} />
            <div className="overlay">
              <h3>{place.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* MAP */}
      <div className="map-section">
        <h2>Explore Destination Across India</h2>

        <div className="map-container">
          <iframe
            src="https://maps.google.com/maps?q=India&t=&z=5&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>
  );
}

export default NewTrip;