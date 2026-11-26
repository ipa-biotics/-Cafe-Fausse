import awards from "../data/awards";
import pageContent from "../data/pageContent";

function Awards() {
  return (
    <section
      className="gallery-awards"
      style={{
        backgroundImage: `linear-gradient( 90deg, rgba(8, 20, 22, 0.9), rgba(8, 20, 22, 0.5) ), url("${pageContent.awards.backgroundImage}")`,
      }}
      aria-labelledby="awards-title"
    >
      <div className="awards-content">
        <p className="section-label">{pageContent.awards.label}</p>
        <h2 id="awards-title">{pageContent.awards.title}</h2>
        <p className="awards-introduction">{pageContent.awards.description}</p>

        <div className="awards-grid">
          {awards.map((award) => (
            <article className="award-card" key={award.id}>
              <span className="award-symbol" aria-hidden="true">✦</span>
              <h3>{award.title}</h3>
              <p>
                {award.organization && `${award.organization} · `}
                {award.year}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Awards;
