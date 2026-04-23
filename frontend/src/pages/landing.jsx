import { useNavigate } from "react-router-dom";
import "./landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <video autoPlay loop muted className="bg-video">
        <source src="public/Landing_page.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <h1>Safar Khoobsurat hai..manzil se bhi</h1>
        <button onClick={() => navigate("/dashboard")}>
          Let's Plan Your Trip
        </button>
      </div>
    </div>
  );
}

export default Landing;