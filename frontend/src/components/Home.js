import { Link } from "react-router-dom";
import foundersImage from "../images/founders.png";
import { useEffect, useState } from "react";
import salmonImage from "../images/salmon.png";
import steakImage from "../images/steak.png";
import risottoImage from "../images/risotto.png";
import Reviews from "./Reviews";
import GalleryPreview from "./GalleryPreview";

const menuImages = [
  { src: salmonImage, alt: "Grilled salmon with seasonal vegetables" },
  { src: steakImage, alt: "Ribeye steak with garlic mashed potatoes" },
  { src: risottoImage, alt: "Vegetable risotto with wild mushrooms" },
];

function Home() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((currentIndex) =>
        (currentIndex + 1) % menuImages.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="hero-kicker">Welcome to</p>
          <h1>Café Fausse</h1>
          <p>Italian flavors, creativity, and warm hospitality.</p>

          <div className="hero-actions">
            <Link className="button" to="/reservations">
              Book a Table
            </Link>
            <Link className="button button-outline" to="/menu">
              Explore Our Menu
            </Link>
          </div>
        </div>
      </section>

      <section className="home-story">
        <div className="home-story-content">
          <p className="section-label">About Us</p>
          <h2>Our story, our people, and our passion for fine dining.</h2>

          <p>
            Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez,
            Café Fausse blends traditional Italian flavors with modern culinary
            innovation.
          </p>

          <Link className="button" to="/about">
            Read More
          </Link>
        </div>
        
        <img 
          className="home-story-image"
          src={foundersImage}
          alt="Chef Antonio Rossi and restaurateur Maria Lopez"
        />
      </section>

      <section className="home-menu">
        <img
          className="home-menu-image"
          src={menuImages[imageIndex].src}
          alt={menuImages[imageIndex].alt}
        />

        <div className="home-menu-content">
          <p className="section-label">Menu</p>
          <h2>Taste the Excellence</h2>

          <p>
            Discover a menu inspired by Italian flavors, seasonal ingredients,
            and the pleasure of sharing a beautifully prepared meal.
          </p>

          <Link className="button" to="/menu">
            View Menu
          </Link>
        </div>
      </section>

      <section className="home-hours">
        <div className="home-hours-content">
          <div>
            <p className="section-label">Reservations</p>
            <h2>Opening Hours</h2>

            <p>
              Join us for an evening of Italian flavors and warm hospitality.
            </p>

            <Link className="button" to="/reservations">
              Book a Table
            </Link>

            <address>
              1234 Culinary Ave, Suite 100
              <br />
              Washington, DC 20002
              <br />
              <a href="tel:+12025554567">(202) 555-4567</a>
            </address>
          </div>

          <div className="hours-card">
            <div>
              <h3>Monday to Saturday</h3>
              <p>5:00 PM–11:00 PM</p>
            </div>

            <div>
              <h3>Sunday</h3>
              <p>5:00 PM–9:00 PM</p>
            </div>
          </div>
        </div>
      </section>
      
      <Reviews />

      <GalleryPreview />

    </main>
  );
}

export default Home;