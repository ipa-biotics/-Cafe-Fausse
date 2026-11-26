function Reviews() {
  return (
    <section className="reviews-section">
      <p className="section-label">Guest Reviews</p>
      <h2>Why people choose us</h2>

      <div className="reviews-grid">
        <figure className="review-card">
          <blockquote>
            “Exceptional ambiance and unforgettable flavors.”
          </blockquote>
          <figcaption>Gourmet Review</figcaption>
        </figure>

        <figure className="review-card">
          <blockquote>
            “A must-visit restaurant for food enthusiasts.”
          </blockquote>
          <figcaption>The Daily Bite</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default Reviews;