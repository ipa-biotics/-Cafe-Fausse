import antonioPortrait from "../images/antonio-rossi.png";
import mariaPortrait from "../images/maria-lopez.png";

function About() {
  return (
    <main className="about-page">
      <header className="about-hero">
        <h1>About Us</h1>
      </header>

      <section className="about-story">
        <p className="section-label">Our Story</p>
        <h2>Café Fausse</h2>

        <p>
          Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez,
          Café Fausse blends traditional Italian flavors with modern culinary
          innovation. Our mission is to provide an unforgettable dining
          experience that reflects both quality and creativity.
        </p>
      </section>

      <section className="about-owners">
        <div className="about-section-heading">
          <p className="section-label">The People Behind Café Fausse</p>
          <h2>Our Founders</h2>
        </div>

        <div className="owners-grid">
          <article className="owner-card">
            <img
              src={antonioPortrait}
              alt="Chef Antonio Rossi"
            />

            <div className="owner-description">
              <h3>Antonio Rossi</h3>
              <p className="owner-role">Chef & Co-Founder</p>

              <p>
                Chef Antonio Rossi brings Italian tradition and culinary
                curiosity to Café Fausse. His approach celebrates seasonal
                ingredients, balanced flavors, and the care that turns
                a meal into a memorable experience.
              </p>
            </div>
          </article>

          <article className="owner-card">
            <img
              src={mariaPortrait}
              alt="Restaurateur Maria Lopez"
            />

            <div className="owner-description">
              <h3>Maria Lopez</h3>
              <p className="owner-role">Restaurateur & Co-Founder</p>

              <p>
                Restaurateur Maria Lopez leads Café Fausse with a passion
                for hospitality. She creates a welcoming atmosphere and
                thoughtful service, making every guest feel at home from
                arrival to the end of their evening.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="about-commitments">
        <div className="about-section-heading">
          <p className="section-label">What Matters to Us</p>
          <h2>Our Commitments</h2>
        </div>

        <div className="commitments-grid">
          <article className="commitment-card">
            <span className="commitment-number" aria-hidden="true">
              01
            </span>
            <h3>Unforgettable Dining</h3>
            <p>
              A welcoming setting and attentive service for every occasion.
            </p>
          </article>

          <article className="commitment-card">
            <span className="commitment-number" aria-hidden="true">
              02
            </span>
            <h3>Excellent Food</h3>
            <p>
              Thoughtfully prepared dishes that combine tradition and creativity.
            </p>
          </article>

          <article className="commitment-card">
            <span className="commitment-number" aria-hidden="true">
              03
            </span>
            <h3>Locally Sourced Ingredients</h3>
            <p>
              Seasonal ingredients and a close connection to the people
              who produce them.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default About;