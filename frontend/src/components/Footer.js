import pageContent from "../data/pageContent";
import restaurant from "../data/restaurant";
import OpeningHours from "./OpeningHours";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h2>{restaurant.name}</h2>
          <p>{pageContent.footer.description}</p>
        </div>

        <div>
          <h3>Opening Hours</h3>
          <OpeningHours variant="footer" />
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
            {restaurant.address.street}
            <br />
            {restaurant.address.city}
            <br />
            <a href={restaurant.phone.href}>{restaurant.phone.display}</a>
          </address>
        </div>
      </div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
