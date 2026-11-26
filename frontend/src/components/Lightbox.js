import { useEffect, useState } from "react";

function Lightbox({ images, initialIndex, onClose }) {
  const [imageIndex, setImageIndex] = useState(initialIndex);
  const image = images[imageIndex];

  useEffect(() => {
    const dialog = document.getElementById("gallery-lightbox");

    dialog.showModal();

    return () => dialog.close();
  }, []);

  function showPrevious() {
    setImageIndex((currentIndex) =>
      (currentIndex - 1 + images.length) % images.length
    );
  }

  function showNext() {
    setImageIndex((currentIndex) =>
      (currentIndex + 1) % images.length
    );
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <dialog
      id="gallery-lightbox"
      className="gallery-lightbox"
      aria-label="Enlarged gallery photos"
      onCancel={onClose}
      onKeyDown={handleKeyDown}
    >
      <div className="lightbox-toolbar">
        <p aria-live="polite">
          {imageIndex + 1} / {images.length}
        </p>

        <button
          className="button button-outline"
          type="button"
          onClick={onClose}
          autoFocus
        >
          Close
        </button>
      </div>

      <img
        className="lightbox-image"
        src={image.src}
        alt={image.alt}
      />

      <p className="lightbox-caption">{image.alt}</p>

      <div className="lightbox-actions">
        <button
          className="button button-outline"
          type="button"
          onClick={showPrevious}
          disabled={images.length <= 1}
        >
          Previous
        </button>

        <button
          className="button button-outline"
          type="button"
          onClick={showNext}
          disabled={images.length <= 1}
        >
          Next
        </button>
      </div>
    </dialog>
  );
}

export default Lightbox;