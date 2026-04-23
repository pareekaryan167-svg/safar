import { Link } from "react-router-dom";
import { FaHome , FaPlus , FaUser } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Safar</h2>

      <div className="nav-links">
        <Link to="/dashboard"><FaHome /> Home</Link>
        <Link to="/new-trip"><FaPlus /> New Trip</Link>
        <Link to="/signin"><FaUser /> Sign In</Link>
      </div>
    </nav>
  );
}

export default Navbar;