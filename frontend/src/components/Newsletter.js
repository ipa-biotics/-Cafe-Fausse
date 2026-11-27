import { useState } from "react";
import ApiService from "../services/api-service";
import pageContent from "../data/pageContent";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await ApiService.subscribeNewsletter(email);

      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to subscribe. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email">Email address</label>

          <div className="newsletter-fields">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={150}
              disabled={isSubmitting}
              required
            />

            <button
              className="button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          <p
            className="newsletter-note"
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;