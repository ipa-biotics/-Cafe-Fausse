function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <p className="section-label">Newsletter</p>
        <h2>Subscribe to our newsletter</h2>
        <p>
          Stay up to date with restaurant news, seasonal dishes,
          and special evenings at Café Fausse.
        </p>

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