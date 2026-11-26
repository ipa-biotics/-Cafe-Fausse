import pageContent from "../data/pageContent";
import { useState } from "react";
import galleryImages, { galleryCategories } from "../data/galleryImages";
import Lightbox from "../components/Lightbox";
import Reviews from "../components/Reviews";
import Awards from "../components/Awards";



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
      <header
        className="gallery-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("${pageContent.gallery.heroImage}")`,
        }}
      >
        <h1>
          {pageContent.gallery.titleLines[0]}
          <br />
          {pageContent.gallery.titleLines[1]}
        </h1>
      </header>

      <section
        className="gallery-content"
        aria-label="Restaurant photo gallery"
      >
        <div className="gallery-filters" aria-label="Photo categories">
          {galleryCategories.map((category) => (
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

      <Awards />

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
