import Navbar from "../components/navbar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
return (
<> <Navbar />

```
  <div className="home">

    {/* 🔥 HERO SECTION */}
    <div className="hero">
      <h1>Welcome to Safar ✨</h1>
      <p>Plan your journeys. Capture memories. Explore the world.</p>
      <button onClick={() => navigate("/new-trip")}>Start Your Journey 🚀</button>
    </div>

    {/* 💎 CARDS SECTION */}
    <div className="cards-section">

      <div className="card">
        <h3>🌍 Smart Trip Planning</h3>
        <p>
          Easily plan your trips with destination, budget and duration —
          all in one place.
        </p>
      </div>

      <div className="card">
        <h3>📊 Track Your Travel</h3>
        <p>
          Keep track of your trips, places visited and build your travel history.
        </p>
      </div>

      <div className="card">
        <h3>📸 Capture Memories</h3>
        <p>
          Upload and store your favorite travel moments forever.
        </p>
      </div>

    </div>

  </div>
</>


);
}

export default Dashboard;
