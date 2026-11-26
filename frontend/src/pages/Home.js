import restaurant from "../data/restaurant";
import OpeningHours from "../components/OpeningHours";
import pageContent from "../data/pageContent";
import { useState } from "react";
import { Link } from "react-router-dom";
import menuItems from "../data/menuItems";
import Awards from "../components/Awards";
import GalleryPreview from "../components/GalleryPreview";

function Home() {
  const [featuredMain] = useState(() => {
    const mains = menuItems.filter(
      (item) => item.category === "mains" && item.image
    );

    if (mains.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * mains.length);

    return mains[randomIndex];
  });

  return (
    <main className="home-page">
      <section
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${pageContent.home.heroImage}")`,
        }}
      >
        <div className="home-hero-content">
          <p className="hero-kicker">{pageContent.home.kicker}</p>
          <h1>{restaurant.name}</h1>
          <p>{pageContent.home.tagline}</p>

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
          <p className="section-label">{pageContent.home.storyLabel}</p>
          <h2>{pageContent.home.storyTitle}</h2>

          <p>{pageContent.home.storyText}</p>

          <Link className="button" to="/about">
            Read More
          </Link>
        </div>

        <img
          className="home-story-image"
          src={pageContent.home.storyImage}
          alt={pageContent.home.storyImageAlt}
        />
      </section>

      <section className="home-menu">
        {featuredMain && (
          <img
            className="home-menu-image"
            src={featuredMain.image}
            alt={featuredMain.name}
          />
        )}

        <div className="home-menu-content">
          <p className="section-label">{pageContent.home.menuLabel}</p>
          <h2>{pageContent.home.menuTitle}</h2>

          <p>{pageContent.home.menuText}</p>

          <Link className="button" to="/menu">
            View Menu
          </Link>
        </div>
      </section>

      <section
        className="home-hours"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${pageContent.home.hoursBackground}")`,
        }}
      >
        <div className="home-hours-content">
          <div>
            <p className="section-label">{pageContent.home.hoursLabel}</p>
            <h2>{pageContent.home.hoursTitle}</h2>

            <p>{pageContent.home.hoursText}</p>

            <Link className="button" to="/reservations">
              Book a Table
            </Link>

            <address>
              {restaurant.address.street}
              <br />
              {restaurant.address.city}
              <br />
              <a href={restaurant.phone.href}>{restaurant.phone.display}</a>
            </address>
          </div>

          <OpeningHours variant="cards" />
        </div>
      </section>

      <Awards />

      <GalleryPreview />
    </main>
  );
}

export default Home;
