import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SEND OTP
  const sendOtp = async () => {
    if (!form.email) {
      alert("Enter email first ❗");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5005/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: form.email })
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        alert("OTP sent to your email 📩");
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  // 🔐 VERIFY OTP
const verifyOtp = async () => {
  if (!form.otp) {
    alert("Enter OTP!");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:5005/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: form.email,
        otp: form.otp,
        name: form.name,
        phone: form.phone
      })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login Successful 🎉");
      navigate("/profile");
    } else {
      alert(data.error);
    }

  } catch (err) {
    alert("Verification failed");
  }

  setLoading(false);
};

  return (
    <div className="signin-container">

      {/* 🎥 Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source src="/SignIn(40) (1) (1).mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      {/* 📦 Form */}
      <div className="form-box">

        <h2>Sign In to Safar ✨</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        {/* 🔥 CONDITIONAL OTP UI */}
        {!otpSent ? (
  <button onClick={sendOtp}>
    {loading ? "Sending..." : "Send OTP"}
  </button>
) : (
  <>
    <input
      type="text"
      name="otp"
      placeholder="Enter OTP"
      onChange={handleChange}
    />

    <button onClick={verifyOtp}>
      {loading ? "Verifying..." : "Verify OTP"}
    </button>
  </>
)}
      </div>
    </div>
  );
}

export default SignIn;