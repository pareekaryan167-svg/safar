require("dotenv").config();
console.log("ENV Email:", process.env.EMAIL);
console.log("ENV Pass:", process.env.PASS);

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Trip = require("./models/Trip");
const User = require("./models/User");
const otpStore = {};
const app = express();

const PORT = process.env.PORT || 5005;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.error("MongoDB error:", err));

/* ✅ CORS */
app.use(cors({
  origin: "http://localhost:5173",
}));

/* ✅ JSON */
app.use(express.json());

/* ✅ TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

/* ✅ LOGIN ROUTE */
app.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    res.json({ message: "Login successful", user });

  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

/* ✅ Send OTP  */

app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Normalize email
    const cleanEmail = email.trim().toLowerCase();

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Store OTP
    otpStore[cleanEmail] = otp;

    console.log("OTP GENERATED:", otp);

    // Send email (using GLOBAL transporter)
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: cleanEmail,
      subject: "Your Safar OTP 🔐",
      text: `Your OTP is ${otp}`,
    });

    return res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error("ERROR IN SEND OTP:", err);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});


/* ✅ Verify OTP  */
app.post("/verify-otp", async (req, res) => {
  

  const email = req.body.email.trim().toLowerCase();
  const { otp, name, phone } = req.body;

  console.log("EMAIL:", email);
  console.log("STORED OTP:", otpStore[email]);
  console.log("ENTERED OTP:", otp);

  if (!otpStore[email]) {
    return res.status(400).json({ error: "OTP expired" });
  }

  if (String(otpStore[email]) === String(otp)) {
    delete otpStore[email];

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name, phone });
    } else {
      user.name = name;
      user.phone = phone;
    }

    await user.save();

    return res.json({
      success: true,
      user
    });
  }

  return res.status(400).json({ error: "Invalid OTP" });
});


app.post("/submit-trip", async (req, res) => {
  const { name, email, place, days, budget } = req.body;

  try {
    console.log("Trip request:", req.body);

    // ✅ 1. Save trip (THIS MUST NEVER FAIL)
    const newTrip = new Trip({ name, email, place, days, budget });
    await newTrip.save();

    // ✅ 2. Send email (OPTIONAL - don't break API if fails)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Your Trip Plan ✈️",
        text: `Hey ${name},

Your trip to ${place} is planned 🎉

📍 Destination: ${place}
📅 Days: ${days}
💰 Budget: ₹${budget}

Have a great journey ✈️
- Safar`
      });

      console.log("Email sent successfully");

    } catch (mailErr) {
      console.log("Email failed but continuing:", mailErr.message);
    }

    // ✅ Always respond success
    return res.json({ success: true });

  } catch (err) {
    console.error("Trip error:", err);
    return res.status(500).json({ error: "Trip failed" });
  }
});
/* ✅ SERVER */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});