import pageContent from "../data/pageContent";
import { useEffect, useState } from "react";

import reviews from "../data/reviews";


function Reviews() {
  const [showAll, setShowAll] = useState(false);
  const featuredReviews = reviews.slice(0, 3);

  useEffect(() => {
    const dialog = document.getElementById("reviews-dialog");

    if (showAll) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [showAll]);

  return (
    <section className="reviews-section">
      <p className="section-label">{pageContent.reviews.label}</p>
      <h2>{pageContent.reviews.title}</h2>

      <div className="reviews-grid">
        {featuredReviews.map((review) => (
          <figure className="review-card" key={review.id}>
            <span className="review-quote" aria-hidden="true">
              “
            </span>

            <blockquote>{review.text}</blockquote>

            <figcaption>
              {review.author}

              {review.isExample && (
                <span className="review-example">
                  Illustrative review
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      <button
        className="button reviews-more"
        type="button"
        onClick={() => setShowAll(true)}
      >
        View All Reviews
      </button>

      <dialog
        id="reviews-dialog"
        className="reviews-dialog"
        aria-labelledby="reviews-dialog-title"
        onCancel={() => setShowAll(false)}
      >
        <div className="reviews-dialog-header">
          <h2 id="reviews-dialog-title">Guest Reviews</h2>

          <button
            className="button button-outline"
            type="button"
            onClick={() => setShowAll(false)}
          >
            Close
          </button>
        </div>

        <p>Browse all reviews.</p>

        <div className="reviews-list">
          {reviews.map((review) => (
            <article className="reviews-list-item" key={review.id}>
              <blockquote>{review.text}</blockquote>
              <p className="review-author">{review.author}</p>

              {review.isExample && (
                <p className="review-example">Illustrative review</p>
              )}
            </article>
          ))}
        </div>
      </dialog>
    </section>
  );
}

export default Reviews;
