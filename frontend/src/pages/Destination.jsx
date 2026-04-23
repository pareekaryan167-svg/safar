import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./Destination.css";
import React,{ useState } from "react";




const data = {
  Jaipur: {
    description: "The Pink City known for forts and royal heritage.",
    days: "2-3 days",
    budget: "₹8,000 - ₹15,000", 
    images: [
      { src: "../public/places/Jaipur/Amber-Fort.webp", title: "Amber Fort" },
      { src: "../public/places/Jaipur/CityPalace.jpg", title: "City Palace" },
      { src: "../public/places/Jaipur/HawaMahal.jpg", title: "Hawa Mahal" },
      { src: "../public/places/Jaipur/jal-Mahal.avif", title: "Jal Mahal" },
      { src: "../public/places/Jaipur/NahargarhFort.jpg", title: "Nahargarh Fort" }
    ]
  },
  Goa: {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: [
      { src: "../public/places/Goa/Arambol-Beach.jpg", title: "Arambol Beach" },
      { src: "../public/places/Goa/Baga Beach.jpg", title: "Baga Beach" },
      { src: "../public/places/Goa/Chopara-Fort.jpg", title: "Choara Fort" },
      { src: "../public/places/Goa/Our Lady of the Immaculate Conception.jpg", title: "Our Lady of the Immaculate Conception" },
      { src: "../public/places/Goa/Vagator-Beach.jpg", title: "Vagator Beach" },
 ]
  },
  'Himachal Pradesh': {
    description: "Known for its scenic beauty and hill stations.",
    days: "4-6 days",
    budget: "₹12,000 - ₹25,000",
    images: [
      { src:"../public/places/HP/Hadimba Devi Temple.jpg", title: "Hadimba Devi Temple" },
      { src:"../public/places/HP/Khajjiar Valley.jpg", title: "Khajjiar Valley" },
      { src:"../public/places/HP/Manali.jpg", title: "Manali" },
      { src:"../public/places/HP/Shimla.jpg", title: "Shimla" },
      { src:"../public/places/HP/Viceregal.jpg", title: "Viceregal" },
 ]
  },
  'Udaipur': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: [
      { src:"../public/places/Udaipur/Ahar Museum.jpg", title: "Ahar Museum" },
      { src:"../public/places/Udaipur/fateh sagar lake.jpg", title: "Fateh Sagar Lake" },
      { src:"../public/places/Udaipur/City Palace.jpg", title: "City Palace" },
      { src:"../public/places/Udaipur/Pichola Lake.jpg", title: "Pichola Lake" },
      { src:"../public/places/Udaipur/eklinji temple.jpg", title: "Eklinji Temple" }
    ]
  },
  'Leh': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: [
      { src:"../public/places/Leh/leh.jpeg", title: "Leh" },
      { src:"../public/places/Leh/leh2.jpeg", title: "Leh 2" }
    ]
  },
  'Kerala': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: [
      { src:"../public/places/Kerala/kerala.jpeg", title: "Kerala" },
      { src:"../public/places/Kerala/kerala2.jpeg", title: "Kerala 2" }
    ]
  },
  'Rishikesh': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: [
      { src:"../public/places/Rishikesh/rishikesh.jpeg", title: "Rishikesh" },
      { src:"../public/places/Rishikesh/rishikesh2.jpeg", title: "Rishikesh 2" }
    ]
  },
  'Mumbai': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: [
      { src:"../public/places/Mumbai/mumbai.jpeg", title: "Mumbai" },
      { src:"../public/places/Mumbai/mumbai2.jpeg", title: "Mumbai 2" }
    ]
  },
  'Delhi': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: [
      { src:"../public/places/Delhi/delhi.jpeg", title: "Delhi" },
      { src:"../public/places/Delhi/delhi2.jpeg", title: "Delhi 2" }
    ]
  },
  'Kashmir': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: ["../public/places/Goa/goa.jpeg", "../public/places/Goa/goa2.jpeg"]
  },
  'Kerala': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: ["../public/places/Goa/goa.jpeg", "../public/places/Goa/goa2.jpeg"]
  },
  'Agra': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: [
      {"src": "../public/places/Goa/goa.jpeg", "title": "Goa"}, 
      {"src": "../public/places/Goa/Agra Fort.jpeg", "title": "Agra Fort"}
    ]

  },
  'Andaman': {
    description: "Famous for beaches, nightlife and relaxation.",
    days: "3-5 days",
    budget: "₹10,000 - ₹20,000",
    images: ["../public/places/Goa/goa.jpeg", "../public/places/Goa/goa2.jpeg"]
  }


};

function Destination() {
  const { name } = useParams();
  const [people, setPeople] = useState(1);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const place = data[name];
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  place: name,
  days: "",
  budget: ""
});
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=a617b01ce7d24b35932111358262903&q=${name}&aqi=no`
        );

        const weatherData = await res.json();
        setWeather(weatherData);
      } catch (err) {
        console.error("Weather error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [name]);

  if (!place) {
    return <h1 style={{color:"white"}}>Destination not found</h1>;
  }
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5005/submit-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    alert("Server error");
  }

  setLoading(false);
};

    //const data = await res.json();
    //alert(data.message);
  //} catch (error) {
    //console.error(error);
    //alert("Something went wrong");
  //}
//};

  return (
    <>
      <Navbar />

      <div className="destination-container">
        <h1>{name}</h1>

        {/* Images */}
        <div className="image-section">
  <Swiper
    navigation
    modules={[Navigation]}
    spaceBetween={20}
    slidesPerView={1}
  >
    {place.images.map((img, index) => (
      <SwiperSlide key={index}>
        <img src={img.src} alt={img.title} />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

        {/* Info */}
        <p>{place.description}</p>
        <p><strong>Recommended Days:</strong> {place.days}</p>
        <p><strong>Budget:</strong> {place.budget} (per person)</p>

        {/* Weather */}
        {loading ? (
          <p style={{ color: "white" }}>Loading weather...</p>
        ) : weather && weather.current ? (
          <div className="weather-box">
            <h3>Current Weather</h3>

            <div className="weather-content">
              <img src={weather.current.condition.icon} alt="weather icon" />

              <div>
                <p>🌡️ {weather.current.temp_c}°C</p>
                <p>🌥️ {weather.current.condition.text}</p>
                <p>📍 {weather.location.name}</p>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: "white" }}>Weather not available</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="form-section">
  <h2>Plan your trip</h2>

  <input
    name="name"
    placeholder="Your Name"
    onChange={handleChange}
  />

  <input
    name="email"
    placeholder="Email"
    onChange={handleChange}
  />

  <input
    name="days"
    placeholder="Number of Days"
    onChange={handleChange}
  />

  <input
    name="budget"
    placeholder="Budget"
    onChange={handleChange}
  />

  {success && (
    <div className="success-popup">
      🎉 Your Trip Plan has been sent to your e-mail </div>
  )}

  <button type="submit" className="Submit-btn">
    {loading ? "Planning your trip..." : "Plan My Trip✈️"}
  </button>
</form>
      </div>
    </>
  );
}

export default Destination;