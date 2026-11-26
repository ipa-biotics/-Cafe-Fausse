import pageContent from "../data/pageContent";
function Newsletter() {
  return (
    <section
        className="newsletter-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${pageContent.newsletter.backgroundImage}")`,
        }}
      >
      <div className="newsletter-content">
        <p className="section-label">{pageContent.newsletter.label}</p>
        <h2>{pageContent.newsletter.title}</h2>
        <p>{pageContent.newsletter.description}</p>

        <form
          className="newsletter-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="newsletter-email">Email address</label>

          <div className="newsletter-fields">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              required
            />

            <button className="button" type="submit">
              Subscribe
            </button>
          </div>

          <p className="newsletter-note">
            Newsletter signup is not available yet.
          </p>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
