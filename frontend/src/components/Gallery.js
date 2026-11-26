import { useState } from "react";
import galleryImages from "../data/galleryImages";
import Lightbox from "./Lightbox";
import Reviews from "./Reviews";

const categories = [
  { value: "atmosphere", label: "Atmosphere" },
  { value: "dishes", label: "Dishes" },
  {
    value: "events",
    label: "Special Events & Behind the Scenes",
  },
];

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("dishes");
  const [startIndex, setStartIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredImages = galleryImages.filter(
    (image) => image.category === selectedCategory
  );

  const visibleImages = [];
  const visibleCount = Math.min(4, filteredImages.length);

  for (let offset = 0; offset < visibleCount; offset++) {
    const index = (startIndex + offset) % filteredImages.length;

    visibleImages.push({
      image: filteredImages[index],
      index,
    });
  }

  function changeCategory(category) {
    setSelectedCategory(category);
    setStartIndex(0);
    setSelectedImageIndex(null);
  }

  function showPrevious() {
    setStartIndex((currentIndex) =>
      (currentIndex - 1 + filteredImages.length) % filteredImages.length
    );
  }

  function showNext() {
    setStartIndex((currentIndex) =>
      (currentIndex + 1) % filteredImages.length
    );
  }

  return (
    <main className="gallery-page">
      <header className="gallery-hero">
        <h1>
          Our Gallery,
          <br />
          Awards & Reviews
        </h1>
      </header>

      <section
        className="gallery-content"
        aria-label="Restaurant photo gallery"
      >
        <div className="gallery-filters" aria-label="Photo categories">
          {categories.map((category) => (
            <button
              key={category.value}
              className={
                selectedCategory === category.value
                  ? "gallery-filter selected"
                  : "gallery-filter"
              }
              type="button"
              aria-pressed={selectedCategory === category.value}
              onClick={() => changeCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="gallery-carousel">
          <button
            className="gallery-arrow"
            type="button"
            aria-label="Show previous photos"
            onClick={showPrevious}
            disabled={filteredImages.length <= 1}
          >
            ←
          </button>

          <div className="gallery-carousel-images">
            {visibleImages.map(({ image, index }) => (
              <button
                key={image.src}
                className="gallery-photo-button"
                type="button"
                aria-label={`Enlarge: ${image.alt}`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />

                <span className="gallery-photo-caption">
                  {image.alt}
                </span>
              </button>
            ))}
          </div>

          <button
            className="gallery-arrow"
            type="button"
            aria-label="Show next photos"
            onClick={showNext}
            disabled={filteredImages.length <= 1}
          >
            →
          </button>
        </div>
      </section>

      <section
        className="gallery-awards"
        aria-labelledby="gallery-awards-title"
      >
        <div className="awards-content">
          <p className="section-label">Our Awards</p>
          <h2 id="gallery-awards-title">What they say about us</h2>
          <p className="awards-introduction">
            Recognition of the food, hospitality, and memorable experiences
            we share with our guests.
          </p>

          <div className="awards-grid">
            <article className="award-card">
              <span className="award-symbol" aria-hidden="true">
                ✦
              </span>
              <h3>Culinary Excellence Award</h3>
              <p>2022</p>
            </article>

            <article className="award-card">
              <span className="award-symbol" aria-hidden="true">
                ✦
              </span>
              <h3>Restaurant of the Year</h3>
              <p>2023</p>
            </article>

            <article className="award-card">
              <span className="award-symbol" aria-hidden="true">
                ✦
              </span>
              <h3>Best Fine Dining Experience</h3>
              <p>Foodie Magazine · 2023</p>
            </article>
          </div>
        </div>
      </section>

      <Reviews />

      {selectedImageIndex !== null && (
        <Lightbox
          images={filteredImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </main>
  );
}

export default Gallery;