import "./Footer.css";

function Footer() {
return ( <footer className="footer">


  <h2 className="footer-title">Safar ✨</h2>
  <p className="footer-tagline">Plan. Travel. Capture Memories.</p>

  <p className="footer-love">Made with ❤️ for travel lovers</p>

  <p className="footer-bottom">
    © {new Date().getFullYear()} Safar. All rights reserved.
  </p>

</footer>


);
}

export default Footer;
