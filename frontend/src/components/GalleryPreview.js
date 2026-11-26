import pageContent from "../data/pageContent";
import { useEffect, useState } from "react";
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
  const [images, setImages] = useState(() =>
    shuffleImages(galleryImages)
  );
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 3) {
      return;
    }

    const timer = setInterval(() => {
      setStartIndex((currentIndex) =>
        (currentIndex + 3) % images.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const visibleImages = [];

  for (let offset = 0; offset < Math.min(3, images.length); offset++) {
    const index = (startIndex + offset) % images.length;
    visibleImages.push(images[index]);
  }

  function reshuffleImages() {
    setImages(shuffleImages(galleryImages));
    setStartIndex(0);
  }

  return (
    <section className="home-gallery">
      <p className="section-label">{pageContent.galleryPreview.label}</p>
      <h2>{pageContent.galleryPreview.title}</h2>

      <p>{pageContent.galleryPreview.description}</p>

      <div className="home-gallery-grid">
        {visibleImages.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>

      <Link className="button" to="/gallery">
        View Gallery
      </Link>

    </section>
  );
}

export default GalleryPreview;
