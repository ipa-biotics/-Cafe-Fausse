import { useState } from "react";
import { Link } from "react-router-dom";
import galleryImages from "../data/galleryImages";

function shuffleImages(images) {
  const shuffled = [...images];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    const temporaryImage = shuffled[index];
    shuffled[index] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryImage;
  }

  return shuffled;
}

function GalleryPreview() {
  const [shuffledImages] = useState(() => shuffleImages(galleryImages));
  const [startIndex, setStartIndex] = useState(0);

  const visibleImages = shuffledImages.slice(startIndex, startIndex + 3);

  function showNextImages() {
    setStartIndex((currentIndex) => {
      const nextIndex = currentIndex + 3;

      return nextIndex >= shuffledImages.length ? 0 : nextIndex;
    });
  }

  return (
    <section className="home-gallery">
      <p className="section-label">Gallery</p>
      <h2>Explore Café Fausse</h2>
      
      <p>A glimpse of our food, atmosphere, and special moments.</p>

      <div className="home-gallery-grid">
        {visibleImages.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>

      <div className="gallery-actions">
        <button
          className="button button-outline"
          type="button"
          onClick={showNextImages}
          disabled={shuffledImages.length <= 3}
        >
          Next Photos
        </button>

        <Link className="button" to="/gallery">
          View Gallery
        </Link>
      </div>
    </section>
  );
}

export default GalleryPreview;