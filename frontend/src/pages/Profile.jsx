import Navbar from "../components/navbar";
import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
const [user, setUser] = useState(null);

useEffect(() => {
const storedUser = JSON.parse(localStorage.getItem("user"));
if (storedUser) setUser(storedUser);
}, []);

if (!user) return <div className="loading">Loading...</div>;

return (
<> <Navbar />

```
<div className="profile-page">

  {/* 🔥 PROFILE HEADER */}
  <div className="profile-header">
    <div className="profile-left">

      <div className="profile-pic">
        {user.name?.charAt(0).toUpperCase()}
      </div>

      <div>
        <h1>{user.name?.toUpperCase()}</h1>
        <p>{user.email}</p>
      </div>

    </div>
  </div>

  {/* 📊 USER STATS */}
  <div className="stats">

    <div className="stat-card">
      <h2>0</h2>
      <p>Trips Planned</p>
    </div>

    <div className="stat-card">
      <h2>0</h2>
      <p>Places Visited</p>
    </div>

    <div className="stat-card">
      <h2>0</h2>
      <p>Photos Uploaded</p>
    </div>

  </div>

  {/* ✈️ TRIPS */}
  <div className="section">
    <h2>Your Trips ✨</h2>
    <div className="empty-box">
      <p>No trips yet. Start planning 🚀</p>
    </div>
  </div>

  {/* 📸 GALLERY */}
  <div className="section">
    <h2>Your Memories 📸</h2>

    <div className="upload-box">
      <input type="file" />
      <p>Upload your favorite travel moments</p>
    </div>

    <div className="gallery"></div>
  </div>

</div>


</>
);

}

export default Profile;
