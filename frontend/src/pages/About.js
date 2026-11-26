import pageContent from "../data/pageContent";
import restaurant from "../data/restaurant";

function About() {
  const content = pageContent.about;

  return (
    <main className="about-page">
      <header
        className="about-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${pageContent.about.heroImage}")`,
        }}
      >
        <h1>{content.title}</h1>
      </header>

      <section className="about-story">
        <p className="section-label">{content.storyLabel}</p>
        <h2>{restaurant.name}</h2>
        <p>{content.storyText}</p>
      </section>

      <section className="about-owners">
        <div className="about-section-heading">
          <p className="section-label">{content.foundersLabel}</p>
          <h2>{content.foundersTitle}</h2>
        </div>

        <div className="owners-grid">
          {content.founders.map((founder) => (
            <article className="owner-card" key={founder.id}>
              <img src={founder.image} alt={founder.alt} />
              <div className="owner-description">
                <h3>{founder.name}</h3>
                <p className="owner-role">{founder.role}</p>
                <p>{founder.biography}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-commitments">
        <div className="about-section-heading">
          <p className="section-label">{content.commitmentsLabel}</p>
          <h2>{content.commitmentsTitle}</h2>
        </div>

        <div className="commitments-grid">
          {content.commitments.map((commitment) => (
            <article className="commitment-card" key={commitment.id}>
              <span className="commitment-number" aria-hidden="true">
                {commitment.number}
              </span>
              <h3>{commitment.title}</h3>
              <p>{commitment.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;
