import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h2>Café Fausse</h2>
          <p>
            Italian flavors, seasonal ingredients, and thoughtful
            hospitality in the heart of Washington, DC.
          </p>
        </div>

        <div>
          <h3>Opening Hours</h3>
          <p>Monday–Saturday: 5:00 PM–11:00 PM</p>
          <p>Sunday: 5:00 PM–9:00 PM</p>
        </div>

        <nav aria-label="Footer navigation">
          <h3>Useful Links</h3>
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/about">About Us</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>

        <div>
          <h3>Contact Us</h3>
          <address>
            1234 Culinary Ave, Suite 100
            <br />
            Washington, DC 20002
            <br />
            <a href="tel:+12025554567">(202) 555-4567</a>
          </address>
        </div>
      </div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} Café Fausse. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;