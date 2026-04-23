import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/Dashboard";
import NewTrip from "./pages/NewTrip";
import Destination from "./pages/Destination";
import SignIn from "./pages/Signin";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-trip" element={<NewTrip />} />
        <Route path="/destination/:name" element={<Destination />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;